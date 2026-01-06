// ============================================================================
// TELEPROMPTER - MAGIC LINK AUTH + VOICE TRACKING LIMITS
// ============================================================================
// What: Magic link login, 3 free voice tracking uses, save scripts requires email
// Why: Professional UX, lead capture, cross-device access
// How: Supabase Auth + usage tracking in localStorage
// ============================================================================

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

// ============================================================================
// AUTH STATE MANAGEMENT
// ============================================================================

export function useTeleprompterAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [voiceTrackingUsesLeft, setVoiceTrackingUsesLeft] = useState(3);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Load voice tracking uses from localStorage (for non-logged-in users)
    const savedUses = localStorage.getItem("voice_tracking_uses");
    if (savedUses) {
      setVoiceTrackingUsesLeft(parseInt(savedUses));
    }

    return () => subscription.unsubscribe();
  }, []);

  // Use voice tracking
  const useVoiceTracking = () => {
    if (user) return true; // Unlimited for logged-in users

    if (voiceTrackingUsesLeft > 0) {
      const newCount = voiceTrackingUsesLeft - 1;
      setVoiceTrackingUsesLeft(newCount);
      localStorage.setItem("voice_tracking_uses", newCount.toString());
      return true;
    }
    return false; // Out of uses
  };

  return {
    user,
    loading,
    voiceTrackingUsesLeft,
    useVoiceTracking,
    isAuthenticated: !!user,
  };
}

// ============================================================================
// MAGIC LINK LOGIN COMPONENT
// ============================================================================

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  trigger: "save_script" | "voice_tracking_limit" | "manual_login";
}

export function AuthModal({ isOpen, onClose, trigger }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/teleprompter`,
          shouldCreateUser: true,
        },
      });

      if (error) throw error;

      setSent(true);

      // Track conversion
      await supabase.from("teleprompter_leads").insert({
        email,
        referral_source: trigger,
        utm_source: new URLSearchParams(window.location.search).get(
          "utm_source"
        ),
      });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Get contextual copy based on trigger
  const getCopy = () => {
    switch (trigger) {
      case "save_script":
        return {
          title: "Save This Script 💾",
          description:
            "Enter your email to save this script and access it from any device. We'll send you a magic link—no password needed!",
          benefit: "Access your scripts anywhere, anytime",
        };
      case "voice_tracking_limit":
        return {
          title: "Unlock Unlimited Voice Tracking 🎤",
          description:
            "You've used your 3 free voice tracking sessions! Enter your email to unlock unlimited voice tracking forever.",
          benefit: "Unlimited voice tracking + save all your scripts",
        };
      case "manual_login":
        return {
          title: "Access Your Scripts 🔓",
          description:
            "Enter your email and we'll send you a magic link to access your saved scripts. No password required!",
          benefit: "All your scripts, all your devices",
        };
    }
  };

  const copy = getCopy();

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
        {/* Close button */}
        {trigger === "manual_login" && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
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
        )}

        {!sent ? (
          <>
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">
              {copy.title}
            </h2>
            <p className="text-[#6B6B6B] mb-6">{copy.description}</p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#D4AF37] focus:outline-none mb-4 text-[#1A1A1A]"
                disabled={loading}
              />

              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#D4AF37] hover:bg-[#C49D2F] text-black font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending magic link..." : "Send Magic Link →"}
              </button>
            </form>

            <div className="mt-6 p-4 bg-[#8FA989]/10 rounded-lg">
              <p className="text-sm text-[#1A1A1A] font-semibold mb-1">
                ✨ What you get:
              </p>
              <p className="text-sm text-[#6B6B6B]">{copy.benefit}</p>
            </div>

            {trigger !== "manual_login" && (
              <button
                onClick={onClose}
                className="w-full mt-3 text-sm text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
              >
                Maybe later
              </button>
            )}
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-[#8FA989] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">
              Check Your Email! 📬
            </h3>
            <p className="text-[#6B6B6B] mb-6">
              We sent a magic link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-[#6B6B6B] mb-6">
              Click the link in the email to instantly access the teleprompter.
              The link works on any device and expires in 1 hour.
            </p>

            <button
              onClick={() => {
                setSent(false);
                setEmail("");
              }}
              className="text-sm text-[#8FA989] hover:text-[#7A9078] font-semibold"
            >
              Didn't get it? Send again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// USAGE INDICATOR COMPONENT
// ============================================================================

interface UsageIndicatorProps {
  user: User | null;
  usesLeft: number;
  onLoginClick: () => void;
}

export function UsageIndicator({
  user,
  usesLeft,
  onLoginClick,
}: UsageIndicatorProps) {
  if (user) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-[#8FA989]/10 rounded-lg">
        <div className="w-2 h-2 bg-[#8FA989] rounded-full"></div>
        <span className="text-sm text-[#1A1A1A]">
          ✨ <strong>Unlimited</strong> voice tracking
        </span>
      </div>
    );
  }

  const getColor = () => {
    if (usesLeft === 3) return "text-[#8FA989]";
    if (usesLeft === 2) return "text-[#D4AF37]";
    if (usesLeft === 1) return "text-[#C97064]";
    return "text-red-500";
  };

  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg ${getColor()}`}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
        <span className="text-sm font-semibold">
          {usesLeft} free {usesLeft === 1 ? "use" : "uses"} left
        </span>
      </div>

      {usesLeft === 0 && (
        <button
          onClick={onLoginClick}
          className="px-4 py-2 bg-[#D4AF37] hover:bg-[#C49D2F] text-black text-sm font-semibold rounded-lg transition-all"
        >
          Unlock Unlimited
        </button>
      )}
    </div>
  );
}

// ============================================================================
// LOGOUT COMPONENT
// ============================================================================

export function UserMenu({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-all"
      >
        <div className="w-6 h-6 bg-[#8FA989] rounded-full flex items-center justify-center text-xs font-bold">
          {user.email?.[0].toUpperCase()}
        </div>
        <span className="hidden sm:inline">{user.email?.split("@")[0]}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-xs text-gray-500">Signed in as</p>
            <p className="text-sm font-semibold text-gray-900 truncate">
              {user.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// USAGE IN TELEPROMPTER PAGE
// ============================================================================
/*
 * 1. Add auth hook:
 *    const { user, voiceTrackingUsesLeft, useVoiceTracking } = useTeleprompterAuth()
 *
 * 2. Check before enabling voice tracking:
 *    const handleVoiceTrack = () => {
 *      if (!useVoiceTracking()) {
 *        setShowAuthModal(true)
 *        setAuthTrigger('voice_tracking_limit')
 *        return
 *      }
 *      // Start voice tracking
 *    }
 *
 * 3. Check before saving:
 *    const handleSave = () => {
 *      if (!user) {
 *        setShowAuthModal(true)
 *        setAuthTrigger('save_script')
 *        return
 *      }
 *      // Save script
 *    }
 *
 * 4. Show usage indicator in header:
 *    <UsageIndicator
 *      user={user}
 *      usesLeft={voiceTrackingUsesLeft}
 *      onLoginClick={() => setShowAuthModal(true)}
 *    />
 *
 * 5. Show user menu if logged in:
 *    {user && <UserMenu user={user} />}
 *
 * 6. Manual login button:
 *    <button onClick={() => {
 *      setShowAuthModal(true)
 *      setAuthTrigger('manual_login')
 *    }}>
 *      Already have an account?
 *    </button>
 */
