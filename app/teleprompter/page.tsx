// ============================================================================
// TELEPROMPTER TOOL - COMPLETE WITH MAGIC LINK AUTH
// ============================================================================
// What: Professional teleprompter with voice tracking, auth, mirror mode
// Why: Lead gen tool with email capture, cross-device access
// How: Web Speech API + Supabase Auth + usage limits
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
import {
  useTeleprompterAuth,
  AuthModal,
  UsageIndicator,
  UserMenu,
} from "@/lib/teleprompter-auth";

export default function TeleprompterPage() {
  // ============================================================================
  // AUTH STATE (MUST BE FIRST)
  // ============================================================================
  const {
    user,
    loading: authLoading,
    voiceTrackingUsesLeft,
    useVoiceTracking: consumeVoiceUse,
    isAuthenticated,
  } = useTeleprompterAuth();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTrigger, setAuthTrigger] = useState<
    "save_script" | "voice_tracking_limit" | "manual_login"
  >("manual_login");

  // ============================================================================
  // SCRIPT STATE
  // ============================================================================
  const [scripts, setScripts] = useState<any[]>([]);
  const [currentScript, setCurrentScript] = useState<any>(null);
  const [scriptText, setScriptText] = useState("");
  const [scriptTitle, setScriptTitle] = useState("");

  // ============================================================================
  // PLAYBACK STATE
  // ============================================================================
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(50);
  const [fontSize, setFontSize] = useState(48);
  const [isMirrorMode, setIsMirrorMode] = useState(false);

  // ============================================================================
  // VOICE CONTROL STATE
  // ============================================================================
  const [isVoiceTracking, setIsVoiceTracking] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [recognizedText, setRecognizedText] = useState("");

  // ============================================================================
  // UI STATE
  // ============================================================================
  const [showSettings, setShowSettings] = useState(false);
  const [showScriptList, setShowScriptList] = useState(false);
  const [shareLink, setShareLink] = useState("");

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const recognitionRef = useRef<any>(null);
  const wordsRef = useRef<string[]>([]);

  // ============================================================================
  // FUNCTIONS
  // ============================================================================

  // Define incrementReadCount with useCallback to use in useEffect
  const incrementReadCount = useCallback(async (scriptId: string) => {
    await supabase.rpc("increment_script_reads", { script_uuid: scriptId });
  }, []);

  // Auto-scroll to bottom when mirror mode is enabled
  useEffect(() => {
    if (isMirrorMode && scrollContainerRef.current) {
      // Scroll to bottom when mirror mode is turned on
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    } else if (!isMirrorMode && scrollContainerRef.current) {
      // Scroll to top when mirror mode is turned off
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [isMirrorMode]);

  // Split script into words for tracking
  useEffect(() => {
    wordsRef.current = scriptText
      .split(/\s+/)
      .filter((word) => word.length > 0);
    setCurrentWordIndex(0);
  }, [scriptText]);

  // Load scripts on mount (filtered by user if authenticated)
  useEffect(() => {
    if (!authLoading) {
      loadScripts();
    }
  }, [authLoading, user]);

  const loadScripts = async () => {
    let query = supabase
      .from("teleprompter_scripts")
      .select("*")
      .order("updated_at", { ascending: false });

    // If authenticated, load user's scripts
    if (user) {
      query = query.eq("owner_email", user.email);
    } else {
      // If not authenticated, only show public scripts
      query = query.eq("is_public", true).limit(2);
    }

    const { data } = await query;
    if (data) setScripts(data);
  };

  // Auto-scroll animation (manual mode)
  useEffect(() => {
    if (isPlaying && !isVoiceTracking && scrollContainerRef.current) {
      const scroll = () => {
        if (scrollContainerRef.current) {
          // More accurate speed calculation
          const baseSpeed = (scrollSpeed / 100) * 2;
          // Reverse direction in mirror mode (scroll up instead of down)
          const speed = isMirrorMode ? -baseSpeed : baseSpeed;
          scrollContainerRef.current.scrollTop += speed;

          const { scrollTop, scrollHeight, clientHeight } =
            scrollContainerRef.current;

          // Check end condition based on mirror mode
          const reachedEnd = isMirrorMode
            ? scrollTop <= 10 // In mirror mode, stop when reaching top
            : scrollTop + clientHeight >= scrollHeight - 10; // Normal mode, stop at bottom

          if (reachedEnd) {
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
    isMirrorMode,
  ]);

  // Voice tracking with real-time speech recognition (Chrome + Safari)
  useEffect(() => {
    // Check for browser support
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (typeof window !== "undefined" && SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onstart = () => {
        console.log("🎤 Voice recognition started");
      };

      recognitionRef.current.onresult = (event: any) => {
        console.log("🗣️ Speech detected!", event);

        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          console.log("📝 Transcript:", transcript);

          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }

        const fullTranscript = (finalTranscript + interimTranscript)
          .toLowerCase()
          .trim();

        console.log("📄 Full transcript:", fullTranscript);
        setRecognizedText(fullTranscript);

        // Match spoken words to script and scroll
        if (fullTranscript && wordsRef.current.length > 0) {
          const spokenWords = fullTranscript.split(/\s+/);
          const scriptWords = wordsRef.current.map((w) =>
            w.toLowerCase().replace(/[^\w\s]/g, "")
          );

          console.log(
            "🔍 Matching:",
            spokenWords,
            "from position",
            currentWordIndex
          );

          let matchIndex = currentWordIndex;
          const recentWords = spokenWords.slice(-3);

          for (const spokenWord of recentWords) {
            for (let j = matchIndex; j < scriptWords.length; j++) {
              const scriptWord = scriptWords[j];

              if (spokenWord.length >= 3 && scriptWord.length >= 3) {
                if (
                  scriptWord.includes(spokenWord) ||
                  spokenWord.includes(scriptWord)
                ) {
                  if (j > matchIndex) {
                    matchIndex = j;
                    console.log(
                      "✅ Sequential match:",
                      spokenWord,
                      "at index",
                      j
                    );
                  }
                  break;
                }
              }
            }
          }

          if (matchIndex > currentWordIndex) {
            console.log("📍 Moving from", currentWordIndex, "to", matchIndex);
            setCurrentWordIndex(matchIndex);
            scrollToWord(matchIndex);
          } else {
            console.log("⏸️ No forward progress");
          }
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("❌ Speech recognition error:", event.error, event);

        if (
          event.error === "not-allowed" ||
          event.error === "service-not-allowed"
        ) {
          alert(
            "Microphone access denied. Please enable microphone permissions in your browser settings."
          );
          setIsVoiceTracking(false);
        } else if (event.error === "no-speech") {
          console.log("⚠️ No speech detected, restarting...");
          if (isVoiceTracking) {
            setTimeout(() => {
              try {
                recognitionRef.current.start();
              } catch (e) {
                console.log("Could not restart recognition");
              }
            }, 100);
          }
        } else if (event.error === "network") {
          alert(
            "Network error. Voice tracking requires an internet connection."
          );
          setIsVoiceTracking(false);
        } else if (event.error === "aborted") {
          console.log("✅ Recognition aborted normally");
        } else {
          console.error("Other error:", event.error);
        }
      };

      recognitionRef.current.onend = () => {
        console.log("🛑 Recognition ended, isVoiceTracking:", isVoiceTracking);

        if (isVoiceTracking) {
          console.log("🔄 Auto-restarting recognition...");
          try {
            recognitionRef.current.start();
          } catch (e) {
            console.log("Could not restart:", e);
            setIsVoiceTracking(false);
          }
        } else {
          console.log("✅ Recognition properly stopped");
        }
      };
    } else {
      console.error("❌ Speech recognition not supported in this browser");
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.log("Recognition already stopped");
        }
      }
    };
  }, [isVoiceTracking, currentWordIndex]);

  // Scroll to keep current word visible
  const scrollToWord = (wordIndex: number) => {
    console.log("📜 scrollToWord called with index:", wordIndex);
    const wordElements = document.querySelectorAll(".script-word");
    console.log("📝 Found", wordElements.length, "word elements");

    if (wordElements[wordIndex] && scrollContainerRef.current) {
      const wordElement = wordElements[wordIndex] as HTMLElement;
      const container = scrollContainerRef.current;

      const wordTop = wordElement.offsetTop;
      const wordHeight = wordElement.offsetHeight;
      const containerHeight = container.clientHeight;

      // In mirror mode, scroll is inverted
      const scrollPosition = isMirrorMode
        ? container.scrollHeight -
          wordTop -
          containerHeight / 2 -
          wordHeight / 2
        : wordTop - containerHeight / 2 + wordHeight / 2;

      console.log("🎯 Scrolling to position:", scrollPosition);

      container.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    } else {
      console.log("❌ Could not scroll - element or container not found");
    }
  };

  // ============================================================================
  // AUTH-GATED VOICE TRACKING
  // ============================================================================
  const handleVoiceTrackClick = () => {
    // Check if user can use voice tracking
    if (!consumeVoiceUse()) {
      setAuthTrigger("voice_tracking_limit");
      setShowAuthModal(true);
      return;
    }

    // Original toggle function
    toggleVoiceTracking();
  };

  const toggleVoiceTracking = () => {
    if (!recognitionRef.current) {
      alert(
        "Voice tracking not supported in this browser. Try Chrome, Edge, or Safari (iOS 14.5+)."
      );
      return;
    }

    if (isVoiceTracking) {
      console.log("🛑 Stopping voice tracking...");
      try {
        recognitionRef.current.stop();
        recognitionRef.current.abort();
      } catch (e) {
        console.log("Recognition already stopped");
      }
      setIsVoiceTracking(false);
      setRecognizedText("");
      setIsPlaying(false);
      console.log("✅ Voice tracking stopped");
    } else {
      console.log("▶️ Starting voice tracking...");
      setIsPlaying(false);
      setCurrentWordIndex(0);
      setRecognizedText("");

      try {
        recognitionRef.current.start();
        setIsVoiceTracking(true);
      } catch (e) {
        console.error("Could not start recognition:", e);
        alert("Could not start voice tracking. Please refresh and try again.");
      }
    }
  };

  const resetScroll = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    setIsPlaying(false);
  };

  // ============================================================================
  // AUTH-GATED SAVE
  // ============================================================================
  const handleSave = async () => {
    if (!scriptTitle || !scriptText) {
      alert("Please add a title and script content");
      return;
    }

    // Check if user is logged in
    if (!user) {
      setAuthTrigger("save_script");
      setShowAuthModal(true);
      return;
    }

    // Save script
    await saveScript();
  };

  const saveScript = async () => {
    const scriptData = {
      title: scriptTitle,
      content: scriptText,
      font_size: fontSize,
      scroll_speed: scrollSpeed,
      is_mirror_mode: isMirrorMode,
      share_slug: scriptTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      is_public: false,
      owner_email: user?.email,
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

    loadScripts();
    alert("Script saved!");
  };

  const loadScript = async (script: any) => {
    setCurrentScript(script);
    setScriptTitle(script.title);
    setScriptText(script.content);
    setFontSize(script.font_size || 48);
    setScrollSpeed(script.scroll_speed || 50);
    setIsMirrorMode(script.is_mirror_mode || false);
    setShowScriptList(false);

    await supabase.rpc("increment_script_views", { script_uuid: script.id });
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

  // ============================================================================
  // RENDER
  // ============================================================================

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A]">
      {/* ========================================================================
          HEADER WITH AUTH
          ======================================================================== */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-white">📱 Teleprompter</h1>
            {currentScript && (
              <span className="hidden sm:inline text-sm text-white/60">
                {currentScript.title}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Usage Indicator */}
            <UsageIndicator
              user={user}
              usesLeft={voiceTrackingUsesLeft}
              onLoginClick={() => {
                setAuthTrigger("manual_login");
                setShowAuthModal(true);
              }}
            />

            {/* Login or User Menu */}
            {!user ? (
              <button
                onClick={() => {
                  setAuthTrigger("manual_login");
                  setShowAuthModal(true);
                }}
                className="hidden sm:block text-sm text-white/70 hover:text-white transition-colors"
              >
                Sign in
              </button>
            ) : (
              <UserMenu user={user} />
            )}

            <button
              onClick={() => setShowScriptList(!showScriptList)}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-all flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span className="hidden sm:inline">
                {showScriptList ? "Hide" : "Scripts"}
              </span>
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

      <div className="flex h-[calc(100vh-64px)] relative">
        {/* ======================================================================
            BACKDROP FOR MOBILE
            ====================================================================== */}
        {showScriptList && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setShowScriptList(false)}
          />
        )}

        {/* ======================================================================
            SCRIPT LIST SIDEBAR
            ====================================================================== */}
        {showScriptList && (
          <aside
            className={`
            fixed lg:relative
            inset-y-0 left-0
            w-full sm:w-80 
            bg-black/95 lg:bg-black/30 
            backdrop-blur-sm 
            border-r border-white/10 
            overflow-y-auto
            z-50 lg:z-auto
            transform transition-transform duration-300
            ${
              showScriptList
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
          >
            <div className="p-4">
              <div className="lg:hidden flex items-center justify-between mb-4">
                <h2 className="text-white font-semibold">My Scripts</h2>
                <button
                  onClick={() => setShowScriptList(false)}
                  className="p-2 hover:bg-white/10 rounded-lg text-white transition-all"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <h2 className="hidden lg:block text-white font-semibold mb-4">
                My Scripts
              </h2>

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

                {!user && scripts.length === 2 && (
                  <div className="mt-4 p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg">
                    <p className="text-xs text-white/70 mb-2">
                      Want to save your own scripts?
                    </p>
                    <button
                      onClick={() => {
                        setAuthTrigger("manual_login");
                        setShowAuthModal(true);
                      }}
                      className="text-xs text-[#D4AF37] font-semibold hover:underline"
                    >
                      Sign in to unlock →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </aside>
        )}

        <div className="flex-1 flex flex-col">
          {/* ==================================================================
              SETTINGS PANEL
              ================================================================== */}
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

          {/* ==================================================================
              TELEPROMPTER DISPLAY
              ================================================================== */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto overflow-x-hidden bg-black"
            style={{
              display: "flex",
              flexDirection: isMirrorMode ? "column-reverse" : "column",
            }}
          >
            <div
              className="max-w-4xl mx-auto px-8 py-20 w-full"
              style={{
                transform: isMirrorMode ? "scaleY(-1)" : "none",
              }}
            >
              {!isVoiceTracking && (
                <textarea
                  value={scriptText}
                  onChange={(e) => setScriptText(e.target.value)}
                  placeholder="Type or paste your script here..."
                  className="w-full min-h-screen bg-transparent text-white resize-none focus:outline-none leading-relaxed"
                  style={{
                    fontSize: `${fontSize}px`,
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                />
              )}

              {isVoiceTracking && (
                <div
                  className="leading-relaxed"
                  style={{
                    fontSize: `${fontSize}px`,
                    fontFamily: "system-ui, -apple-system, sans-serif",
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

          {/* ==================================================================
              CONTROL BAR
              ================================================================== */}
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
                  onClick={handleVoiceTrackClick}
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
                  onClick={handleSave}
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
                  disabled={isVoiceTracking || !currentScript}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    isVoiceTracking || !currentScript
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

      {/* ========================================================================
          AUTH MODAL
          ======================================================================== */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        trigger={authTrigger}
      />
    </main>
  );
}
