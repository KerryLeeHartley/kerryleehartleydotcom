"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

// 1. AUTH LOGIC
export function useTeleprompterAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [voiceTrackingUsesLeft, setVoiceTrackingUsesLeft] = useState(3);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    const savedUses = localStorage.getItem("voice_tracking_uses");
    if (savedUses) setVoiceTrackingUsesLeft(parseInt(savedUses));

    return () => subscription.unsubscribe();
  }, []);

  const useVoiceTracking = () => {
    if (user) return true;
    if (voiceTrackingUsesLeft > 0) {
      const newCount = voiceTrackingUsesLeft - 1;
      setVoiceTrackingUsesLeft(newCount);
      localStorage.setItem("voice_tracking_uses", newCount.toString());
      return true;
    }
    return false;
  };

  return { user, loading, voiceTrackingUsesLeft, useVoiceTracking };
}

// 2. AUTH MODAL
export function AuthModal({
  isOpen,
  onClose,
  trigger,
}: {
  isOpen: boolean;
  onClose: () => void;
  trigger: string;
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/teleprompter` },
    });
    setLoading(false);
    if (!error) setSent(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400"
        >
          ✕
        </button>
        {!sent ? (
          <form onSubmit={handleSubmit} className="text-black">
            <h2 className="text-2xl font-bold mb-2">Sign In 🔓</h2>
            <p className="text-gray-600 mb-6">
              Enter email for a Magic Link login.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-3 border rounded-lg mb-4 text-black"
            />
            <button
              disabled={loading}
              className="w-full bg-[#D4AF37] py-3 rounded-lg font-bold"
            >
              {loading ? "Sending..." : "Send Magic Link"}
            </button>
          </form>
        ) : (
          <div className="text-center text-black">
            <h3 className="text-xl font-bold mb-2">Check Your Email! 📬</h3>
            <p>We sent a link to {email}.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// 3. USAGE INDICATOR
export function UsageIndicator({
  user,
  usesLeft,
}: {
  user: any;
  usesLeft: number;
  onLoginClick: () => void;
}) {
  if (user) {
    return (
      <div className="px-3 py-1 bg-[#8FA989]/20 rounded-full border border-[#8FA989]/30">
        <span className="text-[10px] font-bold text-white uppercase tracking-tight">
          Unlimited Pro
        </span>
      </div>
    );
  }
  return (
    <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
      <span className="text-[10px] font-bold text-white/60 uppercase tracking-tight">
        {usesLeft} Uses Left
      </span>
    </div>
  );
}

// 4. USER MENU
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
        className="w-10 h-10 bg-[#D4AF37] rounded-full font-bold text-black border-2 border-white/20"
      >
        {user.email?.[0].toUpperCase()}
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-[#1a1a1a] border border-white/10 rounded-xl py-2 z-50">
          <p className="px-4 py-1 text-[10px] text-white/40 uppercase font-bold">
            Account
          </p>
          <p className="px-4 pb-2 text-xs text-white truncate">{user.email}</p>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-white/5"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
