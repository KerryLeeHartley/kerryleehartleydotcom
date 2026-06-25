"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
import { supabase } from "@/lib/supabase";
import {
  Calendar,
  Home,
  DollarSign,
  Star,
  X,
  ChevronRight,
  ChevronLeft,
  Instagram,
  Linkedin,
  CheckCircle,
  Phone,
} from "lucide-react";
import Image from "next/image";

export default function OutreachPage() {
  // UTM Tracking
  const [utmCode, setUtmCode] = useState<string | null>(null);
  const [contactId, setContactId] = useState<string | null>(null);

  // Modal States
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Quiz State
  const [quizStep, setQuizStep] = useState(0);
  const [quizData, setQuizData] = useState({
    name: "",
    email: "",
    phone: "",
    employment: "",
    buying: "",
    current: "",
  });

  // Form States
  const [buyerForm, setBuyerForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sellerForm, setSellerForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Instagram scroll ref
  const instagramScrollRef = useRef<HTMLDivElement>(null);

  // Track page visit on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code =
      params.get("utm_content") ||
      params.get("utm_campaign") ||
      params.get("utm_code");

    if (code) {
      setUtmCode(code);
      trackVisit(code);
    }

    // Track session duration
    const startTime = Date.now();
    return () => {
      const duration = Math.floor((Date.now() - startTime) / 1000);
      if (code && duration > 5) {
        updateSessionDuration(code, duration);
      }
    };
  }, []);

  const trackVisit = async (code: string) => {
    try {
      const { data, error } = await supabase
        .from("outreach_visits")
        .insert({
          utm_code: code,
          page_url: window.location.href,
          referrer: document.referrer,
          user_agent: navigator.userAgent,
          device_type: /mobile/i.test(navigator.userAgent)
            ? "mobile"
            : /tablet/i.test(navigator.userAgent)
            ? "tablet"
            : "desktop",
          browser:
            navigator.userAgent.match(
              /(firefox|msie|chrome|safari|trident)/gi
            )?.[0] || "unknown",
          os:
            navigator.userAgent.match(/(mac|win|linux|android|ios)/gi)?.[0] ||
            "unknown",
        })
        .select()
        .single();

      if (data) setContactId(data.contact_id);
    } catch (err) {
      console.error("Visit tracking error:", err);
    }
  };

  const updateSessionDuration = async (code: string, duration: number) => {
    await supabase
      .from("outreach_visits")
      .update({ session_duration: duration })
      .eq("utm_code", code)
      .order("created_at", { ascending: false })
      .limit(1);
  };

  const openModal = (modal: string) => {
    setActiveModal(modal);
    setShowSuccess(false);
    if (utmCode) {
      supabase.from("outreach_visits").insert({
        utm_code: utmCode,
        page_url: window.location.href + `#${modal}`,
        metadata: { action: "modal_open", modal_type: modal },
      });
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setQuizStep(0);
    setQuizData({
      name: "",
      email: "",
      phone: "",
      employment: "",
      buying: "",
      current: "",
    });
    setBuyerForm({ name: "", email: "", phone: "", message: "" });
    setSellerForm({ name: "", email: "", phone: "", message: "" });
    setShowSuccess(false);
  };

  // Form Handlers
  const handleBuyerSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await supabase.from("buyer_consultation_requests").insert({
        ...buyerForm,
        utm_code: utmCode,
        contact_id: contactId,
      });
      setShowSuccess(true);
      setTimeout(closeModal, 2500);
    } catch (err) {
      console.error("Buyer form error:", err);
    }
  };

  const handleSellerSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await supabase.from("seller_consultation_requests").insert({
        ...sellerForm,
        utm_code: utmCode,
        contact_id: contactId,
      });
      setShowSuccess(true);
      setTimeout(closeModal, 2500);
    } catch (err) {
      console.error("Seller form error:", err);
    }
  };

  const handleLenderQuizSubmit = async () => {
    try {
      await supabase.from("lender_quiz_submissions").insert({
        name: quizData.name,
        email: quizData.email,
        phone: quizData.phone,
        employment_status: quizData.employment,
        buying_situation: quizData.buying,
        current_status: quizData.current,
        utm_code: utmCode,
        contact_id: contactId,
      });
      setShowSuccess(true);
      setTimeout(closeModal, 2500);
    } catch (err) {
      console.error("Lender quiz error:", err);
    }
  };

  const nextQuizStep = () => {
    if (quizStep < 4) setQuizStep(quizStep + 1);
  };

  const prevQuizStep = () => {
    if (quizStep > 0) setQuizStep(quizStep - 1);
  };

  // Placeholder property images
  const properties = [
    { id: 1, image: "/placeholder-property-1.jpg", alt: "Luxury Home 1" },
    { id: 2, image: "/placeholder-property-2.jpg", alt: "Luxury Home 2" },
    { id: 3, image: "/placeholder-property-3.jpg", alt: "Luxury Home 3" },
    { id: 4, image: "/placeholder-property-4.jpg", alt: "Luxury Home 4" },
    { id: 5, image: "/placeholder-property-5.jpg", alt: "Luxury Home 5" },
    { id: 6, image: "/placeholder-property-6.jpg", alt: "Luxury Home 6" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F0F] via-[#1A1A1A] to-[#0A0A0A]">
      {/* PROFILE SECTION */}
      <section className="max-w-2xl mx-auto px-4 pt-12 pb-8 text-center">
        {/* Profile Photo */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFD54F] to-[#FFAB91] rounded-full blur-xl opacity-40 animate-pulse" />
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[#2A2A2A] shadow-2xl">
            <Image
              src="/placeholder-profile.jpg"
              alt="Kerry Lee Hartley"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Name */}
        <p className="text-sm text-gray-400 mb-2 tracking-wide">
          Kerry Lee Hartley
        </p>

        {/* Hero Text */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Built for Atlanta's Next Generation
        </h1>
        <p className="text-lg text-gray-300 mb-6 max-w-lg mx-auto">
          Your trusted real estate adviser for tech pros, entrepreneurs, and
          high earners.
        </p>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4 mb-6">
          {/* Forbes Logo */}
          <a
            href="https://www.forbesglobalproperties.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-[#2A2A2A] hover:bg-[#3A3A3A] shadow-lg hover:shadow-xl transition-all flex items-center justify-center group relative"
          >
            <Image
              src="/logos/forbes-logo.svg"
              alt="Forbes Global Properties"
              width={32}
              height={32}
              className="object-contain"
            />
          </a>
          <a
            href="https://linkedin.com/in/kerryleehartley"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-[#2A2A2A] hover:bg-[#3A3A3A] shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
          >
            <Linkedin className="w-5 h-5 text-[#0A66C2] group-hover:scale-110 transition-transform" />
          </a>
          <a
            href="https://instagram.com/kerryleehartley"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-[#2A2A2A] hover:bg-[#3A3A3A] shadow-lg hover:shadow-xl transition-all flex items-center justify-center group relative overflow-hidden"
          >
            {/* Instagram gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#FD1D1D] opacity-0 group-hover:opacity-20 transition-opacity" />
            <Instagram className="w-5 h-5 text-[#E1306C] group-hover:scale-110 transition-transform relative z-10" />
          </a>
        </div>

        {/* Gradient Line Divider */}
        <div className="relative max-w-md mx-auto mb-2">
          <div className="relative h-px w-full">
            {/* Outer glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD54F]/30 to-transparent blur-sm" />
            {/* Main line */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FFD54F] to-transparent" />
          </div>
        </div>
      </section>

      {/* MAIN CTAs - Light Cream Background with Animated Blobs */}
      <section
        className="max-w-md mx-auto px-4 py-12 my-8 relative overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, #FFF8E7, #FFF0E0, #FFF8E7)",
        }}
      >
        {/* Animated Blob Orbs in Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top Left Blob */}
          <div
            className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl opacity-30"
            style={{
              background: "linear-gradient(135deg, #FFD54F, #FFAB91)",
              animation: "blob 7s infinite",
            }}
          />
          {/* Bottom Right Blob */}
          <div
            className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{
              background: "linear-gradient(135deg, #FFAB91, #FFD54F)",
              animation: "blob 7s infinite",
              animationDelay: "2s",
            }}
          />
          {/* Center Floating Blob */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-10"
            style={{
              background: "radial-gradient(circle, #FFD54F, transparent)",
              animation: "blob 10s infinite",
              animationDelay: "4s",
            }}
          />
        </div>

        {/* Buttons - Now with Rich Depth */}
        <div className="space-y-4 relative z-10">
          {/* Buyer Consultation */}
          <button
            onClick={() => openModal("buyer")}
            className="w-full py-4 px-6 rounded-full bg-white text-[#1A1A1A] font-semibold text-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 flex items-center justify-between group"
            style={{
              border: "2px solid transparent",
              backgroundImage:
                "linear-gradient(white, white), linear-gradient(to right, #FFD54F, #FFAB91)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              boxShadow: "0 10px 25px rgba(255, 213, 79, 0.15)",
            }}
          >
            <span className="flex items-center gap-3">
              <Calendar className="w-6 h-6 group-hover:scale-110 transition-transform" />
              Schedule Buyer Consultation
            </span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>

          {/* Seller Consultation */}
          <button
            onClick={() => openModal("seller")}
            className="w-full py-4 px-6 rounded-full bg-white text-[#1A1A1A] font-semibold text-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 flex items-center justify-between group"
            style={{
              border: "2px solid transparent",
              backgroundImage:
                "linear-gradient(white, white), linear-gradient(to right, #FFD54F, #FFAB91)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              boxShadow: "0 10px 25px rgba(255, 213, 79, 0.15)",
            }}
          >
            <span className="flex items-center gap-3">
              <Home className="w-6 h-6 group-hover:scale-110 transition-transform" />
              Schedule Seller Consultation
            </span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>

          {/* Need Lender */}
          <button
            onClick={() => openModal("lender")}
            className="w-full py-4 px-6 rounded-full bg-white text-[#1A1A1A] font-semibold text-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 flex items-center justify-between group"
            style={{
              border: "2px solid transparent",
              backgroundImage:
                "linear-gradient(white, white), linear-gradient(to right, #FFD54F, #FFAB91)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              boxShadow: "0 10px 25px rgba(255, 213, 79, 0.15)",
            }}
          >
            <span className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 group-hover:scale-110 transition-transform" />
              Need a Lender?
            </span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>

          {/* Testimonials */}
          <a
            href="/testimonials"
            target="_blank"
            className="w-full py-4 px-6 rounded-full bg-white text-[#1A1A1A] font-semibold text-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 flex items-center justify-between group block"
            style={{
              border: "2px solid transparent",
              backgroundImage:
                "linear-gradient(white, white), linear-gradient(to right, #FFD54F, #FFAB91)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              boxShadow: "0 10px 25px rgba(255, 213, 79, 0.15)",
            }}
          >
            <span className="flex items-center gap-3">
              <Star className="w-6 h-6 group-hover:scale-110 transition-transform" />
              Testimonials
            </span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </section>

      {/* INSTAGRAM FEED SECTION */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Exquisite Homes. Exceptional Service.
          </h2>
          <p className="text-gray-400">
            Exclusive Georgia member of Forbes Global Properties
          </p>
        </div>

        {/* Horizontal Scroll Grid */}
        <div className="relative">
          <div
            ref={instagramScrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          >
            {properties.map((property) => (
              <a
                key={property.id}
                href="https://www.instagram.com/forbesglobalproperties"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-none snap-center w-64"
              >
                <div className="relative h-full">
                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 rounded-2xl blur-md opacity-20 group-hover:opacity-40 transition-opacity"
                    style={{
                      background:
                        "linear-gradient(to bottom right, #FFD54F, #FFAB91)",
                    }}
                  />
                  {/* Card */}
                  <div className="relative bg-[#2A2A2A] rounded-2xl shadow-lg overflow-hidden group-hover:shadow-2xl group-hover:-translate-y-1 transition-all h-full">
                    {/* Property Image */}
                    <div className="h-64 bg-gray-800 flex items-center justify-center overflow-hidden relative">
                      <Image
                        src={property.image}
                        alt={property.alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Instagram overlay on hover */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Instagram className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Gradient Scroll Bar */}
          <div className="relative h-1 mx-4 mt-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFD54F] via-[#FFAB91] to-[#FFD54F] opacity-50" />
          </div>

          {/* View More Button */}
          <div className="text-center mt-6">
            <a
              href="https://www.instagram.com/forbesglobalproperties"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1A1A1A] font-semibold rounded-full hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 shadow-lg"
              style={{
                border: "2px solid transparent",
                backgroundImage:
                  "linear-gradient(white, white), linear-gradient(to right, #FFD54F, #FFAB91)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                boxShadow: "0 10px 25px rgba(255, 213, 79, 0.15)",
              }}
            >
              <Instagram className="w-5 h-5" />
              View More on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* MODALS */}
      {activeModal && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-[#1A1A1A] rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#2A2A2A] hover:bg-[#3A3A3A] transition-colors flex items-center justify-center z-10"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* BUYER CONSULTATION MODAL */}
            {activeModal === "buyer" && !showSuccess && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Let's Find Your Home
                </h2>
                <p className="text-gray-400 mb-6">
                  Schedule a consultation to get started
                </p>
                <form onSubmit={handleBuyerSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={buyerForm.name}
                    onChange={(e) =>
                      setBuyerForm({ ...buyerForm, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD54F] transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    value={buyerForm.email}
                    onChange={(e) =>
                      setBuyerForm({ ...buyerForm, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD54F] transition-all"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={buyerForm.phone}
                    onChange={(e) =>
                      setBuyerForm({ ...buyerForm, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD54F] transition-all"
                  />
                  <textarea
                    placeholder="Tell me about what you're looking for..."
                    rows={3}
                    value={buyerForm.message}
                    onChange={(e) =>
                      setBuyerForm({ ...buyerForm, message: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD54F] transition-all resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                    style={{
                      background: "linear-gradient(to right, #FFD54F, #FFAB91)",
                    }}
                  >
                    Request Consultation
                  </button>
                </form>
              </div>
            )}

            {/* SELLER CONSULTATION MODAL */}
            {activeModal === "seller" && !showSuccess && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Ready to Sell?
                </h2>
                <p className="text-gray-400 mb-6">
                  Let's create a winning strategy together
                </p>
                <form onSubmit={handleSellerSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={sellerForm.name}
                    onChange={(e) =>
                      setSellerForm({ ...sellerForm, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD54F] transition-all"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    value={sellerForm.email}
                    onChange={(e) =>
                      setSellerForm({ ...sellerForm, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD54F] transition-all"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={sellerForm.phone}
                    onChange={(e) =>
                      setSellerForm({ ...sellerForm, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD54F] transition-all"
                  />
                  <textarea
                    placeholder="Tell me about your property..."
                    rows={3}
                    value={sellerForm.message}
                    onChange={(e) =>
                      setSellerForm({ ...sellerForm, message: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD54F] transition-all resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                    style={{
                      background: "linear-gradient(to right, #FFD54F, #FFAB91)",
                    }}
                  >
                    Request Consultation
                  </button>
                </form>
              </div>
            )}

            {/* LENDER QUIZ MODAL */}
            {activeModal === "lender" && !showSuccess && (
              <div className="p-8">
                {/* Progress Dots */}
                <div className="flex justify-center gap-2 mb-6">
                  {[0, 1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`w-2 h-2 rounded-full transition-all ${
                        step === quizStep
                          ? "bg-[#FFD54F] w-8"
                          : step < quizStep
                          ? "bg-[#FFAB91]"
                          : "bg-gray-700"
                      }`}
                    />
                  ))}
                </div>

                {/* Step 0: Contact Info */}
                {quizStep === 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Connect with Our Lender
                    </h2>
                    <p className="text-gray-400 mb-6">
                      Let's start with your info
                    </p>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        value={quizData.name}
                        onChange={(e) =>
                          setQuizData({ ...quizData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD54F] transition-all"
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        required
                        value={quizData.email}
                        onChange={(e) =>
                          setQuizData({ ...quizData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD54F] transition-all"
                      />
                      <input
                        type="tel"
                        placeholder="Phone (optional)"
                        value={quizData.phone}
                        onChange={(e) =>
                          setQuizData({ ...quizData, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD54F] transition-all"
                      />
                      <button
                        onClick={nextQuizStep}
                        disabled={!quizData.name || !quizData.email}
                        className="w-full py-4 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          background:
                            "linear-gradient(to right, #FFD54F, #FFAB91)",
                        }}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 1: Employment */}
                {quizStep === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Employment Status
                    </h2>
                    <p className="text-gray-400 mb-6">
                      How do you earn income?
                    </p>
                    <div className="space-y-3">
                      {["Employed", "Self-Employed", "Both"].map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setQuizData({
                              ...quizData,
                              employment: option.toLowerCase(),
                            });
                            nextQuizStep();
                          }}
                          className="w-full py-4 px-6 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white font-medium hover:border-[#FFD54F] hover:bg-[#2A2A2A]/80 transition-all text-left"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={prevQuizStep}
                      className="w-full mt-4 py-3 text-gray-400 hover:text-white transition-colors"
                    >
                      Back
                    </button>
                  </div>
                )}

                {/* Step 2: Buying Situation */}
                {quizStep === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Your Buying Situation
                    </h2>
                    <p className="text-gray-400 mb-6">What's your plan?</p>
                    <div className="space-y-3">
                      {[
                        { label: "Selling to Buy", value: "selling-to-buy" },
                        { label: "Buying Only", value: "buying-only" },
                        { label: "Not Sure", value: "not-sure" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setQuizData({ ...quizData, buying: option.value });
                            nextQuizStep();
                          }}
                          className="w-full py-4 px-6 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white font-medium hover:border-[#FFD54F] hover:bg-[#2A2A2A]/80 transition-all text-left"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={prevQuizStep}
                      className="w-full mt-4 py-3 text-gray-400 hover:text-white transition-colors"
                    >
                      Back
                    </button>
                  </div>
                )}

                {/* Step 3: Current Status */}
                {quizStep === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Current Housing
                    </h2>
                    <p className="text-gray-400 mb-6">
                      Do you currently own or rent?
                    </p>
                    <div className="space-y-3">
                      {["Own", "Rent"].map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setQuizData({
                              ...quizData,
                              current: option.toLowerCase(),
                            });
                            nextQuizStep();
                          }}
                          className="w-full py-4 px-6 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white font-medium hover:border-[#FFD54F] hover:bg-[#2A2A2A]/80 transition-all text-left"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={prevQuizStep}
                      className="w-full mt-4 py-3 text-gray-400 hover:text-white transition-colors"
                    >
                      Back
                    </button>
                  </div>
                )}

                {/* Step 4: Review & Submit */}
                {quizStep === 4 && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Perfect!
                    </h2>
                    <p className="text-gray-400 mb-6">
                      We'll connect you with our lending partner who specializes
                      in programs for entrepreneurs and business owners.
                    </p>
                    <div className="bg-[#2A2A2A] rounded-lg p-4 mb-6 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Employment:</span>
                        <span className="text-white font-medium capitalize">
                          {quizData.employment}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Situation:</span>
                        <span className="text-white font-medium capitalize">
                          {quizData.buying.replace("-", " ")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Current:</span>
                        <span className="text-white font-medium capitalize">
                          {quizData.current}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handleLenderQuizSubmit}
                      className="w-full py-4 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                      style={{
                        background:
                          "linear-gradient(to right, #FFD54F, #FFAB91)",
                      }}
                    >
                      Submit
                    </button>
                    <button
                      onClick={prevQuizStep}
                      className="w-full mt-4 py-3 text-gray-400 hover:text-white transition-colors"
                    >
                      Back
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* SUCCESS STATE */}
            {showSuccess && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#FFD54F] to-[#FFAB91] flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Success!</h2>
                <p className="text-gray-400">I'll be in touch soon.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CALL BUTTON - Circular Phone Icon with Depth */}
      <a
        href="tel:+14045551234"
        className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-white shadow-lg hover:shadow-2xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
        style={{
          border: "3px solid transparent",
          backgroundImage:
            "linear-gradient(white, white), linear-gradient(to right, #FFD54F, #FFAB91)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
          boxShadow: "0 10px 25px rgba(255, 213, 79, 0.2)",
        }}
      >
        <Phone className="w-6 h-6 text-[#1A1A1A]" />
      </a>

      {/* FOOTER */}
      <footer className="text-center py-12 border-t border-gray-800">
        {/* Your Name */}
        <p className="text-gray-400 text-sm mb-4">
          Kerry Lee Hartley, REALTOR®
        </p>

        {/* Harry Norman Logo */}
        <div className="relative h-10 w-32 mx-auto mb-3">
          <Image
            src="/logos/harry-norman-logo.svg"
            alt="Harry Norman Realtors"
            fill
            className="object-contain"
          />
        </div>

        <p className="text-gray-500 text-xs">
          Exclusive Georgia member of Forbes Global Properties
        </p>
      </footer>

      {/* Hide scrollbar but keep functionality */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Blob animation for floating orbs */}
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
      `}</style>
    </div>
  );
}
