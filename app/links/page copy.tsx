// ============================================================================
// /LINKS PAGE - FINAL CREATIVE VERSION WITH TOOLS + RESOURCES
// ============================================================================
"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
import Link from "next/link";
import {
  User,
  Briefcase,
  DollarSign,
  Target,
  Heart,
  Music2,
  Youtube,
  Linkedin,
  Instagram,
  BookOpen,
  GraduationCap,
  MessageCircle,
  ChevronDown,
} from "lucide-react";

import { trackNavClick } from "@/components/analytics/GoogleAnalytics";
import { supabase } from "@/lib/supabase";

const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, eventData);
  }
};

const trackSocialClick = (platform: string, destination: string) => {
  trackEvent("social_click", { platform, destination });
};

const submitQuestion = async (data: {
  question: string;
  email: string;
  triage_selection?: string;
  vibe_check_score?: number;
}) => {
  return await supabase.from("qa_submissions").insert({
    ...data,
    submitted_at: new Date().toISOString(),
    status: "pending",
  });
};

type Tool = {
  id: string;
  name: string;
  url: string;
  description?: string;
  thumbnail_url?: string;
  category?: string;
};

export default function LinksPage() {
  const [selectedTriage, setSelectedTriage] = useState<string | null>(null);
  const [vibeCheckValue, setVibeCheckValue] = useState<number>(50);
  const [expandedResource, setExpandedResource] = useState<string | null>(null);
  const [tools, setTools] = useState<Tool[]>([]);
  const [loadingTools, setLoadingTools] = useState(true);

  const TIKTOK_URL =
    process.env.NEXT_PUBLIC_TIKTOK_URL || "https://tiktok.com/@kerryleehartley";
  const YOUTUBE_URL =
    process.env.NEXT_PUBLIC_YOUTUBE_URL ||
    "https://youtube.com/@kerryleehartley";
  const LINKEDIN_URL =
    process.env.NEXT_PUBLIC_LINKEDIN_URL ||
    "https://linkedin.com/in/kerryleehartley";
  const INSTAGRAM_URL =
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
    "https://instagram.com/kerryleehartley";
  const YOUTUBE_PLAYLIST_ID =
    process.env.NEXT_PUBLIC_YOUTUBE_PLAYLIST_ID ||
    "PLzlwBPbx5r_UE9_foIdx0zUDENMtWFnk2";
  const COURSES_URL = process.env.NEXT_PUBLIC_COURSES_URL || "/courses";
  const DISCORD_URL =
    process.env.NEXT_PUBLIC_DISCORD_URL || "https://discord.gg/your-invite";
  const BOOK_AMAZON_URL =
    "https://www.amazon.com/Fundamental-Four-elevate-mindset-performance-ebook/dp/B0863JPLHL";
  const QA_PAGE_URL = process.env.NEXT_PUBLIC_QA_PAGE_URL || "/qa";

  useEffect(() => {
    trackEvent("page_view", { page_name: "Links Page", page_path: "/links" });

    async function fetchTools() {
      try {
        const { data, error } = await supabase
          .from("tools_for_journey")
          .select("*");
        if (error) {
          console.error("Supabase error fetching tools:", error.message);
          setTools([]);
          setLoadingTools(false);
          return;
        }
        const toolsData: Tool[] = (data ?? []).map((item: any) => ({
          id: item.id,
          name: item.name,
          url: item.url,
          description: item.description,
          thumbnail_url: item.thumbnail_url,
          category: item.category,
        }));
        setTools(toolsData);
      } catch (err) {
        console.error("Unexpected error fetching tools:", err);
        setTools([]);
      } finally {
        setLoadingTools(false);
      }
    }

    fetchTools();
  }, []);

  const triageItems = [
    {
      id: "career",
      icon: Briefcase,
      label: "Career",
      color: "from-[#D4AF37] to-[#C97064]",
    },
    {
      id: "money",
      icon: DollarSign,
      label: "Money",
      color: "from-[#8FA989] to-[#D4AF37]",
    },
    {
      id: "purpose",
      icon: Target,
      label: "Purpose",
      color: "from-[#C97064] to-[#8FA989]",
    },
    {
      id: "faith",
      icon: Heart,
      label: "Faith",
      color: "from-[#8FA989] to-[#C97064]",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FAF8F5] to-[#F5F1EB] pb-20">
      <section className="pt-8 pb-4 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="relative w-24 h-24 mx-auto mb-3">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#8FA989] rounded-full blur-md opacity-50 scale-110" />
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8FA989] shadow-xl ring-4 ring-white/50 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center backdrop-blur-sm">
                <User className="w-12 h-12 text-white drop-shadow-lg" />
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-[#1A1A1A] mb-1 tracking-tight">
            Kerry Lee Hartley
          </h1>
          <p className="text-sm text-[#6B6B6B] mb-1">
            Figuring out your 20s? Start here
          </p>
          <p className="text-xs text-[#8FA989] font-medium tracking-wider mb-3">
            Encouragement • Faith • Giving
          </p>

          <div className="flex justify-center items-center gap-3">
            {[
              { Icon: Music2, url: TIKTOK_URL, platform: "tiktok" },
              { Icon: Youtube, url: YOUTUBE_URL, platform: "youtube" },
              { Icon: Linkedin, url: LINKEDIN_URL, platform: "linkedin" },
              { Icon: Instagram, url: INSTAGRAM_URL, platform: "instagram" },
            ].map(({ Icon, url, platform }) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocialClick(platform, url)}
                className="group relative"
              >
                <div className="absolute inset-0 bg-white rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-2.5 bg-white rounded-full shadow-md group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                  <Icon className="w-4 h-4 text-[#1A1A1A]" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-md mx-auto px-4 space-y-3">
        {/* TRIAGE */}
        <div className="relative -mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
            {triageItems.map(({ id, icon: Icon, label, color }) => (
              <Link
                key={id}
                href={`${QA_PAGE_URL}?category=${id}`}
                className={`flex-none snap-center w-32 p-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white text-[#1A1A1A]`}
              >
                <Icon className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-semibold text-center">{label}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* RESOURCES */}
        <div className="relative">
          <p className="text-xs font-semibold text-[#6B6B6B] mb-2 text-center">
            Resources
          </p>
          <div className="relative space-y-2">
            {[
              {
                id: "courses",
                title: "Decoding Your 20s",
                subtitle: "Khan Academy for Life Skills",
                tags: "Career • Money • Purpose • Faith",
                icon: GraduationCap,
                color: "from-[#8FA989] to-[#D4AF37]",
                url: COURSES_URL,
                cta: "Start Learning Free",
              },
              {
                id: "discord",
                title: "Discord Channel",
                subtitle:
                  "Join my free community of like-minded leaders like you and keep the conversations going",
                icon: MessageCircle,
                color: "from-[#5865F2] to-[#7289DA]",
                url: DISCORD_URL,
                cta: "Join Discord",
                isDiscord: true,
              },
              {
                id: "book",
                title: "The Fundamental Four",
                subtitle: "Available on Amazon",
                icon: BookOpen,
                color: "from-[#D4AF37] to-[#C97064]",
                url: BOOK_AMAZON_URL,
                cta: "Buy Book",
                isExternal: true,
              },
            ].map(
              (
                {
                  id,
                  title,
                  subtitle,
                  tags,
                  icon: Icon,
                  color,
                  url,
                  cta,
                  isDiscord,
                  isExternal,
                },
                index
              ) => (
                <div
                  key={id}
                  className={`relative transition-all duration-300 ${
                    expandedResource === id
                      ? "z-20 scale-105"
                      : expandedResource && expandedResource !== id
                      ? "opacity-50 scale-95"
                      : "z-10"
                  }`}
                  style={{
                    transform:
                      expandedResource === id
                        ? "translateY(0)"
                        : `translateY(${index * -8}px)`,
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${color} rounded-2xl blur-md opacity-30`}
                  />
                  <button
                    onClick={() =>
                      setExpandedResource(expandedResource === id ? null : id)
                    }
                    className="relative w-full"
                  >
                    <div
                      className={`w-full px-5 py-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                        expandedResource === id ? "ring-2 ring-[#D4AF37]" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {isDiscord ? (
                            <div
                              className={`p-2 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}
                            >
                              <MessageCircle className="w-5 h-5 text-white" />
                            </div>
                          ) : (
                            <div
                              className={`p-2 rounded-xl bg-gradient-to-br ${color}`}
                            >
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                          )}
                          <div className="text-left">
                            <p className="text-sm font-semibold text-[#1A1A1A]">
                              {title}
                            </p>
                            {expandedResource !== id && (
                              <p className="text-xs text-[#6B6B6B] mt-0.5 line-clamp-1">
                                {subtitle}
                              </p>
                            )}
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 flex-shrink-0 transition-transform ${
                            expandedResource === id ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                      {expandedResource === id && (
                        <div className="mt-3 pt-3 border-t border-[#E8E3DC]">
                          <p className="text-xs text-[#6B6B6B] mb-3">
                            {subtitle}
                          </p>
                          {tags && (
                            <p className="text-xs text-[#8FA989] mb-3 font-medium">
                              {tags}
                            </p>
                          )}
                          <a
                            href={url}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            onClick={(e) => e.stopPropagation()}
                            className={`block w-full py-2 rounded-full text-xs font-semibold text-white text-center bg-gradient-to-r ${color} hover:shadow-lg transition-all`}
                          >
                            {cta}
                          </a>
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        {/* TOOLS FOR THE JOURNEY */}
        <div className="mt-8">
          <p className="text-xs font-semibold text-[#6B6B6B] mb-2 text-center">
            Tools for the Journey
          </p>
          {loadingTools ? (
            <p className="text-center text-sm text-[#6B6B6B]">
              Loading tools...
            </p>
          ) : tools.length === 0 ? (
            <p className="text-center text-sm text-[#6B6B6B]">
              No tools yet — add some in Supabase!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
              {tools.map((tool) => (
                <a
                  key={tool.id}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-lg transition"
                  onClick={() => trackEvent("tool_click", { tool: tool.name })}
                >
                  {tool.thumbnail_url ? (
                    <img
                      src={tool.thumbnail_url}
                      alt={tool.name}
                      className="w-24 h-24 object-contain mb-2 rounded-lg"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-[#E8E3DC] mb-2 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-[#6B6B6B]" />
                    </div>
                  )}
                  <p className="text-sm font-semibold">{tool.name}</p>
                  {tool.description && (
                    <p className="text-xs text-[#6B6B6B]">{tool.description}</p>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
