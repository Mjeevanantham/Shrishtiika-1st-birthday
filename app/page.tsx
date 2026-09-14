"use client"

import * as React from "react"
import { MapPin, Heart, Sparkles, ChevronLeft, ChevronRight, Play, Pause, Shuffle } from "lucide-react"
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"
import { CursorProvider, HeartCursor, ClickHearts } from "@/components/ui/cursor"
import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card"
import { BirthdayPop } from "@/components/ui/birthday-pop"

/* ─── Baby Portraits with EXACT Matched Captions & Milestones ─── */
const portraits = [
  {
    id: "princess",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Joyful%20Baby%20Girl%20in%20Floral%20Tulle%20Dress-bOHV5mIIJy70rElIXHefU0aUkq1Jzh.png",
    alt: "Shrishtiika in floral tulle dress with arms up",
    tagEn: "Little Princess",
    tagTa: "சின்ன இளவரசி",
    captionEn: "pure happiness",
    captionTa: "பேரின்பம்",
    descEn: "Arms wide open, welcoming 365 days of unconditional love and laughter.",
    descTa: "அன்பையும் மகிழ்ச்சியையும் வாரி வழங்கும் எங்கள் வீட்டு குட்டி தேவதை.",
    milestoneEn: "Month 1",
    milestoneTa: "1-வது மாதம்",
    icon: "🌸",
  },
  {
    id: "cuddles",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Smiling%20Baby%20Cuddling%20a%20Teddy%20Bear-04te7UnbPa1sSucEkeYB5qCP3Stv6j.png",
    alt: "Shrishtiika cuddling a teddy bear",
    tagEn: "Teddy Hugs",
    tagTa: "கரடிப் பொம்மை",
    captionEn: "best cuddles",
    captionTa: "அன்புக் கட்டிப்பிடி",
    descEn: "Holding her favorite fluffy companion with the warmest cozy hugs.",
    descTa: "தன்னுடைய ஆசை கரடிப் பொம்மையை பாசத்தோடு அணைத்துக்கொண்ட தருணம்.",
    milestoneEn: "Month 3",
    milestoneTa: "3-வது மாதம்",
    icon: "🧸",
  },
  {
    id: "cake",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Joyful%20Pink%20Frosting%20Cake%20Smash-qNDdAcN7BSpGLVS9doyuJEgAUdJdHK.png",
    alt: "Shrishtiika enjoying birthday cake smash",
    tagEn: "Cake Smash",
    tagTa: "கேக் கொண்டாட்டம்",
    captionEn: "cake everywhere",
    captionTa: "கேக் கொண்டாட்டம்",
    descEn: "Pink frosting, sweet messy hands, and the happiest birthday celebration giggle!",
    descTa: "இனிப்பான இளஞ்சிவப்பு கேக் சுவைத்து மகிழ்ந்த செல்லக் குறும்பு சிரிப்பு!",
    milestoneEn: "Month 12",
    milestoneTa: "12-வது மாதம்",
    icon: "🎂",
  },
  {
    id: "wave",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Joyful%20Baby%20Girl%20Waving%20in%20Lace%20Dress-pk4BKGWg9C4gVoU3hMkMxf1hlc3XQ7.png",
    alt: "Shrishtiika waving in delicate lace dress",
    tagEn: "First Wave",
    tagTa: "முதல் அசைவு",
    captionEn: "hello, world",
    captionTa: "வணக்கம் உலகம்",
    descEn: "A tiny hand waving to everyone with curiosity and sparkling bright eyes.",
    descTa: "தன் குட்டி விரல்களால் உலகிற்கு வணக்கம் சொல்லும் அழகிய மழலை தருணம்.",
    milestoneEn: "Month 6",
    milestoneTa: "6-வது மாதம்",
    icon: "👋",
  },
  {
    id: "giggles",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Giggling%20Baby%20in%20Pink%20Tulle%20Dress-UurT4VBbfBa7pePuOHyydmWe3fY6uC.png",
    alt: "Shrishtiika giggling with hands covering mouth",
    tagEn: "Cheeky Giggles",
    tagTa: "மழலைச் சிரிப்பு",
    captionEn: "the sweetest smile",
    captionTa: "முதல் புன்னகை",
    descEn: "Covering her mouth in infectious laughter that brightens every single room.",
    descTa: "தன் வாயை மூடி குறும்புடன் சிரிக்கும் எங்களின் இதயத்துடிப்பு புன்னகை.",
    milestoneEn: "Month 9",
    milestoneTa: "9-வது மாதம்",
    icon: "😊",
  },
  {
    id: "dreamer",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Adorable%20Baby%20in%20Pink%20Frills-lcA6rrKOnuzSIvVxiiEBz0JcJQ5M48.png",
    alt: "Shrishtiika smiling gently in pink frills",
    tagEn: "Sweet Dreamer",
    tagTa: "அன்புக் கனவு",
    captionEn: "growing with love",
    captionTa: "அன்பில் வளர்கிறாள்",
    descEn: "Gentle smiles and peaceful thoughts, wrapped in rosy lace and warmth.",
    descTa: "அன்பின் மடியில் ஆசையாய் வளர்ந்து வரும் எங்கள் செல்ல மகள்.",
    milestoneEn: "Month 4",
    milestoneTa: "4-வது மாதம்",
    icon: "🎀",
  },
]

/* ─── Page Content (English & Tamil) ─── */
const content = {
  en: {
    eyebrow: "Come celebrate",
    firstName: "Shrishtiika",
    lastName: "Dwaraknaath",
    occasion: "First Birthday Celebration",
    quote: "One little year of boundless love, sweetest laughter and endless magic.",
    dateTimeLabel: "Date & Time",
    day: "Saturday",
    date: "26th September 2026",
    time: "6:00 PM – 8:00 PM",
    venueLabel: "Venue",
    venueName: "Zaitoon Velachery",
    venueAddress: "362, Velachery – Tambaram Main Road, opposite Adayar Ananda Bhavan, Velachery, Chennai 600042",
    openInMaps: "Open in Maps",
    signaturePrefix: "With boundless love,",
    signatureFamily: "Dwaraknaath, Srivarsini and Shrishtiika",
    scrollExplore: "scroll to explore",

    // Baby Showcase
    spotlightTag: "magical moments",
    spotlightTitle: "Shrishtiika's Storybook",
    spotlightSubtitle: "Tap a memory below to relive each precious milestone.",
    autoPlay: "Auto Play",
    pause: "Pause",

    // Draggable Memories
    momentsTag: "interactive memories",
    momentsHeading: "A year",
    momentsItalic: "in bloom.",
    momentsSubtitle: "Drag, toss and shuffle memories of Shrishtiika's first 365 magical days.",
    shuffleBtn: "Shuffle Memories ✨",

    // Countdown & Celebration
    countdownLabel: "Birthday In",
    daysUnit: "d",
    hoursUnit: "h",
    minsUnit: "m",
    secsUnit: "s",
    celebratingNow: "Celebrating Today! 🎂",
    popCelebration: "Pop ✨",

    // Ambient Music
    musicLabel: "Music",
    musicMuted: "Muted",

    // Footer - exactly as requested: "built with love by daddy cool and cool mama's"
    footerLove: "built with love by",
    footerDad: "daddy cool",
    footerAnd: "and",
    footerMom: "cool mama's",
  },
  ta: {
    eyebrow: "கொண்டாட வாருங்கள்",
    firstName: "ஸ்ரிஷ்டிகா",
    lastName: "த்வர்கநாத்",
    occasion: "முதல் பிறந்தநாள் கொண்டாட்டம்",
    quote: "அன்பும், மழலைச் சிரிப்பும் நிறைந்த ஓர் இனிய முதல் ஆண்டு.",
    dateTimeLabel: "தேதி & நேரம்",
    day: "சனிக்கிழமை",
    date: "26 செப்டம்பர் 2026",
    time: "மாலை 6:00 – 8:00",
    venueLabel: "இடம்",
    venueName: "ஜைத்தூன் வேளச்சேரி",
    venueAddress: "362, வேளச்சேரி – தாம்பரம் மெயின் ரோடு, அடையார் ஆனந்த பவன் எதிரில், வேளச்சேரி, சென்னை 600042",
    openInMaps: "வரைபடத்தில் திற",
    signaturePrefix: "அன்புடன்,",
    signatureFamily: "த்வர்கநாத், ஸ்ரீவர்சினி மற்றும் ஸ்ரிஷ்டிகா",
    scrollExplore: "கீழே பார்க்கவும்",

    // Baby Showcase
    spotlightTag: "அழகிய தருணங்கள்",
    spotlightTitle: "ஸ்ரிஷ்டிகாவின் கதையேடு",
    spotlightSubtitle: "ஒவ்வொரு மாத நினைவையும் தொட்டுப் பார்க்கவும்.",
    autoPlay: "தானியங்கி இயக்கம்",
    pause: "நிறுத்து",

    // Draggable Memories
    momentsTag: "இனிய நினைவுகள்",
    momentsHeading: "ஒரு மலர்ந்த",
    momentsItalic: "ஆண்டு.",
    momentsSubtitle: "ஸ்ரிஷ்டிகாவின் 365 நாள் அழகிய நினைவுகளை நகர்த்தி விளையாடுங்கள்.",
    shuffleBtn: "நினைவுகளை மாற்றுக ✨",

    // Countdown & Celebration
    countdownLabel: "பிறந்தநாளுக்கு இன்னும்",
    daysUnit: "நாள்",
    hoursUnit: "மணி",
    minsUnit: "நிமி",
    secsUnit: "நொடி",
    celebratingNow: "இன்று பிறந்தநாள் விழா! 🎂",
    popCelebration: "கொண்டாட்டம் ✨",

    // Ambient Music
    musicLabel: "இசை",
    musicMuted: "நிறுத்தம்",

    // Footer
    footerLove: "அன்புடன் உருவாக்கியவர்கள்",
    footerDad: "டாடி கூல்",
    footerAnd: "மற்றும்",
    footerMom: "கூல் மாமாஸ்",
  },
}

/* ─── Birthday Cake SVG ─── */
function BirthdayCakeSVG({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 140" fill="none" role="img" aria-label="1st Birthday Cake">
      <defs>
        <radialGradient id="flame-glow" cx="50%" cy="58%" r="50%">
          <stop offset="0%" stopColor="#ffd27a" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#f0a04a" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#f0a04a" stopOpacity="0" />
        </radialGradient>
        <clipPath id="cake-base-clip"><rect x="0" y="0" width="140" height="116.6" /></clipPath>
        <clipPath id="cake-plate-clip"><circle cx="70" cy="70" r="58.3" /></clipPath>
      </defs>
      <circle cx="70" cy="70" r="66" stroke="#c4a06a" strokeWidth="0.7" opacity="0.35" />
      <circle className="candle-ring-light" cx="70" cy="70" r="61" stroke="#e8c98a" strokeWidth="4" opacity={0.15} />
      <circle className="candle-ring" cx="70" cy="70" r="59" stroke="#c4a06a" strokeWidth="1.4" />
      <g clipPath="url(#cake-base-clip)">
        <path fill="#fff8f1" stroke="#9c3d45" strokeWidth="1.45" d="M36 130V100Q36 86 50 86h40q14 0 14 14v30Z" />
        <path fill="#fff8f1" d="M52 90V74Q52 64 62 64h16q10 0 10 10v16Z" />
        <path fill="none" stroke="#9c3d45" strokeWidth="1.45" strokeLinecap="round" d="M52 82V74Q52 64 62 64h16q10 0 10 10v8" />
        <path fill="#f3d5c4" stroke="#9c3d45" strokeWidth="1.45" d="M50 81h40Q104 81 104 92v4c-2.8 5.2-8.4 5.2-11.3 0-2.8 5.2-8.4 5.2-11.3 0-2.8 5.2-8.4 5.2-11.4 0-2.8 5.2-8.4 5.2-11.3 0-2.8 5.2-8.4 5.2-11.3 0-2.8 5.2-8.5 5.2-11.4 0V92Q36 81 50 81Z" />
        <circle cx="46" cy="90" r="1.35" fill="#fff8f1" />
        <circle cx="58" cy="88.5" r="1.2" fill="#fff8f1" />
        <circle cx="70" cy="91" r="1.35" fill="#fff8f1" />
        <circle cx="82" cy="88.8" r="1.2" fill="#fff8f1" />
        <circle cx="94" cy="90.5" r="1.3" fill="#fff8f1" />
        <path fill="#f3d5c4" stroke="#9c3d45" strokeWidth="1.45" d="M62 62h16Q88 62 88 70v4c-2.2 4.6-6.8 4.6-9 0-2.2 4.6-6.8 4.6-9 0-2.2 4.6-6.8 4.6-9 0-2.2 4.6-6.8 4.6-9 0V70Q52 62 62 62Z" />
        <circle cx="60" cy="68.5" r="1.2" fill="#fff8f1" />
        <circle cx="70" cy="67" r="1.35" fill="#fff8f1" />
        <circle cx="80" cy="69" r="1.2" fill="#fff8f1" />
      </g>
      <g clipPath="url(#cake-plate-clip)">
        <rect x="12" y="116.2" width="116" height="5.2" rx="2.6" fill="#c4a06a" />
      </g>
      <path fill="#c4a06a" stroke="#5a3210" strokeWidth="1.45" strokeLinejoin="round" strokeLinecap="round" d="M69.1 36.8H72.5Q73 36.8 73 37.5V54.4C73 55.5 74 56.1 75.4 56.1H75.6Q76.6 56.1 76.6 57.2V59Q76.6 60.2 75.4 60.2H64.6Q63.4 60.2 63.4 59V57.2Q63.4 56.1 64.6 56.1H64.8C66.2 56.1 67.2 55.5 67.2 54.4V43.6L65.4 45.2A1.4 1.4 0 0 1 64.2 43.6L69.1 36.8Z" />
      <g className="flame">
        <ellipse className="flame-halo" cx="70" cy="27.4" rx="6.8" ry="8.6" fill="url(#flame-glow)" />
        <path className="flame-outer" fill="#e86a3a" d="M70 21c-2.5 3.4-2.7 6.5 0 9 2.7-2.5 2.5-5.6 0-9Z" />
        <path className="flame-inner" fill="#ffd27a" d="M70 24.2c-1.15 1.6-1.25 3 0 4.3 1.25-1.3 1.15-2.7 0-4.3Z" />
      </g>
    </svg>
  )
}

/* ─── Floating Particles ─── */
function FloatingParticles() {
  return (
    <div className="floating-particles" aria-hidden="true">
      {Array.from({ length: 22 }).map((_, i) => (
        <span
          key={i}
          className="particle"
          style={{
            "--delay": `${(i * 0.4) % 7}s`,
            "--duration": `${7 + (i % 5) * 1.5}s`,
            "--x-start": `${(i * 4.6) % 100}%`,
            "--size": `${8 + (i % 4) * 4}px`,
            "--opacity": `${0.18 + (i % 3) * 0.12}`,
          } as React.CSSProperties}
        >
          {i % 4 === 0 ? "♥" : i % 4 === 1 ? "✦" : i % 4 === 2 ? "✧" : "🌸"}
        </span>
      ))}
    </div>
  )
}

/* ─── Horizontal Scroll Loader ─── */
const milestones = [
  { step: "01", title: "A Miracle Arrived", sub: "September 2025" },
  { step: "02", title: "365 Days of Joy", sub: "Love & giggles" },
  { step: "03", title: "Shrishtiika Turns One", sub: "Welcome to celebration" },
]

function HorizontalScrollLoader({ onComplete }: { onComplete: () => void }) {
  const [percent, setPercent] = React.useState(0)
  const [activeMilestone, setActiveMilestone] = React.useState(0)
  const hasFinishedRef = React.useRef(false)

  const finish = React.useCallback(() => {
    if (hasFinishedRef.current) return
    hasFinishedRef.current = true
    setPercent(100)
    onComplete()
  }, [onComplete])

  React.useEffect(() => {
    const duration = 2000
    const start = performance.now()

    const frame = (now: number) => {
      if (hasFinishedRef.current) return
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const pct = Math.floor(eased * 100)
      setPercent(pct)

      if (pct > 66) setActiveMilestone(2)
      else if (pct > 33) setActiveMilestone(1)
      else setActiveMilestone(0)

      if (progress < 1) {
        requestAnimationFrame(frame)
      } else {
        finish()
      }
    }

    const rafId = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafId)
  }, [finish])

  return (
    <motion.div
      className="cinema-loader"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        pointerEvents: "none",
        transition: { duration: 0.7, ease: "easeInOut" },
      }}
      onClick={finish}
    >
      <div className="cinema-loader-body">
        <motion.div
          className="loader-cake-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="loader-glow-aura" />
          <BirthdayCakeSVG className="loader-cake-svg" />
        </motion.div>

        <div className="loader-milestone-track">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMilestone}
              className="loader-milestone-card"
              initial={{ opacity: 0, x: 40, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -40, filter: "blur(4px)" }}
              transition={{ duration: 0.35 }}
            >
              <span className="milestone-badge">{milestones[activeMilestone].step}</span>
              <h3 className="milestone-title">{milestones[activeMilestone].title}</h3>
              <p className="milestone-sub">{milestones[activeMilestone].sub}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="loader-progress-wrapper">
          <div className="loader-progress-track">
            <motion.div
              className="loader-progress-bar"
              style={{ width: `${percent}%` }}
            />
            <div
              className="loader-progress-spark"
              style={{ left: `${percent}%` }}
            />
          </div>
          <div className="loader-progress-meta">
            <span>ENTERING CELEBRATION</span>
            <strong className="loader-pct-text">{percent}%</strong>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            finish()
          }}
          className="loader-skip-btn"
        >
          tap to enter ↗
        </button>
      </div>
    </motion.div>
  )
}

/* ─── Birthday Song Audio Tracks (English & Tamil) ─── */
const AUDIO_TRACKS: Record<"en" | "ta", string> = {
  en: "/the_mountain-happy-birthday-508020.mp3",
  ta: "/the_mountain-happy-birthday-576570.mp3",
}

/* ─── Birthday Countdown Calculator ─── */
interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  isCelebrationTime: boolean
}

function calculateDurationLeft(): TimeRemaining {
  // Saturday, 26th September 2026, 6:00 PM IST (UTC+05:30)
  const target = new Date("2026-09-26T18:00:00+05:30").getTime()
  const now = Date.now()
  const diff = target - now

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isCelebrationTime: true }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds, isCelebrationTime: false }
}

/* ─── Main Page ─── */
export default function Page() {
  const [hasEntered, setHasEntered] = React.useState(false)
  const [lang, setLang] = React.useState<"en" | "ta">("en")
  const [popTriggerKey, setPopTriggerKey] = React.useState(0)
  const [timeLeft, setTimeLeft] = React.useState<TimeRemaining>(calculateDurationLeft)
  const [isCountdownPulsing, setIsCountdownPulsing] = React.useState(false)

  // Background Ambient Music with Language Awareness & Mild Loop
  const [isMusicPlaying, setIsMusicPlaying] = React.useState(true)
  const audioRef = React.useRef<HTMLAudioElement | null>(null)

  // Interactive Story Spotlight Index with AUTOPLAY ON BY DEFAULT
  const [activeStoryIdx, setActiveStoryIdx] = React.useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true)

  // Scrapbook Shuffle Seed
  const [shuffleKey, setShuffleKey] = React.useState(0)

  const t = content[lang]
  const activeStory = portraits[activeStoryIdx]

  const { scrollYProgress } = useScroll()
  const heroParallax = useTransform(scrollYProgress, [0, 0.35], [0, -70])
  const cakeParallax = useTransform(scrollYProgress, [0, 0.35], [0, 50])
  const bgParallax = useTransform(scrollYProgress, [0, 1], [0, 180])

  // Initialize and auto-play background music softly in loop
  React.useEffect(() => {
    const audio = new Audio(AUDIO_TRACKS[lang])
    audio.loop = true
    audio.volume = 0.28 // Very smooth and mild background volume
    audioRef.current = audio

    const playAttempt = () => {
      audio.play().catch(() => {
        // Modern browser autoplay policies require user interaction
        const startOnFirstGesture = () => {
          audio.play().catch(() => {})
          window.removeEventListener("pointerdown", startOnFirstGesture)
          window.removeEventListener("keydown", startOnFirstGesture)
        }
        window.addEventListener("pointerdown", startOnFirstGesture, { once: true })
        window.addEventListener("keydown", startOnFirstGesture, { once: true })
      })
    }

    playAttempt()

    return () => {
      audio.pause()
      audio.src = ""
    }
  }, [])

  // Smoothly switch track when user switches between English and Tamil
  React.useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const targetSrc = AUDIO_TRACKS[lang]
    if (!audio.src.endsWith(targetSrc)) {
      const wasPlaying = !audio.paused
      audio.src = targetSrc
      audio.loop = true
      audio.volume = 0.28
      if (wasPlaying && isMusicPlaying) {
        audio.play().catch(() => {})
      }
    }
  }, [lang, isMusicPlaying])

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation()
    const audio = audioRef.current
    if (!audio) return
    if (isMusicPlaying) {
      audio.pause()
      setIsMusicPlaying(false)
    } else {
      audio.play().catch(() => {})
      setIsMusicPlaying(true)
    }
  }

  // Live countdown timer ticking every second
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateDurationLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Auto-play spotlight reel (default ON)
  React.useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setActiveStoryIdx((prev) => (prev + 1) % portraits.length)
    }, 3400)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const triggerHeartBurst = React.useCallback((clientX?: number, clientY?: number) => {
    const event = new PointerEvent("pointerdown", {
      clientX: clientX || window.innerWidth / 2,
      clientY: clientY || window.innerHeight / 2,
      bubbles: true,
    })
    window.dispatchEvent(event)
  }, [])

  // Handle Entrance from Loader -> Fire initial celebratory birthday pop & resume music if paused
  const handleEntranceComplete = () => {
    setHasEntered(true)
    setPopTriggerKey(Date.now())
    if (isMusicPlaying && audioRef.current?.paused) {
      audioRef.current.play().catch(() => {})
    }
  }

  // Handle Birthday Pop & Hearts celebration
  const handleCountdownClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsCountdownPulsing(true)
    setTimeout(() => setIsCountdownPulsing(false), 300)
    setPopTriggerKey(Date.now())
    triggerHeartBurst(e.clientX, e.clientY)
  }

  // Shuffle polaroids playfully
  const handleShuffle = () => {
    setShuffleKey((k) => k + 1)
    triggerHeartBurst()
  }

  // Double-tap or double-click a memory to like it
  const handleCardLike = (e: React.MouseEvent) => {
    setPopTriggerKey(Date.now())
    triggerHeartBurst(e.clientX, e.clientY)
  }

  return (
    <CursorProvider>
      <HeartCursor />
      <ClickHearts />

      {/* Birthday Confetti Pop Canvas Effect */}
      <BirthdayPop triggerKey={popTriggerKey} />

      {/* Cinematic Horizontal Loader Overlay */}
      <AnimatePresence>
        {!hasEntered && (
          <HorizontalScrollLoader
            key="cinema-loader"
            onComplete={handleEntranceComplete}
          />
        )}
      </AnimatePresence>

      <div className={`invitation-page ${lang === "ta" ? "font-tamil-active" : ""}`}>
        {/* Ambient Background with User's Uploaded Birthday Photo */}
        <motion.div
          className="ambient-bg-layer"
          style={{ y: bgParallax }}
          aria-hidden="true"
        >
          <img
            src="/birthday-bg.jpg"
            alt="Birthday backdrop"
            draggable={false}
          />
          <div className="ambient-gradient-overlay" />
        </motion.div>

        {/* Floating Romantic Particles */}
        <FloatingParticles />

        {/* Floating Birthday Countdown Pill */}
        <motion.button
          className={`birthday-countdown-pill ${isCountdownPulsing ? "is-pulsing" : ""}`}
          onClick={handleCountdownClick}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 400 }}
          aria-label="Birthday countdown"
          title="Tap to celebrate with confetti! 🎉"
        >
          <div className="countdown-icon-wrap">
            <span>🎂</span>
          </div>

          <div className="countdown-content">
            <span className="countdown-tagline">{t.countdownLabel}</span>
            <div className="countdown-timer-digits">
              {timeLeft.isCelebrationTime ? (
                <span>{t.celebratingNow}</span>
              ) : (
                <>
                  <span className="countdown-unit">
                    <span className="val">{timeLeft.days}</span>
                    <span className="lbl">{t.daysUnit}</span>
                  </span>
                  <span className="countdown-sep">:</span>
                  <span className="countdown-unit">
                    <span className="val">{String(timeLeft.hours).padStart(2, "0")}</span>
                    <span className="lbl">{t.hoursUnit}</span>
                  </span>
                  <span className="countdown-sep">:</span>
                  <span className="countdown-unit">
                    <span className="val">{String(timeLeft.minutes).padStart(2, "0")}</span>
                    <span className="lbl">{t.minsUnit}</span>
                  </span>
                  <span className="countdown-sep">:</span>
                  <span className="countdown-unit">
                    <span className="val">{String(timeLeft.seconds).padStart(2, "0")}</span>
                    <span className="lbl">{t.secsUnit}</span>
                  </span>
                </>
              )}
            </div>
          </div>

          <span className="countdown-pop-badge">
            <Sparkles size={11} />
            <span>{t.popCelebration}</span>
          </span>
        </motion.button>

        {/* ════════════════════════════════════════════ */}
        {/* ─── INVITATION POSTER CARD ─── */}
        {/* ════════════════════════════════════════════ */}
        <main className="invite-stage">
          <article className="invite-card">
            <span className="card-ornament-frame" aria-hidden="true" />

            <div className="card-content">
              {/* Top Nav: Eyebrow + Music Control + Language Switcher */}
              <div className="card-top-nav">
                <span className="invite-eyebrow">
                  <Sparkles size={11} className="inline mr-1" />
                  {t.eyebrow}
                </span>

                <div className="card-nav-actions">
                  <button
                    type="button"
                    className={`ambient-music-btn ${isMusicPlaying ? "is-playing" : "is-muted"}`}
                    onClick={toggleMusic}
                    title={isMusicPlaying ? t.musicLabel : t.musicMuted}
                    aria-label="Toggle background birthday song"
                  >
                    <div className="equalizer-bars" aria-hidden="true">
                      <span className="equalizer-bar" />
                      <span className="equalizer-bar" />
                      <span className="equalizer-bar" />
                    </div>
                    <span>{isMusicPlaying ? t.musicLabel : t.musicMuted}</span>
                  </button>

                  <div className="lang-switcher" role="radiogroup" aria-label="Select Language">
                    <button
                      type="button"
                      className={`lang-btn ${lang === "en" ? "is-active" : ""}`}
                      onClick={() => setLang("en")}
                      aria-checked={lang === "en"}
                      role="radio"
                    >
                      English
                    </button>
                    <button
                      type="button"
                      className={`lang-btn ${lang === "ta" ? "is-active" : ""}`}
                      onClick={() => setLang("ta")}
                      aria-checked={lang === "ta"}
                      role="radio"
                    >
                      தமிழ்
                    </button>
                  </div>
                </div>
              </div>

              {/* Hero Centerpiece: Birthday Cake */}
              <motion.div
                className="cake-stage"
                style={{ y: cakeParallax }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="cake-halo-glow" />
                <BirthdayCakeSVG className="poster-cake-svg" />
              </motion.div>

              {/* Celebration Header */}
              <motion.header
                className="poster-header"
                style={{ y: heroParallax }}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
              >
                <h1 className="poster-title">{t.firstName}</h1>
                <p className="poster-subtitle">{t.lastName}</p>
                <div className="badge-wrapper">
                  <span className="poster-badge">{t.occasion}</span>
                </div>
                <p className="poster-quote">{t.quote}</p>
              </motion.header>

              {/* Event Details Grid (Glassmorphic) */}
              <motion.section
                className="details-grid-card"
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {/* Date & Time */}
                <div className="detail-box">
                  <span className="box-tag">{t.dateTimeLabel}</span>
                  <p className="box-day">{t.day}</p>
                  <strong className="box-date">{t.date}</strong>
                  <p className="box-time">{t.time}</p>
                </div>

                {/* Venue */}
                <div className="detail-box">
                  <span className="box-tag">{t.venueLabel}</span>
                  <strong className="box-venue">{t.venueName}</strong>
                  <p className="box-address">{t.venueAddress}</p>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Zaitoon+Restaurant%2C+362+Velachery+Main+Road%2C+Velachery%2C+Chennai+600042"
                    target="_blank"
                    rel="noreferrer"
                    className="maps-action-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MapPin size={12} />
                    <span>{t.openInMaps}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </motion.section>

              {/* Signature from Parents */}
              <motion.div
                className="parents-signature"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                <p className="sig-prefix">{t.signaturePrefix}</p>
                <p className="sig-family">{t.signatureFamily}</p>
              </motion.div>

              <div className="gold-divider-line" />

              {/* Scroll Cue */}
              <div className="scroll-cue-container">
                <span className="cue-label">{t.scrollExplore}</span>
                <div className="cue-arrow-bounce">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </article>
        </main>

        {/* ════════════════════════════════════════════ */}
        {/* ─── SECTION 1: INTERACTIVE STORYBOOK SPOTLIGHT ─── */}
        {/* ════════════════════════════════════════════ */}
        <section className="storybook-section">
          {/* Fairy Lights Garland Header */}
          <div className="fairy-lights-garland" aria-hidden="true">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className={`fairy-light-bulb bulb-${(i % 3) + 1}`} />
            ))}
          </div>

          <div className="storybook-header">
            <span className="storybook-eyebrow">
              <Sparkles size={12} className="inline mr-1 text-gold" />
              {t.spotlightTag}
            </span>
            <h2 className="storybook-title">{t.spotlightTitle}</h2>
            <p className="storybook-subtitle">{t.spotlightSubtitle}</p>
          </div>

          {/* Luxury Gilded Spotlight Stage */}
          <div className="spotlight-stage">
            <button
              type="button"
              className="spotlight-nav-btn prev"
              onClick={() => {
                setActiveStoryIdx((prev) => (prev - 1 + portraits.length) % portraits.length)
                triggerHeartBurst()
              }}
              aria-label="Previous Memory"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="spotlight-frame-wrapper">
              <div className="spotlight-golden-frame">
                <span className="frame-corner corner-tl" />
                <span className="frame-corner corner-tr" />
                <span className="frame-corner corner-bl" />
                <span className="frame-corner corner-br" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStory.id}
                    className="spotlight-photo-container"
                    initial={{ opacity: 0, scale: 0.94, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.04, y: -12 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  >
                    <img
                      src={activeStory.src}
                      alt={activeStory.alt}
                      className="spotlight-img"
                      draggable={false}
                    />

                    {/* Overlay badge */}
                    <div className="spotlight-badge-row">
                      <span className="milestone-pill">
                        {lang === "ta" ? activeStory.milestoneTa : activeStory.milestoneEn}
                      </span>
                      <span className="icon-pill">{activeStory.icon}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Story Description Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStory.id}
                  className="spotlight-caption-card"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="story-caption-title">
                    {lang === "ta" ? activeStory.tagTa : activeStory.tagEn}
                    <span className="story-caption-sub">
                      — {lang === "ta" ? activeStory.captionTa : activeStory.captionEn}
                    </span>
                  </h3>
                  <p className="story-caption-desc">
                    {lang === "ta" ? activeStory.descTa : activeStory.descEn}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              className="spotlight-nav-btn next"
              onClick={() => {
                setActiveStoryIdx((prev) => (prev + 1) % portraits.length)
                triggerHeartBurst()
              }}
              aria-label="Next Memory"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Interactive Story Chips / Avatars */}
          <div className="story-chips-row">
            <button
              type="button"
              className={`autoplay-toggle-btn ${isAutoPlaying ? "is-active" : ""}`}
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              title={isAutoPlaying ? t.pause : t.autoPlay}
            >
              {isAutoPlaying ? <Pause size={13} /> : <Play size={13} />}
              <span>{isAutoPlaying ? t.pause : t.autoPlay}</span>
            </button>

            <div className="chips-scroller">
              {portraits.map((item, idx) => {
                const isActive = idx === activeStoryIdx
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`story-chip-pill ${isActive ? "is-active" : ""}`}
                    onClick={() => {
                      setActiveStoryIdx(idx)
                      triggerHeartBurst()
                    }}
                  >
                    <div className="chip-avatar">
                      <img src={item.src} alt={item.alt} draggable={false} />
                    </div>
                    <span className="chip-label">
                      {lang === "ta" ? item.captionTa : item.captionEn}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════ */}
        {/* ─── SECTION 2: INTERACTIVE DRAGGABLE POLAROIDS ─── */}
        {/* ════════════════════════════════════════════ */}
        <section className="memories-showcase-section">
          <motion.div
            className="memories-header"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <span className="memories-tag">{t.momentsTag}</span>
            <h2 className="memories-title">
              {t.momentsHeading} <i>{t.momentsItalic}</i>
            </h2>
            <p className="memories-sub">{t.momentsSubtitle}</p>

            <button
              type="button"
              onClick={handleShuffle}
              className="shuffle-action-btn"
            >
              <Shuffle size={13} />
              <span>{t.shuffleBtn}</span>
            </button>
          </motion.div>

          <DraggableCardContainer key={shuffleKey} className="polaroid-stack-container">
            {/* 1. Teddy Bear -> BEST CUDDLES */}
            <DraggableCardBody className="polaroid-card polaroid-pos-1">
              <div className="polaroid-inner" onDoubleClick={handleCardLike}>
                <div className="washi-tape tape-rose" />
                <div className="polaroid-heart-pin">♥</div>
                <img
                  src={portraits[1].src}
                  alt={portraits[1].alt}
                  className="polaroid-photo"
                  draggable={false}
                />
                <span className="polaroid-milestone-stamp">
                  {lang === "ta" ? portraits[1].milestoneTa : portraits[1].milestoneEn}
                </span>
                <span className="polaroid-caption">
                  {lang === "ta" ? portraits[1].captionTa : portraits[1].captionEn}
                </span>
              </div>
            </DraggableCardBody>

            {/* 2. Cake Smash -> CAKE EVERYWHERE */}
            <DraggableCardBody className="polaroid-card polaroid-pos-2">
              <div className="polaroid-inner" onDoubleClick={handleCardLike}>
                <div className="washi-tape tape-gold" />
                <div className="polaroid-heart-pin">🎂</div>
                <img
                  src={portraits[2].src}
                  alt={portraits[2].alt}
                  className="polaroid-photo"
                  draggable={false}
                />
                <span className="polaroid-milestone-stamp">
                  {lang === "ta" ? portraits[2].milestoneTa : portraits[2].milestoneEn}
                </span>
                <span className="polaroid-caption">
                  {lang === "ta" ? portraits[2].captionTa : portraits[2].captionEn}
                </span>
              </div>
            </DraggableCardBody>

            {/* 3. Waving Dress -> HELLO, WORLD */}
            <DraggableCardBody className="polaroid-card polaroid-pos-3">
              <div className="polaroid-inner" onDoubleClick={handleCardLike}>
                <div className="washi-tape tape-cream" />
                <div className="polaroid-heart-pin">✨</div>
                <img
                  src={portraits[3].src}
                  alt={portraits[3].alt}
                  className="polaroid-photo"
                  draggable={false}
                />
                <span className="polaroid-milestone-stamp">
                  {lang === "ta" ? portraits[3].milestoneTa : portraits[3].milestoneEn}
                </span>
                <span className="polaroid-caption">
                  {lang === "ta" ? portraits[3].captionTa : portraits[3].captionEn}
                </span>
              </div>
            </DraggableCardBody>

            {/* 4. Giggling Covering Mouth -> THE SWEETEST SMILE */}
            <DraggableCardBody className="polaroid-card polaroid-pos-4">
              <div className="polaroid-inner" onDoubleClick={handleCardLike}>
                <div className="washi-tape tape-pink" />
                <div className="polaroid-heart-pin">💕</div>
                <img
                  src={portraits[4].src}
                  alt={portraits[4].alt}
                  className="polaroid-photo"
                  draggable={false}
                />
                <span className="polaroid-milestone-stamp">
                  {lang === "ta" ? portraits[4].milestoneTa : portraits[4].milestoneEn}
                </span>
                <span className="polaroid-caption">
                  {lang === "ta" ? portraits[4].captionTa : portraits[4].captionEn}
                </span>
              </div>
            </DraggableCardBody>

            {/* 5. Pink Frills -> GROWING WITH LOVE */}
            <DraggableCardBody className="polaroid-card polaroid-pos-5">
              <div className="polaroid-inner" onDoubleClick={handleCardLike}>
                <div className="washi-tape tape-rose" />
                <div className="polaroid-heart-pin">🌸</div>
                <img
                  src={portraits[5].src}
                  alt={portraits[5].alt}
                  className="polaroid-photo"
                  draggable={false}
                />
                <span className="polaroid-milestone-stamp">
                  {lang === "ta" ? portraits[5].milestoneTa : portraits[5].milestoneEn}
                </span>
                <span className="polaroid-caption">
                  {lang === "ta" ? portraits[5].captionTa : portraits[5].captionEn}
                </span>
              </div>
            </DraggableCardBody>
          </DraggableCardContainer>
        </section>

        {/* ════════════════════════════════════════════ */}
        {/* ─── FOOTER WITH LOVE FROM PARENTS ─── */}
        {/* ════════════════════════════════════════════ */}
        <footer className="invitation-footer">
          <div className="footer-golden-filigree" />
          <p className="footer-signature-text">
            {t.footerLove}{" "}
            <strong className="parent-highlight daddy">{t.footerDad}</strong>{" "}
            {t.footerAnd}{" "}
            <strong className="parent-highlight mama">{t.footerMom}</strong>{" "}
            💕
          </p>
          <p className="footer-copyright">
            Dwaraknaath &amp; Srivarsini • Celebrating Shrishtiika • Chennai 2026
          </p>
        </footer>
      </div>
    </CursorProvider>
  )
}
