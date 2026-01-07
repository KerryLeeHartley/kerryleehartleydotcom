"use client";

import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Settings,
  Save,
  Mic,
  FlipHorizontal,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
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
    "Tap VOICE SYNC to begin. As you speak, words highlight and scroll follows."
  );
  const [scriptTitle, setScriptTitle] = useState("");
  const [currentScript, setCurrentScript] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(50);
  const [fontSize, setFontSize] = useState(64);
  const [showSettings, setShowSettings] = useState(false);
  const [isMirrorMode, setIsMirrorMode] = useState(false); // Added Mirror Mode State

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

  // VOICE SYNC ENGINE: Sequential tracking for repeated words
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition && !recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          interimTranscript += event.results[i][0].transcript;
        }

        const spokenWords = interimTranscript.toLowerCase().trim().split(/\s+/);
        const scriptWords = wordsRef.current.map((w) =>
          w.toLowerCase().replace(/[^\w\s]/g, "")
        );

        let matchIndex = currentWordIndex;
        const recentSpoken = spokenWords.slice(-3);

        recentSpoken.forEach((spokenWord) => {
          const searchWindow = scriptWords.slice(matchIndex, matchIndex + 5);
          const foundInWindow = searchWindow.findIndex(
            (scriptWord) =>
              scriptWord === spokenWord || scriptWord.includes(spokenWord)
          );

          if (foundInWindow !== -1) {
            matchIndex += foundInWindow;
          }
        });

        if (matchIndex > currentWordIndex) {
          setCurrentWordIndex(matchIndex);
          scrollToWord(matchIndex);
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
      setIsPlaying(false);
      setCurrentWordIndex(0);
      recognitionRef.current?.start();
      setIsVoiceTracking(true);
    }
  };

  const handleSave = async () => {
    if (!user) {
      setAuthTrigger("save_script");
      setShowAuthModal(true);
      return;
    }
    const title = scriptTitle || `Script ${new Date().toLocaleDateString()}`;
    const scriptData = {
      title,
      content: scriptText,
      font_size: fontSize,
      scroll_speed: scrollSpeed,
      owner_email: user.email,
    };
    if (currentScript?.id) {
      await supabase
        .from("teleprompter_scripts")
        .update(scriptData)
        .eq("id", currentScript.id);
    } else {
      const { data } = await supabase
        .from("teleprompter_scripts")
        .insert(scriptData)
        .select()
        .single();
      if (data) setCurrentScript(data);
    }
    alert("✅ Script saved!");
  };

  useEffect(() => {
    if (isPlaying && !isVoiceTracking) {
      scrollIntervalRef.current = setInterval(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop += scrollSpeed / 20;
        }
      }, 30);
    } else {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    }
    return () => {
      if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
    };
  }, [isPlaying, isVoiceTracking, scrollSpeed]);

  if (authLoading) return <div className="fixed inset-0 bg-black" />;

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col overflow-hidden">
      <header className="h-16 flex items-center justify-between px-4 shrink-0 border-b border-white/10 bg-black z-50">
        <h1 className="text-lg font-bold tracking-tighter italic">
          VSL PROMPTER
        </h1>
        <div className="flex items-center gap-2">
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
              className="text-xs font-semibold px-3 py-1.5 border border-white/20 rounded-full"
            >
              Sign in
            </button>
          )}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* MAIN CONTENT: Applying Mirror Mode Transformation */}
      <main
        ref={scrollContainerRef}
        className={`flex-1 overflow-y-auto px-4 md:px-12 py-[15vh] scrollbar-hide ${
          isMirrorMode ? "scale-x-[-1]" : ""
        }`}
      >
        <div className="w-full">
          {!isVoiceTracking ? (
            <textarea
              value={scriptText}
              onChange={(e) => setScriptText(e.target.value)}
              className="w-full bg-transparent resize-none focus:outline-none leading-tight font-bold text-center"
              style={{ fontSize: `${fontSize}px`, minHeight: "75vh" }}
              placeholder="Paste your script here..."
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
                  className={`script-word inline-block mx-[0.1em] ${
                    idx === currentWordIndex
                      ? "text-[#D4AF37]"
                      : idx < currentWordIndex
                      ? "text-white/10"
                      : "text-white"
                  }`}
                >
                  {word}
                </span>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="h-24 flex items-center justify-center bg-black border-t border-white/10 px-4 shrink-0 z-50">
        <div className="max-w-4xl w-full flex items-center justify-between bg-white/5 rounded-full p-2">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                isPlaying ? "bg-white text-black" : "bg-[#D4AF37] text-black"
              }`}
            >
              {isPlaying ? (
                <Pause size={28} />
              ) : (
                <Play size={28} className="ml-1" />
              )}
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                if (scrollContainerRef.current)
                  scrollContainerRef.current.scrollTop = 0;
              }}
              className="p-3 bg-white/10 rounded-full hover:bg-white/20"
            >
              <RotateCcw size={20} />
            </button>
          </div>
          <div className="flex items-center gap-3">
            {/* Mirror Mode Toggle */}
            <button
              onClick={() => setIsMirrorMode(!isMirrorMode)}
              className={`p-4 rounded-full transition-all ${
                isMirrorMode
                  ? "bg-[#D4AF37] text-black"
                  : "bg-white/10 text-white"
              }`}
            >
              <FlipHorizontal size={20} />
            </button>
            <button
              onClick={handleVoiceToggle}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-xs tracking-widest transition-all ${
                isVoiceTracking ? "bg-red-500 animate-pulse" : "bg-[#8FA989]"
              } text-white`}
            >
              <Mic size={18} /> {isVoiceTracking ? "STOP" : "VOICE SYNC"}
            </button>
            <button
              onClick={handleSave}
              className="p-4 bg-white/10 rounded-full hover:bg-white/20"
            >
              <Save size={20} />
            </button>
          </div>
        </div>
      </footer>

      {showSettings && (
        <div className="absolute top-16 inset-x-0 bg-black/95 border-b border-white/10 p-6 z-[60] animate-in slide-in-from-top-4">
          <div className="max-w-xl mx-auto space-y-4">
            <input
              type="text"
              value={scriptTitle}
              onChange={(e) => setScriptTitle(e.target.value)}
              placeholder="Script Title"
              className="w-full bg-white/10 px-4 py-2 rounded-lg outline-none"
            />
            <div>
              <label className="text-[10px] uppercase tracking-widest opacity-40">
                Font Size: {fontSize}px
              </label>
              <input
                type="range"
                min="24"
                max="120"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full accent-[#D4AF37]"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest opacity-40">
                Speed: {scrollSpeed}
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={scrollSpeed}
                onChange={(e) => setScrollSpeed(Number(e.target.value))}
                className="w-full accent-[#D4AF37]"
              />
            </div>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        trigger={authTrigger}
      />
    </div>
  );
}
