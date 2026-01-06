"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Play, Pause, RotateCcw, Settings, Save, Mic } from "lucide-react";
import {
  useTeleprompterAuth,
  AuthModal,
  UsageIndicator,
  UserMenu,
} from "@/lib/teleprompter-auth";

export default function TeleprompterPage() {
  const {
    user,
    loading: authLoading,
    voiceTrackingUsesLeft,
    useVoiceTracking: consumeVoiceUse,
  } = useTeleprompterAuth();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTrigger, setAuthTrigger] = useState<
    "save_script" | "voice_tracking_limit" | "manual_login"
  >("manual_login");

  const [scriptText, setScriptText] = useState(
    "Tap the PLAY button for constant speed, or tap VOICE SYNC to have the text follow your voice as you speak."
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(50);
  const [fontSize, setFontSize] = useState(48);
  const [isMirrorMode, setIsMirrorMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [isVoiceTracking, setIsVoiceTracking] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const recognitionRef = useRef<any>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<string[]>([]);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    wordsRef.current = scriptText
      .split(/\s+/)
      .filter((word) => word.length > 0);
  }, [scriptText]);

  // ENGINE 1: Constant Auto-Scroll (Play Button)
  useEffect(() => {
    if (isPlaying && !isVoiceTracking) {
      scrollIntervalRef.current = setInterval(() => {
        if (scrollContainerRef.current) {
          // Adjust increment based on scrollSpeed (1-100)
          const increment = scrollSpeed / 25;
          scrollContainerRef.current.scrollTop += increment;
        }
      }, 30);
    } else {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    }
    return () => {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    };
  }, [isPlaying, isVoiceTracking, scrollSpeed]);

  // ENGINE 2: Voice Sync Recognition Logic
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          interimTranscript += event.results[i][0].transcript;
        }

        const fullTranscript = interimTranscript.toLowerCase().trim();
        if (fullTranscript && wordsRef.current.length > 0) {
          const spokenWords = fullTranscript.split(/\s+/);
          const scriptWords = wordsRef.current.map((w) =>
            w.toLowerCase().replace(/[^\w\s]/g, "")
          );

          let matchIndex = currentWordIndex;
          const recentWords = spokenWords.slice(-3);

          for (const spokenWord of recentWords) {
            for (let j = matchIndex; j < scriptWords.length; j++) {
              if (
                scriptWords[j].includes(spokenWord) ||
                spokenWord.includes(scriptWords[j])
              ) {
                if (j > matchIndex) {
                  matchIndex = j;
                  break;
                }
              }
            }
          }

          if (matchIndex > currentWordIndex) {
            setCurrentWordIndex(matchIndex);
            scrollToWord(matchIndex);
          }
        }
      };

      recognitionRef.current.onend = () => {
        if (isVoiceTracking) recognitionRef.current.start();
      };
    }
  }, [isVoiceTracking, currentWordIndex]);

  const scrollToWord = (index: number) => {
    const wordElements = document.querySelectorAll(".script-word");
    if (wordElements[index] && scrollContainerRef.current) {
      const el = wordElements[index] as HTMLElement;
      const container = scrollContainerRef.current;
      // Centers the active word in the middle of the screen
      const scrollPos =
        el.offsetTop - container.clientHeight / 2 + el.offsetHeight / 2;
      container.scrollTo({ top: scrollPos, behavior: "smooth" });
    }
  };

  const handleVoiceToggle = () => {
    if (isVoiceTracking) {
      recognitionRef.current?.stop();
      setIsVoiceTracking(false);
    } else {
      if (!consumeVoiceUse()) {
        setAuthTrigger("voice_tracking_limit");
        setShowAuthModal(true);
        return;
      }
      setIsPlaying(false); // Disable auto-scroll when voice starts
      setCurrentWordIndex(0);
      recognitionRef.current?.start();
      setIsVoiceTracking(true);
    }
  };

  if (authLoading) return <div className="h-screen bg-black" />;

  return (
    <div className="h-screen w-screen bg-black flex flex-col overflow-hidden">
      {/* HEADER */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 shrink-0 bg-black z-30">
        <h1 className="text-white font-black tracking-tighter text-xl">
          VSL PROMPTER
        </h1>
        <div className="flex items-center gap-4">
          <UsageIndicator
            user={user}
            usesLeft={voiceTrackingUsesLeft}
            onLoginClick={() => {
              setAuthTrigger("manual_login");
              setShowAuthModal(true);
            }}
          />
          {user ? (
            <UserMenu user={user} />
          ) : (
            <button
              onClick={() => {
                setAuthTrigger("manual_login");
                setShowAuthModal(true);
              }}
              className="text-xs font-bold text-[#D4AF37] border border-[#D4AF37]/40 px-4 py-2 rounded-full hover:bg-[#D4AF37] hover:text-black transition-all"
            >
              LOGIN
            </button>
          )}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-white/50 hover:text-white"
          >
            <Settings size={22} />
          </button>
        </div>
      </header>

      {/* PROMPTER AREA */}
      <div className="flex-1 relative overflow-hidden flex flex-col bg-black">
        {showSettings && (
          <div className="absolute top-0 inset-x-0 bg-black/95 border-b border-white/10 p-6 z-40 animate-in slide-in-from-top duration-200">
            <div className="max-w-xl mx-auto grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                  Text Size ({fontSize}px)
                </label>
                <input
                  type="range"
                  min="30"
                  max="120"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full accent-[#D4AF37]"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                  Scroll Speed ({scrollSpeed})
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={scrollSpeed}
                  onChange={(e) => setScrollSpeed(Number(e.target.value))}
                  className="w-full accent-[#D4AF37]"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">
                  Display
                </label>
                <button
                  onClick={() => setIsMirrorMode(!isMirrorMode)}
                  className={`w-full py-2 rounded-lg font-bold text-xs transition-all ${
                    isMirrorMode
                      ? "bg-[#D4AF37] text-black"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {isMirrorMode ? "MIRROR ON" : "NORMAL VIEW"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-10 py-[40vh] scrollbar-hide"
          style={{ transform: isMirrorMode ? "scaleY(-1)" : "none" }}
        >
          <div className="max-w-4xl mx-auto text-center">
            {!isVoiceTracking ? (
              <textarea
                value={scriptText}
                onChange={(e) => setScriptText(e.target.value)}
                className="w-full bg-transparent text-white resize-none focus:outline-none leading-tight font-bold text-center"
                style={{ fontSize: `${fontSize}px`, minHeight: "60vh" }}
                spellCheck={false}
              />
            ) : (
              <div
                className="leading-tight font-bold text-center"
                style={{ fontSize: `${fontSize}px` }}
              >
                {wordsRef.current.map((word, idx) => (
                  <span
                    key={idx}
                    className={`script-word transition-all duration-300 mx-[0.15em] inline-block ${
                      idx === currentWordIndex
                        ? "text-[#D4AF37] scale-110"
                        : idx < currentWordIndex
                        ? "text-white/20"
                        : "text-white"
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER CONTROLS */}
      <footer className="h-24 border-t border-white/10 flex items-center justify-center bg-black shrink-0 px-8 z-30">
        <div className="max-w-5xl w-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={isVoiceTracking}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                isPlaying
                  ? "bg-white text-black"
                  : "bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              } disabled:opacity-20`}
            >
              {isPlaying ? (
                <Pause size={28} fill="currentColor" />
              ) : (
                <Play size={28} fill="currentColor" className="ml-1" />
              )}
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                if (scrollContainerRef.current)
                  scrollContainerRef.current.scrollTop = 0;
              }}
              className="p-3 text-white/30 hover:text-white transition-colors"
            >
              <RotateCcw size={20} />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleVoiceToggle}
              className={`flex items-center gap-3 px-6 py-3 rounded-full font-bold text-xs tracking-widest transition-all ${
                isVoiceTracking
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-[#8FA989] text-white shadow-[0_0_15px_rgba(143,169,137,0.2)]"
              }`}
            >
              <Mic size={16} /> {isVoiceTracking ? "STOP VOICE" : "VOICE SYNC"}
            </button>
            <button
              onClick={() => {
                if (!user) {
                  setAuthTrigger("save_script");
                  setShowAuthModal(true);
                }
              }}
              className="p-4 bg-white/5 text-white/40 hover:text-white rounded-2xl transition-all"
            >
              <Save size={24} />
            </button>
          </div>
        </div>
      </footer>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        trigger={authTrigger}
      />
    </div>
  );
}
