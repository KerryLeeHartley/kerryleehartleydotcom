// ============================================================================
// TELEPROMPTER TOOL - FULL FEATURED (FIXED)
// ============================================================================
// What: Professional teleprompter with voice tracking, mirror mode, sharing
// Why: Create content easily, share scripts with team, use on any device
// How: Web Speech API + Supabase + mobile-optimized UI
// ============================================================================

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import {
  Play,
  Pause,
  RotateCcw,
  Settings,
  Share2,
  Save,
  Mic,
  FlipVertical,
} from "lucide-react";

export default function TeleprompterPage() {
  // Script state
  const [scripts, setScripts] = useState<any[]>([]);
  const [currentScript, setCurrentScript] = useState<any>(null);
  const [scriptText, setScriptText] = useState("");
  const [scriptTitle, setScriptTitle] = useState("");

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(50);
  const [fontSize, setFontSize] = useState(48);
  const [isMirrorMode, setIsMirrorMode] = useState(false);

  // Voice control state
  const [isVoiceTracking, setIsVoiceTracking] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [recognizedText, setRecognizedText] = useState("");

  // UI state
  const [showSettings, setShowSettings] = useState(false);
  const [showScriptList, setShowScriptList] = useState(true);
  const [shareLink, setShareLink] = useState("");
  const [showBrowserWarning, setShowBrowserWarning] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const recognitionRef = useRef<any>(null);
  const wordsRef = useRef<string[]>([]);

  // Define incrementReadCount with useCallback to use in useEffect
  const incrementReadCount = useCallback(async (scriptId: string) => {
    await supabase.rpc("increment_script_reads", { script_uuid: scriptId });
  }, []);

  // Split script into words for tracking
  useEffect(() => {
    wordsRef.current = scriptText
      .split(/\s+/)
      .filter((word) => word.length > 0);
    setCurrentWordIndex(0);
  }, [scriptText]);

  // Load scripts on mount
  useEffect(() => {
    loadScripts();

    // Check browser compatibility
    if (
      typeof window !== "undefined" &&
      !("webkitSpeechRecognition" in window)
    ) {
      setShowBrowserWarning(true);
    }
  }, []);

  const loadScripts = async () => {
    try {
      const { data, error } = await supabase
        .from("teleprompter_scripts")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) {
        console.error("Error loading scripts:", error);
        return;
      }

      if (data) setScripts(data);
    } catch (err) {
      console.error("Failed to load scripts:", err);
    }
  };

  // Auto-scroll animation (manual mode)
  useEffect(() => {
    if (isPlaying && !isVoiceTracking && scrollContainerRef.current) {
      const scroll = () => {
        if (scrollContainerRef.current) {
          const speed = scrollSpeed / 10;
          scrollContainerRef.current.scrollTop += speed;

          const { scrollTop, scrollHeight, clientHeight } =
            scrollContainerRef.current;
          if (scrollTop + clientHeight >= scrollHeight - 10) {
            setIsPlaying(false);
            if (currentScript?.id) {
              incrementReadCount(currentScript.id);
            }
            return;
          }

          animationFrameRef.current = requestAnimationFrame(scroll);
        }
      };

      animationFrameRef.current = requestAnimationFrame(scroll);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    isPlaying,
    scrollSpeed,
    isVoiceTracking,
    currentScript,
    incrementReadCount,
  ]);

  // Voice tracking with real-time speech recognition
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }

        const fullTranscript = (finalTranscript + interimTranscript)
          .toLowerCase()
          .trim();
        setRecognizedText(fullTranscript);

        // Match spoken words to script and scroll
        if (fullTranscript && wordsRef.current.length > 0) {
          const spokenWords = fullTranscript.split(/\s+/);
          const scriptWords = wordsRef.current.map((w) =>
            w.toLowerCase().replace(/[^\w\s]/g, "")
          );

          // Find where we are in the script
          let matchIndex = 0;
          for (let i = 0; i < scriptWords.length; i++) {
            const scriptWord = scriptWords[i];
            const isMatched = spokenWords.some(
              (spokenWord) =>
                scriptWord.includes(spokenWord) ||
                spokenWord.includes(scriptWord)
            );

            if (isMatched) {
              matchIndex = i;
            }
          }

          if (matchIndex > currentWordIndex) {
            setCurrentWordIndex(matchIndex);
            scrollToWord(matchIndex);
          }
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === "no-speech") {
          if (isVoiceTracking) {
            recognitionRef.current.stop();
            setTimeout(() => recognitionRef.current.start(), 100);
          }
        }
      };

      recognitionRef.current.onend = () => {
        if (isVoiceTracking) {
          recognitionRef.current.start();
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isVoiceTracking, currentWordIndex]);

  // Scroll to keep current word visible
  const scrollToWord = (wordIndex: number) => {
    const wordElements = document.querySelectorAll(".script-word");
    if (wordElements[wordIndex] && scrollContainerRef.current) {
      const wordElement = wordElements[wordIndex] as HTMLElement;
      const container = scrollContainerRef.current;

      const wordTop = wordElement.offsetTop;
      const wordHeight = wordElement.offsetHeight;
      const containerHeight = container.clientHeight;
      const scrollPosition = wordTop - containerHeight / 2 + wordHeight / 2;

      container.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const toggleVoiceTracking = () => {
    if (!recognitionRef.current) {
      alert(
        "Voice tracking not supported in this browser. Try Chrome or Edge."
      );
      return;
    }

    if (isVoiceTracking) {
      recognitionRef.current.stop();
      setIsVoiceTracking(false);
      setRecognizedText("");
      setIsPlaying(false);
    } else {
      setIsPlaying(false);
      setCurrentWordIndex(0);
      setRecognizedText("");
      recognitionRef.current.start();
      setIsVoiceTracking(true);
    }
  };

  const resetScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    setIsPlaying(false);
  };

  const saveScript = async () => {
    if (!scriptTitle || !scriptText) {
      alert("Please add a title and script content");
      return;
    }

    try {
      const scriptData = {
        title: scriptTitle,
        content: scriptText,
        font_size: fontSize,
        scroll_speed: scrollSpeed,
        is_mirror_mode: isMirrorMode,
        share_slug: scriptTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        is_public: true,
      };

      if (currentScript?.id) {
        const { error } = await supabase
          .from("teleprompter_scripts")
          .update(scriptData)
          .eq("id", currentScript.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("teleprompter_scripts")
          .insert(scriptData)
          .select()
          .single();

        if (error) throw error;
        if (data) setCurrentScript(data);
      }

      await loadScripts();
      alert("Script saved!");
    } catch (err) {
      console.error("Error saving script:", err);
      alert("Failed to save script. Please try again.");
    }
  };

  const loadScript = async (script: any) => {
    try {
      setCurrentScript(script);
      setScriptTitle(script.title);
      setScriptText(script.content);
      setFontSize(script.font_size || 48);
      setScrollSpeed(script.scroll_speed || 50);
      setIsMirrorMode(script.is_mirror_mode || false);
      setShowScriptList(false);

      const { error } = await supabase.rpc("increment_script_views", {
        script_uuid: script.id,
      });

      if (error) console.error("Error tracking view:", error);
    } catch (err) {
      console.error("Error loading script:", err);
    }
  };

  const generateShareLink = () => {
    if (currentScript?.share_slug) {
      const link = `${window.location.origin}/teleprompter/${currentScript.share_slug}`;
      setShareLink(link);
      navigator.clipboard.writeText(link);
      alert("Share link copied to clipboard!");
    } else {
      alert("Save the script first to generate a share link");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A]">
      {/* Browser Warning Banner */}
      {showBrowserWarning && (
        <div className="bg-yellow-500/20 border-b border-yellow-500/50 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <p className="text-yellow-200 text-sm">
              ⚠️ Voice tracking requires Chrome, Edge, or Safari. Manual scroll
              still works!
            </p>
            <button
              onClick={() => setShowBrowserWarning(false)}
              className="text-yellow-200 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <header className="bg-black/50 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">📱 Teleprompter</h1>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowScriptList(!showScriptList)}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-all"
            >
              {showScriptList ? "Hide" : "Show"} Scripts
            </button>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {showScriptList && (
          <aside className="w-80 bg-black/30 backdrop-blur-sm border-r border-white/10 overflow-y-auto">
            <div className="p-4">
              <h2 className="text-white font-semibold mb-4">My Scripts</h2>

              <button
                onClick={() => {
                  setCurrentScript(null);
                  setScriptTitle("");
                  setScriptText("");
                  setShowScriptList(false);
                }}
                className="w-full mb-4 px-4 py-3 bg-[#D4AF37] hover:bg-[#C49D2F] text-black font-semibold rounded-lg transition-all"
              >
                + New Script
              </button>

              <div className="space-y-2">
                {scripts.map((script) => (
                  <button
                    key={script.id}
                    onClick={() => loadScript(script)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      currentScript?.id === script.id
                        ? "bg-[#D4AF37] text-black"
                        : "bg-white/5 hover:bg-white/10 text-white"
                    }`}
                  >
                    <p className="font-semibold text-sm">{script.title}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(script.updated_at).toLocaleDateString()}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        )}

        <div className="flex-1 flex flex-col">
          {showSettings && (
            <div className="bg-black/50 backdrop-blur-sm border-b border-white/10 p-4">
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-white text-sm mb-2 block">
                    Font Size: {fontSize}px
                  </label>
                  <input
                    type="range"
                    min="24"
                    max="96"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">
                    Speed: {scrollSpeed}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={scrollSpeed}
                    onChange={(e) => setScrollSpeed(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-white text-sm mb-2 block">
                    Mirror Mode
                  </label>
                  <button
                    onClick={() => setIsMirrorMode(!isMirrorMode)}
                    className={`w-full px-4 py-2 rounded-lg font-semibold transition-all ${
                      isMirrorMode
                        ? "bg-[#D4AF37] text-black"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    <FlipVertical className="w-4 h-4 inline mr-2" />
                    {isMirrorMode ? "ON" : "OFF"}
                  </button>
                </div>
              </div>

              <div className="max-w-4xl mx-auto mt-4">
                <input
                  type="text"
                  value={scriptTitle}
                  onChange={(e) => setScriptTitle(e.target.value)}
                  placeholder="Script Title..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          )}

          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto overflow-x-hidden bg-black"
            style={{
              transform: isMirrorMode ? "scaleX(-1) scaleY(-1)" : "none",
            }}
          >
            <div className="max-w-4xl mx-auto px-8 py-20">
              {!isVoiceTracking && (
                <textarea
                  value={scriptText}
                  onChange={(e) => setScriptText(e.target.value)}
                  placeholder="Type or paste your script here..."
                  className="w-full min-h-screen bg-transparent text-white resize-none focus:outline-none leading-relaxed"
                  style={{
                    fontSize: `${fontSize}px`,
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    transform: isMirrorMode ? "scaleX(-1) scaleY(-1)" : "none",
                  }}
                />
              )}

              {isVoiceTracking && (
                <div
                  className="leading-relaxed"
                  style={{
                    fontSize: `${fontSize}px`,
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    transform: isMirrorMode ? "scaleX(-1) scaleY(-1)" : "none",
                  }}
                >
                  {wordsRef.current.map((word, index) => (
                    <span
                      key={index}
                      className={`script-word transition-all duration-200 ${
                        index === currentWordIndex
                          ? "text-[#D4AF37] font-bold scale-110 inline-block"
                          : index < currentWordIndex
                          ? "text-white/40"
                          : "text-white"
                      }`}
                      style={{
                        marginRight: "0.3em",
                        display: "inline-block",
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              )}

              {isVoiceTracking && (
                <div className="fixed bottom-32 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm px-6 py-3 rounded-full border border-[#D4AF37]">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    <p className="text-white text-sm font-semibold">
                      Listening... Speak your script
                    </p>
                  </div>
                  {recognizedText && (
                    <p className="text-white/60 text-xs mt-1 text-center max-w-md truncate">
                      &quot;{recognizedText}&quot;
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="bg-black/80 backdrop-blur-sm border-t border-white/10 p-4">
            <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {!isVoiceTracking && (
                  <>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-3 bg-[#D4AF37] hover:bg-[#C49D2F] rounded-full text-black transition-all"
                      title="Manual scroll"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6" />
                      )}
                    </button>

                    <button
                      onClick={resetScroll}
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
                      title="Reset to top"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  </>
                )}

                <button
                  onClick={toggleVoiceTracking}
                  className={`px-4 py-3 rounded-full transition-all font-semibold flex items-center gap-2 ${
                    isVoiceTracking
                      ? "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/50"
                      : "bg-[#8FA989] hover:bg-[#7A9078] text-white"
                  }`}
                  title="Voice tracking mode"
                >
                  {isVoiceTracking ? (
                    <>
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      <span className="text-sm">Stop Voice Track</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-5 h-5" />
                      <span className="text-sm">Voice Track</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={saveScript}
                  disabled={isVoiceTracking}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    isVoiceTracking
                      ? "bg-white/10 text-white/50 cursor-not-allowed"
                      : "bg-[#8FA989] hover:bg-[#7A9078] text-white"
                  }`}
                >
                  <Save className="w-4 h-4" />
                  <span className="hidden sm:inline">Save</span>
                </button>

                <button
                  onClick={generateShareLink}
                  disabled={isVoiceTracking}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    isVoiceTracking
                      ? "bg-white/10 text-white/50 cursor-not-allowed"
                      : "bg-[#C97064] hover:bg-[#B86054] text-white"
                  }`}
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </button>
              </div>
            </div>

            <div className="max-w-4xl mx-auto mt-3">
              {isVoiceTracking ? (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <p className="text-center text-sm text-white">
                    🎤 <strong>Voice Tracking Active</strong> - Start speaking
                    your script. The text will highlight and scroll as you speak
                    each word.
                  </p>
                </div>
              ) : isPlaying ? (
                <p className="text-center text-sm text-white/70">
                  ⏯️ Manual scroll mode - Adjust speed in settings
                </p>
              ) : (
                <p className="text-center text-sm text-white/50">
                  Press <strong>Voice Track</strong> to follow your speech, or{" "}
                  <strong>Play</strong> for auto-scroll
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
