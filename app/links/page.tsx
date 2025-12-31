// ============================================================================
// /LINKS PAGE - FINAL CLEAN VERSION
// ============================================================================
// What: Engaging link-in-bio with adulting emoji slider
// Why: Drive engagement with relatable, fun interactions
// How: Emoji slider (3 Onions style), clean spacing, podcast waitlist
// ============================================================================
// UPDATES: "How's adulting?" emoji slider, removed broken embeds, better spacing
// ============================================================================

"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Send,
  ChevronDown,
  Menu,
  Bell,
} from "lucide-react";

// Import existing tracking
import { trackNavClick } from "@/components/analytics/GoogleAnalytics";

const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, eventData);
  }
};

const trackClick = (buttonName: string) => trackNavClick(buttonName);

const trackSocialClick = (platform: string, destination: string) => {
  trackEvent("social_click", { platform, destination });
};

import { supabase } from "@/lib/supabase";

const submitQuestion = async (data: {
  question: string;
  email: string;
  triage_selection?: string;
  adulting_score?: number;
}) => {
  return await supabase.from("qa_submissions").insert({
    ...data,
    submitted_at: new Date().toISOString(),
    status: "pending",
  });
};

const submitPodcastWaitlist = async (email: string) => {
  return await supabase.from("podcast_waitlist").insert({
    email,
    subscribed_at: new Date().toISOString(),
  });
};

// Fetch tools from Supabase
const getTools = async () => {
  const { data, error } = await supabase
    .from("tools_for_journey")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  return data || [];
};

const trackToolClick = async (toolId: string) => {
  await supabase.rpc("increment_tool_clicks", { tool_uuid: toolId });
};

export default function LinksPage() {
  const [selectedTriage, setSelectedTriage] = useState<string | null>(null);
  const [adultingValue, setAdultingValue] = useState<number>(50);
  const [adultingVoted, setAdultingVoted] = useState<boolean>(false);
  const [qaExpanded, setQaExpanded] = useState<boolean>(false);
  const [questionText, setQuestionText] = useState<string>("");
  const [questionEmail, setQuestionEmail] = useState<string>("");
  const [questionSubmitted, setQuestionSubmitted] = useState<boolean>(false);
  const [fabOpen, setFabOpen] = useState<boolean>(false);
  const [expandedResource, setExpandedResource] = useState<string | null>(null);
  const [podcastEmail, setPodcastEmail] = useState<string>("");
  const [podcastSubmitted, setPodcastSubmitted] = useState<boolean>(false);
  const [tools, setTools] = useState<any[]>([]);

  const triageScrollRef = useRef<HTMLDivElement>(null);
  const toolsScrollRef = useRef<HTMLDivElement>(null);

  // Environment variables
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
  const PROFILE_IMAGE =
    process.env.NEXT_PUBLIC_PROFILE_IMAGE ||
    "https://euvtenlsiugkmxqplehz.supabase.co/storage/v1/object/public/images/fqs%202025-12-30%20112534.063.png";

  useEffect(() => {
    trackEvent("page_view", { page_name: "Links Page", page_path: "/links" });

    // Load tools from Supabase
    const loadTools = async () => {
      const toolsData = await getTools();
      setTools(toolsData);
    };
    loadTools();
  }, []);

  const handleTriageClick = (category: string) => {
    setSelectedTriage(category);
    trackEvent("triage_click", { category });
  };

  const handleAdultingSubmit = () => {
    setAdultingVoted(true);
    let emotion =
      adultingValue < 20
        ? "sos"
        : adultingValue < 40
        ? "struggling"
        : adultingValue < 60
        ? "managing"
        : adultingValue < 80
        ? "doing_well"
        : "crushing";
    trackEvent("adulting_check_vote", { value: adultingValue, emotion });
  };

  const handleQuestionSubmit = async (e: FormEvent) => {
    e.preventDefault();
    trackEvent("qa_submit_success", {
      question_preview: questionText.substring(0, 50),
    });
    await submitQuestion({
      question: questionText,
      email: questionEmail,
      triage_selection: selectedTriage || undefined,
      adulting_score: adultingValue,
    });
    setQuestionSubmitted(true);
    setTimeout(() => {
      setQuestionText("");
      setQuestionEmail("");
      setQuestionSubmitted(false);
      setQaExpanded(false);
    }, 3000);
  };

  const handlePodcastSubmit = async (e: FormEvent) => {
    e.preventDefault();
    trackEvent("podcast_waitlist_submit", { email: podcastEmail });
    await submitPodcastWaitlist(podcastEmail);
    setPodcastSubmitted(true);
    setTimeout(() => {
      setPodcastEmail("");
      setPodcastSubmitted(false);
    }, 3000);
  };

  const scrollTools = (direction: "left" | "right") => {
    if (toolsScrollRef.current) {
      const scrollAmount = 200; // Scroll by ~1 card width
      const newScrollLeft =
        direction === "left"
          ? toolsScrollRef.current.scrollLeft - scrollAmount
          : toolsScrollRef.current.scrollLeft + scrollAmount;

      toolsScrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

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
      {/* PROFILE SECTION */}
      <section className="pt-8 pb-4 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="relative w-32 h-32 mx-auto mb-3">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#8FA989] rounded-full blur-md opacity-50 scale-110" />
            <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8FA989] shadow-xl ring-4 ring-white/50 overflow-hidden">
              <Image
                src={PROFILE_IMAGE}
                alt="Kerry Lee Hartley"
                width={128}
                height={128}
                className="w-full h-full object-cover"
                unoptimized
                priority
              />
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

          {/* Social Icons */}
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

      <div className="max-w-md mx-auto px-4 space-y-5">
        {/* TRIAGE FILTER - ALL VISIBLE ON MOBILE */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-[#1A1A1A] text-center">
            What do you need help with most?
          </p>
          <div className="grid grid-cols-2 gap-2">
            {triageItems.map(({ id, icon: Icon, label, color }) => (
              <Link
                key={id}
                href={`${QA_PAGE_URL}?category=${id}`}
                onClick={() => handleTriageClick(id)}
                className={`group relative flex flex-col items-center justify-center p-3 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden ${
                  selectedTriage === id
                    ? `text-white scale-105`
                    : "bg-white text-[#1A1A1A]"
                }`}
              >
                {/* Background gradient (always present, opacity changes) */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${color} transition-opacity duration-300 ${
                    selectedTriage === id
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                />

                {/* Content */}
                <Icon
                  className={`w-5 h-5 mb-1 relative z-10 transition-colors duration-300 ${
                    selectedTriage === id
                      ? "text-white"
                      : "text-[#1A1A1A] group-hover:text-white"
                  }`}
                />
                <p
                  className={`text-xs font-semibold relative z-10 transition-colors duration-300 ${
                    selectedTriage === id
                      ? "text-white"
                      : "text-[#1A1A1A] group-hover:text-white"
                  }`}
                >
                  {label}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* FEATURED VLOG */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden group-hover:shadow-2xl group-hover:-translate-y-1 transition-all duration-300">
            <div className="aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/videoseries?list=${YOUTUBE_PLAYLIST_ID}`}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-3 bg-gradient-to-r from-red-500 to-red-600">
              <p className="text-xs font-semibold text-white text-center">
                Latest Vlog
              </p>
            </div>
          </div>
        </div>

        {/* RESOURCES - STACKED CARDS */}
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
                              <svg
                                className="w-5 h-5 text-white"
                                viewBox="0 0 71 55"
                                fill="currentColor"
                              >
                                <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" />
                              </svg>
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
                            onClick={(e) => {
                              e.stopPropagation();
                              trackEvent("resource_click", { resource: id });
                            }}
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

        {/* ADULTING CHECK - EMOJI SLIDER */}
        {!adultingVoted ? (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#C97064] to-[#D4AF37] rounded-3xl blur-lg opacity-20" />
            <div className="relative bg-white p-6 rounded-3xl shadow-xl">
              <p className="text-lg font-bold text-[#1A1A1A] text-center mb-6">
                How's adulting treating you?
              </p>

              {/* Emoji Endpoints */}
              <div className="flex justify-between items-center mb-4 px-2">
                <div className="text-center">
                  <div className="text-4xl mb-2">🆘</div>
                  <p className="text-xs text-[#6B6B6B] font-medium">SOS</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">✅</div>
                  <p className="text-xs text-[#6B6B6B] font-medium">
                    Crushing It
                  </p>
                </div>
              </div>

              {/* Emoji Slider */}
              <div className="relative h-4 bg-gradient-to-r from-[#C97064] via-[#E8A87C] to-[#D4AF37] rounded-full mb-6 px-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={adultingValue}
                  onChange={(e) => setAdultingValue(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                {/* Dynamic Emoji Thumb */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 text-3xl pointer-events-none transition-all duration-200 drop-shadow-lg"
                  style={{ left: `calc(${adultingValue}% - 18px)` }}
                >
                  {adultingValue < 20
                    ? "🆘"
                    : adultingValue < 40
                    ? "😐"
                    : adultingValue < 60
                    ? "🙂"
                    : adultingValue < 80
                    ? "😊"
                    : "✅"}
                </div>
              </div>

              <button
                onClick={handleAdultingSubmit}
                className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#C97064] text-white rounded-full text-sm font-bold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                Submit
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-3xl shadow-xl text-center">
            <div className="text-5xl mb-3">
              {adultingValue < 40 ? "💪" : "🎉"}
            </div>
            <p className="text-sm font-semibold text-[#1A1A1A] mb-2">
              {adultingValue < 40
                ? "You got this! Check out resources below 👇"
                : "Love that energy! Keep crushing it 🚀"}
            </p>
            <a
              href={COURSES_URL}
              className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#C97064]"
            >
              {adultingValue < 40 ? "Get support →" : "Level up more →"}
            </a>
          </div>
        )}

        {/* PODCAST WAITLIST */}
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <div className="text-center mb-5">
            <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Bell className="w-7 h-7 text-white" />
            </div>
            <p className="text-base font-bold text-[#1A1A1A] mb-2">
              Podcast Coming Soon
            </p>
            <p className="text-sm text-[#6B6B6B]">
              Be the first to know when we launch
            </p>
          </div>

          {!podcastSubmitted ? (
            <form onSubmit={handlePodcastSubmit} className="space-y-3">
              <input
                type="email"
                value={podcastEmail}
                onChange={(e) => setPodcastEmail(e.target.value)}
                placeholder="Your email"
                required
                className="w-full px-5 py-4 border-2 border-[#E8E3DC] rounded-2xl text-sm focus:border-green-500 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-sm font-bold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                Join Waitlist
              </button>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="text-5xl mb-3">🎉</div>
              <p className="text-base font-bold text-green-600">
                You're on the list!
              </p>
              <p className="text-sm text-[#6B6B6B] mt-1">
                We'll email you when it drops
              </p>
            </div>
          )}
        </div>

        {/* TOOLS FOR THE JOURNEY - WITH CLICKABLE SCROLL INDICATORS */}
        <div className="relative">
          <p className="text-sm font-bold text-[#1A1A1A] mb-3 px-4">
            Tools for the Journey
          </p>

          {/* Left Scroll Button */}
          <button
            onClick={() => scrollTools("left")}
            className="absolute left-0 top-12 bottom-2 w-8 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10 flex items-center group"
            aria-label="Scroll left"
          >
            <div className="w-6 h-6 rounded-full bg-white/90 shadow-md flex items-center justify-center ml-1 group-hover:bg-white group-hover:scale-110 transition-all cursor-pointer">
              <svg
                className="w-4 h-4 text-[#6B6B6B] group-hover:text-[#1A1A1A]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
          </button>

          {/* Right Scroll Button */}
          <button
            onClick={() => scrollTools("right")}
            className="absolute right-0 top-12 bottom-2 w-8 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10 flex items-center justify-end group"
            aria-label="Scroll right"
          >
            <div className="w-6 h-6 rounded-full bg-white/90 shadow-md flex items-center justify-center mr-1 group-hover:bg-white group-hover:scale-110 transition-all cursor-pointer">
              <svg
                className="w-4 h-4 text-[#6B6B6B] group-hover:text-[#1A1A1A]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>

          {/* Scrollable Tools Container */}
          <div className="relative -mx-4 px-4">
            <div
              ref={toolsScrollRef}
              className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {tools.map((tool) => (
                <a
                  key={tool.id}
                  href={tool.product_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={async () => {
                    trackEvent("tool_click", {
                      tool_name: tool.title,
                      category: tool.category,
                      url: tool.product_url,
                    });
                    await trackToolClick(tool.id);
                  }}
                  className="group flex-none snap-center w-44"
                >
                  <div className="relative h-full">
                    <div
                      className="absolute inset-0 rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition-opacity"
                      style={{
                        background: `linear-gradient(to bottom right, ${tool.gradient_from}, ${tool.gradient_to})`,
                      }}
                    />
                    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden group-hover:shadow-2xl group-hover:-translate-y-1 transition-all h-full flex flex-col">
                      {/* Product Image */}
                      <div className="h-44 bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
                        <Image
                          src={tool.image_url}
                          alt={tool.title}
                          width={176}
                          height={176}
                          className="w-full h-full object-contain"
                          unoptimized
                        />
                      </div>

                      {/* Content */}
                      <div className="p-3 flex-1 flex flex-col">
                        <p className="text-xs text-[#8FA989] font-semibold mb-1 uppercase tracking-wide">
                          {tool.category}
                        </p>
                        <p className="text-sm font-bold text-[#1A1A1A] mb-1 line-clamp-2 leading-tight flex-1">
                          {tool.title}
                        </p>
                        <p className="text-xs text-[#6B6B6B] line-clamp-2">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Gradient Scroll Bar */}
          <div className="relative h-1 mx-4 mt-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-[#8FA989] to-[#C97064] opacity-50" />
          </div>
        </div>

        {/* Q&A LIBRARY */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <Link
            href={QA_PAGE_URL}
            onClick={() => trackEvent("qa_browse_click")}
            className="block p-4 hover:bg-[#FAF8F5] transition-colors active:scale-[0.98]"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-[#8FA989] to-[#D4AF37] rounded-xl">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="text-left flex-1">
                <p className="text-sm font-semibold text-[#1A1A1A]">
                  Q&A Library
                </p>
                <p className="text-xs text-[#6B6B6B]">
                  Ask questions. Learn from answers.
                </p>
              </div>
            </div>
          </Link>

          <button
            onClick={() => setQaExpanded(!qaExpanded)}
            className="w-full p-4 border-t border-[#E8E3DC] flex items-center justify-between hover:bg-[#FAF8F5] transition-colors active:scale-[0.98]"
          >
            <p className="text-sm font-semibold text-[#1A1A1A]">
              Ask a Question
            </p>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                qaExpanded ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              qaExpanded ? "max-h-96" : "max-h-0"
            }`}
          >
            {!questionSubmitted ? (
              <form
                onSubmit={handleQuestionSubmit}
                className="p-4 border-t border-[#E8E3DC] space-y-2"
              >
                <textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Your question..."
                  className="w-full px-4 py-3 border-2 border-[#E8E3DC] rounded-xl text-sm focus:border-[#8FA989] focus:outline-none transition-colors resize-none"
                  rows={2}
                />
                <input
                  type="email"
                  value={questionEmail}
                  onChange={(e) => setQuestionEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="w-full px-4 py-3 border-2 border-[#E8E3DC] rounded-xl text-sm focus:border-[#8FA989] focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#8FA989] to-[#D4AF37] text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  Submit Question
                </button>
              </form>
            ) : (
              <div className="p-4 border-t border-[#E8E3DC] text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-[#8FA989] to-[#D4AF37] rounded-full flex items-center justify-center">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-semibold text-[#1A1A1A]">
                  Question submitted!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* WORK WITH ME */}
        <a
          href="/downloads/kerry-hartley-media-kit.pdf"
          download
          onClick={() => trackEvent("media_kit_click")}
          className="block w-full px-6 py-4 bg-white border-2 border-[#E8E3DC] rounded-full shadow-md hover:shadow-lg hover:border-[#1A1A1A] hover:-translate-y-0.5 transition-all duration-300 text-center"
        >
          <p className="text-sm font-semibold text-[#1A1A1A]">
            💼 Work With Me
          </p>
        </a>

        <div className="pt-4 pb-2 text-center">
          <p className="text-xs text-[#6B6B6B]">
            Built by Kerry • Man of God • Strategic Builder
          </p>
        </div>
      </div>

      {/* FLOATING ACTION BUTTON */}
      <div className="fixed bottom-6 right-6 z-50">
        <button onClick={() => setFabOpen(!fabOpen)} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#C97064] rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
          <div className="relative w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#C97064] rounded-full shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Menu
              className={`w-6 h-6 text-white transition-transform ${
                fabOpen ? "rotate-90" : ""
              }`}
            />
          </div>
        </button>

        <div
          className={`absolute bottom-16 right-0 transition-all duration-300 ${
            fabOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-2 items-end">
            <a
              href="https://kerryleehartley.com"
              className="px-4 py-2 bg-white rounded-full shadow-lg text-xs font-semibold hover:shadow-xl hover:-translate-x-1 transition-all whitespace-nowrap"
            >
              🏠 Home
            </a>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white rounded-full shadow-lg text-xs font-semibold hover:shadow-xl hover:-translate-x-1 transition-all whitespace-nowrap"
            >
              💬 Discord
            </a>
            <button
              onClick={() => setQaExpanded(true)}
              className="px-4 py-2 bg-white rounded-full shadow-lg text-xs font-semibold hover:shadow-xl hover:-translate-x-1 transition-all"
            >
              ❓ Ask Question
            </button>
            <a
              href={COURSES_URL}
              className="px-4 py-2 bg-white rounded-full shadow-lg text-xs font-semibold hover:shadow-xl hover:-translate-x-1 transition-all"
            >
              🎓 Courses
            </a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
