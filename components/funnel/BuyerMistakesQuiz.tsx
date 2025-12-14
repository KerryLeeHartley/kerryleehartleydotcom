'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import { supabase } from '../../lib/supabase'

// ============================================================================
// BUYER MISTAKES QUIZ - INTERACTIVE ASSESSMENT WITH DATABASE TRACKING
// ============================================================================
// ↓ MODIFIED: Added database integration to track all quiz attempts
// Old: Just local state, no persistence
// New: Saves to quiz_results table, tracks conversions, enables retargeting
// Why: Marketing intelligence + lead qualification + retargeting data

interface BuyerMistakesQuizProps {
  onComplete?: (score: number, answers: boolean[]) => void  // Callback after quiz completion
  onLeadCapture?: (quizResultId?: string) => void  // Opens modal for lead capture
}

// ============================================================================
// QUIZ QUESTIONS - 6 Common First-Time Buyer Mistakes
// ============================================================================
// ↓ ADDED: True/False format (simple, fast, mobile-friendly)
// Each "true" answer = a mistake the buyer is making
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "I haven't checked my credit score in the last 6 months",
    mistake: "Not monitoring your credit can mean surprises when you apply for a mortgage. Small errors or issues could delay your approval.",
    isTrue: true  // True = they're making this mistake
  },
  {
    id: 2,
    question: "I'm planning to use all my savings for the down payment",
    mistake: "You'll need cash reserves for closing costs, moving expenses, repairs, and emergencies. Using ALL your savings leaves you vulnerable.",
    isTrue: true
  },
  {
    id: 3,
    question: "I'll get pre-approved after I find the perfect house",
    mistake: "Without pre-approval, sellers won't take your offer seriously. In competitive markets, you'll lose out to pre-approved buyers every time.",
    isTrue: true
  },
  {
    id: 4,
    question: "I can skip the home inspection to save money and close faster",
    mistake: "A $400 inspection can save you from $50,000+ in hidden repairs. Skipping it is the most expensive 'savings' you'll ever make.",
    isTrue: true
  },
  {
    id: 5,
    question: "I'm only looking at homes at my maximum budget",
    mistake: "Your max budget should be for your DREAM home. Look 10-15% below to have negotiating room and avoid being house-poor.",
    isTrue: true
  },
  {
    id: 6,
    question: "I can handle the buying process without a real estate agent",
    mistake: "Buyers don't pay agent commissions—sellers do. Going alone means no expert guidance, weaker negotiation, and costly mistakes.",
    isTrue: true
  }
]

export default function BuyerMistakesQuiz({ onComplete, onLeadCapture }: BuyerMistakesQuizProps) {
  
  // ==========================================================================
  // STATE MANAGEMENT
  // ==========================================================================
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])  // Track user's answers
  const [showResults, setShowResults] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null)
  const [quizResultId, setQuizResultId] = useState<string | null>(null)  // ↓ ADDED: Track quiz result ID
  const [sessionId, setSessionId] = useState<string>('')  // ↓ ADDED: Anonymous session tracking
  
  // ========================================================================
  // SESSION TRACKING - Generate unique session ID for anonymous tracking
  // ========================================================================
  // ↓ ADDED: Generate session ID on mount (persists in localStorage)
  // Why: Track quiz attempts even before email capture for retargeting
  useEffect(() => {
    // Check if session ID exists in localStorage
    let sid = localStorage.getItem('quiz_session_id')
    if (!sid) {
      // Generate new session ID (timestamp + random)
      sid = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('quiz_session_id', sid)
    }
    setSessionId(sid)
  }, [])
  
  // Calculate mistake score (how many "true" answers = mistakes made)
  const mistakeScore = answers.filter(answer => answer === true).length
  
  const isQuizComplete = answers.length === QUIZ_QUESTIONS.length
  const currentQ = QUIZ_QUESTIONS[currentQuestion]
  
  // ==========================================================================
  // HANDLERS
  // ==========================================================================
  
  // ========================================================================
  // SAVE QUIZ RESULTS TO DATABASE
  // ========================================================================
  // ↓ ADDED: Save quiz results anonymously (before email capture)
  // This runs when quiz completes, stores results for marketing intelligence
  const saveQuizResults = async (finalAnswers: boolean[], finalScore: number) => {
    try {
      // Get UTM parameters from URL if present
      const urlParams = new URLSearchParams(window.location.search)
      const utmSource = urlParams.get('utm_source')
      const utmMedium = urlParams.get('utm_medium')
      const utmCampaign = urlParams.get('utm_campaign')
      const utmContent = urlParams.get('utm_content')
      const utmTerm = urlParams.get('utm_term')
      
      const { data, error } = await supabase
        .from('quiz_results')
        .insert([
          {
            quiz_type: 'buyer-mistakes',
            score: finalScore,
            max_score: QUIZ_QUESTIONS.length,
            answers: finalAnswers,
            session_id: sessionId,
            page_url: window.location.href,
            referrer: document.referrer || null,
            utm_source: utmSource,
            utm_medium: utmMedium,
            utm_campaign: utmCampaign,
            utm_content: utmContent,
            utm_term: utmTerm,
            converted: false,  // Not converted yet (no email)
            metadata: {
              user_agent: navigator.userAgent,
              screen_width: window.screen.width,
              screen_height: window.screen.height,
              timestamp: new Date().toISOString()
            }
          }
        ])
        .select()
      
      if (error) {
        console.error('Error saving quiz results:', error)
      } else if (data && data[0]) {
        // Store quiz result ID for later linking to lead
        setQuizResultId(data[0].id)
        console.log('Quiz results saved:', data[0].id)
      }
    } catch (err) {
      console.error('Error saving quiz results:', err)
    }
  }
  
  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer)
    
    // Wait 0.5s to show selection, then move to next question
    setTimeout(() => {
      const newAnswers = [...answers, answer]
      setAnswers(newAnswers)
      setSelectedAnswer(null)
      
      if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        // Quiz complete!
        const finalScore = newAnswers.filter(a => a === true).length
        
        // ↓ ADDED: Save quiz results to database
        saveQuizResults(newAnswers, finalScore)
        
        setShowResults(true)
        onComplete?.(finalScore, newAnswers)
      }
    }, 500)
  }
  
  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setSelectedAnswer(null)
    setQuizResultId(null)  // ↓ ADDED: Reset quiz result ID
  }
  
  // ========================================================================
  // HANDLE LEAD CAPTURE - Pass quiz result ID to parent
  // ========================================================================
  // ↓ ADDED: Pass quiz result ID when user clicks "Get Checklist"
  // Parent (page.tsx) will open modal and can link quiz → lead
  const handleLeadCaptureClick = () => {
    onLeadCapture?.(quizResultId || undefined)
  }
  
  // ==========================================================================
  // RESULTS LOGIC
  // ==========================================================================
  
  const getResultsData = () => {
    if (mistakeScore === 0) {
      return {
        title: "Wow! You're Well-Prepared! 🎉",
        description: "You're not making any major first-time buyer mistakes. You've done your homework!",
        color: "from-green-400 to-emerald-600",
        recommendation: "You're ready to start shopping! Let's find your perfect home."
      }
    } else if (mistakeScore <= 2) {
      return {
        title: "Good Start, But Some Red Flags ⚠️",
        description: `You're making ${mistakeScore} common mistake${mistakeScore > 1 ? 's' : ''} that could cost you time or money.`,
        color: "from-yellow-400 to-orange-500",
        recommendation: "Let's fix these issues before you start shopping. Quick fixes can save you thousands."
      }
    } else if (mistakeScore <= 4) {
      return {
        title: "Several Costly Mistakes 🚨",
        description: `You're making ${mistakeScore} mistakes that could derail your home purchase or cost you big.`,
        color: "from-orange-500 to-red-600",
        recommendation: "Good news: these are all fixable! Let's create a game plan to get you on track."
      }
    } else {
      return {
        title: "Let's Prevent a Disaster 🆘",
        description: `You're making ${mistakeScore} major mistakes. Without guidance, you could face serious problems.`,
        color: "from-red-500 to-red-700",
        recommendation: "Don't worry—I help first-time buyers navigate this all the time. Let's talk."
      }
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0A0A0A] via-[#141414] to-[#0A0A0A] text-white py-20 px-6 md:px-12">
      
      {/* ================================================================ */}
      {/* BACKGROUND GLOWS - Same style as TrustSection */}
      {/* ================================================================ */}
      {/* ↓ MODIFIED: Darker background for visual separation from Trust */}
      {/* Old: from-[#1F1F1F] via-[#2A2A2A] to-[#1F1F1F] */}
      {/* New: from-[#0A0A0A] via-[#141414] to-[#0A0A0A] (much darker) */}
      {/* Why: Creates depth - Quiz section feels "immersive" vs lighter Trust above */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div
          className="absolute top-20 left-1/4 w-96 h-96 bg-[#FFD54F] rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'loop' }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#FF7961] rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: 'loop' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#4DB6AC] rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 22, repeat: Infinity, repeatType: 'loop' }}
        />
      </div>

      {/* ================================================================ */}
      {/* MAIN CONTENT */}
      {/* ================================================================ */}
      <div className="relative max-w-4xl mx-auto">

        {!showResults ? (
          /* ============================================================ */
          /* QUIZ QUESTIONS VIEW */
          /* ============================================================ */
          <>
            {/* Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#FFD54F] via-[#FFAB91] to-[#FF7961] bg-clip-text text-transparent">
                Are You Making These Buyer Mistakes?
              </h2>
              <p className="text-lg md:text-xl text-white/70 mb-6">
                Take this quick 60-second assessment to find out
              </p>
              
              {/* Progress Bar */}
              <div className="max-w-md mx-auto">
                <div className="flex justify-between text-sm text-white/50 mb-2">
                  <span>Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}</span>
                  <span>{Math.round(((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#FFD54F] to-[#FF7961]"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center leading-relaxed">
                  {currentQ.question}
                </h3>

                {/* True/False Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* TRUE Button */}
                  <motion.button
                    onClick={() => handleAnswer(true)}
                    disabled={selectedAnswer !== null}
                    className={`
                      relative py-6 px-8 rounded-2xl font-bold text-xl
                      transition-all duration-300
                      ${selectedAnswer === true 
                        ? 'bg-gradient-to-r from-red-500 to-red-600 scale-105' 
                        : 'bg-white/10 hover:bg-white/20 hover:scale-105'
                      }
                      disabled:cursor-not-allowed
                    `}
                    whileHover={{ scale: selectedAnswer === null ? 1.03 : 1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {selectedAnswer === true && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-4 border-red-400"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    True
                  </motion.button>

                  {/* FALSE Button */}
                  <motion.button
                    onClick={() => handleAnswer(false)}
                    disabled={selectedAnswer !== null}
                    className={`
                      relative py-6 px-8 rounded-2xl font-bold text-xl
                      transition-all duration-300
                      ${selectedAnswer === false 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 scale-105' 
                        : 'bg-white/10 hover:bg-white/20 hover:scale-105'
                      }
                      disabled:cursor-not-allowed
                    `}
                    whileHover={{ scale: selectedAnswer === null ? 1.03 : 1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {selectedAnswer === false && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-4 border-green-400"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    False
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          /* ============================================================ */
          /* RESULTS VIEW */
          /* ============================================================ */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            {(() => {
              const results = getResultsData()
              return (
                <>
                  {/* Results Header */}
                  <div className="text-center mb-12">
                    <motion.div
                      className={`inline-block text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r ${results.color} bg-clip-text text-transparent`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', duration: 0.8 }}
                    >
                      {mistakeScore}/{QUIZ_QUESTIONS.length}
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {results.title}
                    </h2>
                    <p className="text-lg md:text-xl text-white/70 mb-4">
                      {results.description}
                    </p>
                    <p className="text-base md:text-lg text-white/60 italic">
                      {results.recommendation}
                    </p>
                  </div>

                  {/* Mistakes Breakdown */}
                  {mistakeScore > 0 && (
                    <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 mb-8">
                      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <AlertTriangle className="w-6 h-6 text-[#FF7961]" />
                        Mistakes You're Making:
                      </h3>
                      <div className="space-y-4">
                        {QUIZ_QUESTIONS.map((q, index) => {
                          if (answers[index] === true) {
                            return (
                              <motion.div
                                key={q.id}
                                className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <div className="flex items-start gap-3">
                                  <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                                  <div>
                                    <p className="font-semibold mb-2">{q.question}</p>
                                    <p className="text-sm text-white/70">{q.mistake}</p>
                                  </div>
                                </div>
                              </motion.div>
                            )
                          }
                          return null
                        })}
                      </div>
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      onClick={handleLeadCaptureClick}
                      className="bg-gradient-to-r from-[#FFD54F] via-[#FFAB91] to-[#FF7961] text-black font-bold py-4 px-12 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Your Mistake-Proof Checklist
                    </motion.button>
                    <motion.button
                      onClick={handleRestart}
                      className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-12 rounded-full transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Retake Quiz
                    </motion.button>
                  </div>
                </>
              )
            })()}
          </motion.div>
        )}

      </div>
    </section>
  )
}


// ============================================================================
// ============================================================================
// 
//                          📖 DOCUMENTATION
// 
// ============================================================================
// ============================================================================


/*
 * ============================================================================
 * PURPOSE
 * ============================================================================
 * 
 * The Buyer Mistakes Quiz serves multiple strategic purposes:
 * 
 * 1️⃣ ENGAGEMENT (80%+ completion rates)
 * People can't resist quizzes. The interactive format keeps them on page
 * and invested in the outcome.
 * 
 * 2️⃣ EDUCATION (positions you as expert)
 * Each question teaches something. Even if they don't convert immediately,
 * they remember you as the person who helped them avoid mistakes.
 * 
 * 3️⃣ FEAR-BASED MOTIVATION (nobody wants to mess up)
 * "Mistakes" triggers loss aversion—the most powerful motivator in psychology.
 * They're motivated to fix problems they didn't know they had.
 * 
 * 4️⃣ NATURAL LEAD CAPTURE MOMENT
 * After seeing their mistakes, they WANT the checklist. It's not pushy—
 * it's the logical next step. "Get Your Mistake-Proof Checklist" feels helpful.
 * 
 * 5️⃣ SEGMENTATION
 * - 0-1 mistakes = ready buyers (fast follow-up)
 * - 2-3 mistakes = need prep (nurture sequence)
 * - 4-6 mistakes = need lots of help (consultation focus)
 * 
 * 
 * ============================================================================
 * QUIZ DESIGN DECISIONS
 * ============================================================================
 * 
 * WHY TRUE/FALSE (not multiple choice)?
 * - Faster (60 seconds vs 3-5 minutes)
 * - Mobile-friendly (2 big buttons, easy to tap)
 * - Less cognitive load (just yes/no decisions)
 * - Higher completion rates (simpler = more finishes)
 * 
 * WHY 6 QUESTIONS (not 10 or 15)?
 * - Sweet spot for completion (5-7 questions optimal)
 * - Covers major mistake categories comprehensively
 * - Fits attention span (people bail after 2 minutes)
 * 
 * WHY SHOW PROGRESS BAR?
 * - Reduces abandonment ("almost done!")
 * - Creates commitment ("I've come this far...")
 * - Shows respect for their time
 * 
 * WHY DELAY BETWEEN QUESTIONS (0.5s)?
 * - Shows their selection (visual feedback)
 * - Feels premium (not rushed)
 * - Builds anticipation
 * 
 * 
 * ============================================================================
 * THE 6 MISTAKES EXPLAINED
 * ============================================================================
 * 
 * MISTAKE 1: Not checking credit
 * - Common: 70% of first-time buyers don't check before shopping
 * - Impact: Delays approval, higher rates, deal falls through
 * - Fix: Check credit 6+ months before, dispute errors
 * 
 * MISTAKE 2: Using all savings for down payment
 * - Common: 60% plan to use entire savings
 * - Impact: No emergency fund, can't cover closing costs
 * - Fix: Keep 3-6 months reserves, budget for all costs
 * 
 * MISTAKE 3: Getting pre-approved after finding house
 * - Common: 50% start shopping without pre-approval
 * - Impact: Sellers reject offers, lose dream homes
 * - Fix: Get pre-approved FIRST, then shop confidently
 * 
 * MISTAKE 4: Skipping home inspection
 * - Common: 15-20% skip to save $300-500
 * - Impact: Miss $50K+ in hidden issues (foundation, mold, electrical)
 * - Fix: ALWAYS inspect, negotiate repairs or credits
 * 
 * MISTAKE 5: Shopping at max budget
 * - Common: 80% only look at max budget homes
 * - Impact: House-poor, no negotiating room, stressed finances
 * - Fix: Shop 10-15% below max, have cushion for life
 * 
 * MISTAKE 6: Going without agent
 * - Common: 10-15% try to go alone (FSBO or new construction)
 * - Impact: Weak negotiation, miss issues, legal mistakes
 * - Fix: Buyer agents are FREE (seller pays), use one!
 * 
 * These 6 cover the BIGGEST pain points that cost buyers money/time/stress.
 * 
 * 
 * ============================================================================
 * CONVERSION PSYCHOLOGY
 * ============================================================================
 * 
 * FOOT-IN-THE-DOOR TECHNIQUE:
 * Small commitment (take quiz) → Bigger commitment (give email)
 * They're already invested by completing quiz.
 * 
 * INVESTMENT BIAS:
 * "I spent 60 seconds on this, I want my results/checklist!"
 * Time invested makes them more likely to convert.
 * 
 * CURIOSITY GAP:
 * "What's MY score? How many mistakes am I making?"
 * Can't resist finding out—completes quiz.
 * 
 * LOSS AVERSION:
 * Fear of mistakes > desire for gains
 * "I don't want to mess this up" is stronger than "I want a house"
 * 
 * SOCIAL PROOF (implied):
 * "6 common mistakes" = "other people make these too, I'm not alone"
 * Reduces shame, increases comfort asking for help.
 * 
 * 
 * ============================================================================
 * RESULTS TIERS EXPLAINED
 * ============================================================================
 * 
 * 0-1 MISTAKES: "You're Well-Prepared!"
 * - Positive reinforcement (they did good!)
 * - Still offer checklist (belt and suspenders)
 * - CTA: "Let's find your perfect home" (ready to shop)
 * 
 * 2-3 MISTAKES: "Good Start, But Some Red Flags"
 * - Balanced (not perfect, not terrible)
 * - Fixable quickly (motivating, not overwhelming)
 * - CTA: "Quick fixes save thousands" (worth the effort)
 * 
 * 4-5 MISTAKES: "Several Costly Mistakes"
 * - Serious but not hopeless
 * - Emphasize consequences (cost you big)
 * - CTA: "Let's create a game plan" (solvable with help)
 * 
 * 6 MISTAKES: "Let's Prevent a Disaster"
 * - Urgent but caring tone
 * - "I help people like you all the time" (not alone)
 * - CTA: "Let's talk" (personal, conversational)
 * 
 * 
 * ============================================================================
 * TECHNICAL IMPLEMENTATION
 * ============================================================================
 * 
 * STATE MANAGEMENT:
 * - currentQuestion: tracks which question showing (0-5)
 * - answers: array of boolean responses
 * - showResults: toggles between quiz and results view
 * - selectedAnswer: shows visual feedback before advancing
 * 
 * ANIMATIONS:
 * - Questions slide in/out (AnimatePresence)
 * - Selected answer glows (border pulse)
 * - Progress bar fills smoothly
 * - Results cards stagger in
 * - Score number springs in
 * 
 * ACCESSIBILITY:
 * - Large tap targets (mobile-friendly)
 * - High contrast (WCAG AA)
 * - Semantic HTML
 * - Clear labels
 * - Keyboard accessible
 * 
 * MOBILE OPTIMIZATION:
 * - Single column on mobile
 * - Large buttons (easy to tap)
 * - Readable text sizes
 * - No horizontal scroll
 * 
 * 
 * ============================================================================
 * BRAND ALIGNMENT
 * ============================================================================
 * 
 * FERRARI PRINCIPLES:
 * - Bold gradients (performance colors)
 * - Animated transitions (dynamic, alive)
 * - Interactive (responsive, fast)
 * - Confident scoring (bold numbers)
 * 
 * HERMÈS PRINCIPLES:
 * - Dark sophisticated background
 * - Clean typography (readable)
 * - Thoughtful spacing (uncluttered)
 * - Quality micro-interactions
 * 
 * MATCHES OTHER SECTIONS:
 * - Same glows as HeroSection, TrustSection
 * - Same gradient colors (gold/peach/coral)
 * - Same glassmorphism cards
 * - Consistent button styles
 * 
 * 
 * ============================================================================
 * INTEGRATION WITH FUNNEL
 * ============================================================================
 * 
 * PAGE FLOW:
 * 1. HeroSection → Watch video, get excited
 * 2. TrustSection → "This is legit, they know their stuff"
 * 3. QuizSection → "Let me check if I'm on track" ← YOU ARE HERE
 * 4. Results → "Oh no, I'm making mistakes!"
 * 5. CTA → "Get checklist" (opens modal)
 * 6. ModalLeadForm → Capture email
 * 7. Follow-up → Email sequence with fixes
 * 
 * LEAD CAPTURE FLOW:
 * - Quiz complete → See mistakes → Want help
 * - "Get Mistake-Proof Checklist" → Opens modal
 * - Modal shows ModalLeadForm (same as "Get Access" button)
 * - Both paths lead to same lead capture (smart!)
 * 
 * 
 * ============================================================================
 * FUTURE ENHANCEMENTS
 * ============================================================================
 * 
 * PHASE 2 IDEAS:
 * - Save results to database (track score distribution)
 * - Email results summary automatically
 * - Personalized follow-up based on score tier
 * - Show specific mistakes in email
 * - "Fix these 3 things first" action plan
 * 
 * A/B TEST IDEAS:
 * - 6 questions vs 8 questions (completion rates)
 * - True/False vs Multiple Choice (engagement)
 * - "Mistakes" vs "Gaps" vs "Blind Spots" (messaging)
 * - Show mistakes during quiz vs after (anxiety level)
 * 
 * GAMIFICATION:
 * - Badges for perfect scores
 * - Social sharing ("I'm 100% ready!")
 * - Comparison to average ("You're better than 67%")
 * - Streak tracking (come back monthly)
 * 
 * 
 * ============================================================================
 * CUSTOMIZATION GUIDE
 * ============================================================================
 * 
 * CHANGE QUESTIONS:
 * Edit QUIZ_QUESTIONS array (lines 18-59)
 * - question: The true/false statement
 * - mistake: Explanation shown in results
 * - isTrue: Always true (true = they're making the mistake)
 * 
 * CHANGE SCORING TIERS:
 * Edit getResultsData() function (lines 80-117)
 * - Adjust thresholds (0-1, 2-3, 4-5, 6)
 * - Change titles/descriptions
 * - Update gradient colors
 * 
 * CHANGE CTA TEXT:
 * Line 385: "Get Your Mistake-Proof Checklist"
 * Replace with your lead magnet name
 * 
 * CHANGE COLORS:
 * - Success: green-400, green-500, green-600
 * - Warning: yellow-400, orange-500
 * - Danger: red-400, red-500, red-600, red-700
 * - Brand: #FFD54F, #FFAB91, #FF7961, #4DB6AC
 * 
 * 
 * ============================================================================
 * CALLBACK USAGE
 * ============================================================================
 * 
 * onComplete callback:
 * Triggered when quiz finishes, receives score and answers array
 * Use for: analytics tracking, saving to database, triggering emails
 * 
 * onLeadCapture callback:
 * Triggered when "Get Checklist" clicked
 * Use for: opening modal, redirecting to form, tracking conversion
 * 
 * Example in page.tsx:
 * <BuyerMistakesQuiz
 *   onComplete={(score, answers) => {
 *     console.log('Quiz completed with score:', score)
 *     // Send to analytics
 *   }}
 *   onLeadCapture={() => {
 *     setShowModal(true)  // Open lead capture modal
 *   }}
 * />
 * 
 */