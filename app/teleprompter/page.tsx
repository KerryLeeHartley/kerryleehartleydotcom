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
  Menu,
  Share2,
  X,
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
  const [scripts, setScripts] = useState<any[]>([]);
  const [showScripts, setShowScripts] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(50);
  const [fontSize, setFontSize] = useState(64);
  const [showSettings, setShowSettings] = useState(false);
  const [isMirrorMode, setIsMirrorMode] = useState(false);

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

  useEffect(() => {
    if (user) loadScripts();
  }, [user]);

  const loadScripts = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("teleprompter_scripts")
      .select("*")
      .eq("owner_email", user.email)
      .order("updated_at", { ascending: false });
    if (data) setScripts(data);
  };

  const loadScript = (script: any) => {
    setCurrentScript(script);
    setScriptTitle(script.title);
    setScriptText(script.content);
    setFontSize(script.font_size || 64);
    setScrollSpeed(script.scroll_speed || 50);
    setShowScripts(false);
  };

  const handleShare = () => {
    if (!currentScript?.id) {
      alert("Please save the script first");
      return;
    }
    const link = `${window.location.origin}/teleprompter?script=${currentScript.id}`;
    navigator.clipboard.writeText(link);
    alert("📋 Share link copied!");
  };

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition && !recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript + " ";
        }

        const spokenWords = transcript.toLowerCase().trim().split(/\s+/);
        const scriptWords = wordsRef.current.map((w) =>
          w.toLowerCase().replace(/[^\w\s]/g, "")
        );

        let matchIndex = currentWordIndex;
        const recentSpoken = spokenWords.slice(-2);

        for (const spokenWord of recentSpoken) {
          if (spokenWord.length < 3) continue;

          for (
            let j = matchIndex;
            j < Math.min(matchIndex + 10, scriptWords.length);
            j++
          ) {
            const scriptWord = scriptWords[j];

            if (scriptWord === spokenWord) {
              if (j > matchIndex) {
                matchIndex = j;
                break;
              }
            } else if (
              scriptWord.length >= 3 &&
              (scriptWord.includes(spokenWord) ||
                spokenWord.includes(scriptWord))
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
      };

      recognitionRef.current.onerror = (e: any) => {
        if (e.error !== "no-speech" && e.error !== "aborted") {
          console.error("Recognition error:", e.error);
        }
      };

      recognitionRef.current.onend = () => {
        if (isVoiceTracking) {
          try {
            recognitionRef.current.start();
          } catch (e) {}
        }
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
    await loadScripts();
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
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowScripts(!showScripts)}
            className="p-2 hover:bg-white/10 rounded-lg"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-lg font-bold tracking-tighter italic">
            VSL PROMPTER
          </h1>
        </div>
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
            className="p-2 rounded-lg hover:bg-white/10"
          >
            <Settings size={20} />
          </button>
        </div>
      </header>

      {showScripts && (
        <div
          className="fixed inset-0 z-40 flex"
          onClick={() => setShowScripts(false)}
        >
          <div
            className="w-80 bg-black border-r border-white/10 p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold">My Scripts</h2>
              <button
                onClick={() => setShowScripts(false)}
                className="p-1 hover:bg-white/10 rounded"
              >
                <X size={18} />
              </button>
            </div>

            <button
              onClick={() => {
                setCurrentScript(null);
                setScriptTitle("");
                setScriptText("");
                setShowScripts(false);
              }}
              className="w-full mb-3 px-4 py-2 bg-[#D4AF37] hover:bg-[#C49D2F] text-black font-semibold rounded-lg"
            >
              + New Script
            </button>

            <div className="space-y-2">
              {scripts.map((script) => (
                <button
                  key={script.id}
                  onClick={() => loadScript(script)}
                  className={`w-full text-left p-3 rounded-lg ${
                    currentScript?.id === script.id
                      ? "bg-[#D4AF37] text-black"
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <p className="font-semibold text-sm truncate">
                    {script.title}
                  </p>
                  <p className="text-xs opacity-60 mt-1">
                    {new Date(script.updated_at).toLocaleDateString()}
                  </p>
                </button>
              ))}
              {scripts.length === 0 && user && (
                <p className="text-sm text-white/40 text-center py-8">
                  No saved scripts
                </p>
              )}
              {!user && (
                <p className="text-sm text-white/40 text-center py-8">
                  Sign in to save
                </p>
              )}
            </div>
          </div>
          <div className="flex-1 bg-black/80 backdrop-blur-sm" />
        </div>
      )}

      <main
        ref={scrollContainerRef}
        className={`flex-1 overflow-y-auto px-4 md:px-12 py-[15vh] scrollbar-hide`}
        style={{ transform: isMirrorMode ? "scaleX(-1) scaleY(-1)" : "none" }}
      >
        <div className="w-full">
          {!isVoiceTracking ? (
            <textarea
              value={scriptText}
              onChange={(e) => setScriptText(e.target.value)}
              className="w-full bg-transparent resize-none focus:outline-none font-bold text-center"
              style={{
                fontSize: `${fontSize}px`,
                minHeight: "75vh",
                lineHeight: "1.5",
                wordSpacing: "0.2em",
                letterSpacing: "0.02em",
              }}
              placeholder="Paste script..."
              spellCheck={false}
            />
          ) : (
            <div
              className="font-bold text-center"
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: "1.5",
                wordSpacing: "0.2em",
                letterSpacing: "0.02em",
              }}
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
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`w-14 h-14 rounded-full flex items-center justify-center ${
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
            <button
              onClick={() => setIsMirrorMode(!isMirrorMode)}
              className={`p-3 rounded-full ${
                isMirrorMode
                  ? "bg-[#D4AF37] text-black"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              <FlipHorizontal size={20} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleVoiceToggle}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-xs ${
                isVoiceTracking ? "bg-red-500 animate-pulse" : "bg-[#8FA989]"
              } text-white`}
            >
              <Mic size={16} /> {isVoiceTracking ? "STOP" : "VOICE"}
            </button>
            <button
              onClick={handleSave}
              className="p-3 bg-white/10 rounded-full hover:bg-white/20"
            >
              <Save size={20} />
            </button>
            <button
              onClick={handleShare}
              className="p-3 bg-white/10 rounded-full hover:bg-white/20"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </footer>

      {showSettings && (
        <div className="absolute top-16 inset-x-0 bg-black/95 border-b border-white/10 p-6 z-[60]">
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
                Font: {fontSize}px
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
