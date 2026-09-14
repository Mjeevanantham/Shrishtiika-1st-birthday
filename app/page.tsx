"use client"

import * as React from "react"
import { MapPin, Heart, Sparkles } from "lucide-react"
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react"
import { CursorProvider, HeartCursor, ClickHearts } from "@/components/ui/cursor"
import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card"

/* ─── Baby portrait URLs ─── */
const portraits = [
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Joyful%20Baby%20Girl%20in%20Floral%20Tulle%20Dress-bOHV5mIIJy70rElIXHefU0aUkq1Jzh.png", alt: "Shrishtiika in a floral dress" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Smiling%20Baby%20Cuddling%20a%20Teddy%20Bear-04te7UnbPa1sSucEkeYB5qCP3Stv6j.png", alt: "Shrishtiika cuddling a teddy bear" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Joyful%20Pink%20Frosting%20Cake%20Smash-qNDdAcN7BSpGLVS9doyuJEgAUdJdHK.png", alt: "Shrishtiika enjoying birthday cake" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Joyful%20Baby%20Girl%20Waving%20in%20Lace%20Dress-pk4BKGWg9C4gVoU3hMkMxf1hlc3XQ7.png", alt: "Shrishtiika waving" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Giggling%20Baby%20in%20Pink%20Tulle%20Dress-UurT4VBbfBa7pePuOHyydmWe3fY6uC.png", alt: "Shrishtiika giggling" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Adorable%20Baby%20in%20Pink%20Frills-lcA6rrKOnuzSIvVxiiEBz0JcJQ5M48.png", alt: "Shrishtiika smiling" },
]

/* ─── Language Content ─── */
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
    momentsTag: "little moments",
    momentsHeading: "A year",
    momentsItalic: "in bloom.",
    momentsSubtitle: "Drag memories of Shrishtiika's first 365 magical days.",
    captions: ["the first smile", "best cuddles", "cake everywhere", "hello, world"],
    footerLove: "built with love by",
    footerDad: "daddy cool (Dwaraknaath)",
    footerAnd: "and",
    footerMom: "cool mama (Srivarsini)",
    sendLove: "Send Love",
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
    momentsTag: "இனிய நினைவுகள்",
    momentsHeading: "ஒரு மலர்ந்த",
    momentsItalic: "ஆண்டு.",
    momentsSubtitle: "ஸ்ரிஷ்டிகாவின் 365 நாள் அழகிய நினைவுகள்.",
    captions: ["முதல் புன்னகை", "அன்புக் கட்டிப்பிடி", "கேக் கொண்டாட்டம்", "வணக்கம் உலகம்"],
    footerLove: "அன்புடன் உருவாக்கியவர்கள்",
    footerDad: "டாடி கூல் (த்வர்கநாத்)",
    footerAnd: "மற்றும்",
    footerMom: "கூல் மாமா (ஸ்ரீவர்சினி)",
    sendLove: "அன்பை அனுப்புங்கள்",
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

/* ─── Floating Ambient Particles ─── */
function FloatingParticles() {
  return (
    <div className="floating-particles" aria-hidden="true">
      {Array.from({ length: 24 }).map((_, i) => (
        <span
          key={i}
          className="particle"
          style={{
            "--delay": `${(i * 0.4) % 7}s`,
            "--duration": `${7 + (i % 5) * 1.5}s`,
            "--x-start": `${(i * 4.2) % 100}%`,
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

/* ─── Horizontal Scroll Loader with Cinematic Video Entrance ─── */
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
        {/* Cake with glowing ring */}
        <motion.div
          className="loader-cake-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="loader-glow-aura" />
          <BirthdayCakeSVG className="loader-cake-svg" />
        </motion.div>

        {/* Milestone Carousel horizontally gliding */}
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

        {/* Horizontal Progress Bar */}
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

/* ─── Main Page Component ─── */
export default function Page() {
  const [hasEntered, setHasEntered] = React.useState(false)
  const [lang, setLang] = React.useState<"en" | "ta">("en")
  const [loveCount, setLoveCount] = React.useState(128)
  const [isLovePulsing, setIsLovePulsing] = React.useState(false)

  const t = content[lang]

  const { scrollYProgress } = useScroll()
  const heroParallax = useTransform(scrollYProgress, [0, 0.35], [0, -70])
  const cakeParallax = useTransform(scrollYProgress, [0, 0.35], [0, 50])
  const bgParallax = useTransform(scrollYProgress, [0, 1], [0, 180])

  const handleSendLove = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLoveCount((c) => c + 1)
    setIsLovePulsing(true)
    setTimeout(() => setIsLovePulsing(false), 300)

    // Trigger floating hearts event
    const event = new PointerEvent("pointerdown", {
      clientX: e.clientX || window.innerWidth / 2,
      clientY: e.clientY || window.innerHeight - 80,
      bubbles: true,
    })
    window.dispatchEvent(event)
  }

  return (
    <CursorProvider>
      <HeartCursor />
      <ClickHearts />

      {/* Cinematic Horizontal Loader Overlay */}
      <AnimatePresence>
        {!hasEntered && (
          <HorizontalScrollLoader
            key="cinema-loader"
            onComplete={() => setHasEntered(true)}
          />
        )}
      </AnimatePresence>

      <div
        className={`invitation-page ${lang === "ta" ? "font-tamil-active" : ""}`}
      >
          {/* Ambient Background with User's Uploaded Birthday Photo */}
          <motion.div
            className="ambient-bg-layer"
            style={{ y: bgParallax }}
            aria-hidden="true"
          >
            <img src="/birthday-bg.jpg" alt="Birthday backdrop" />
            <div className="ambient-gradient-overlay" />
          </motion.div>

          {/* Floating Romantic Particles */}
          <FloatingParticles />

          {/* Floating Love Button */}
          <motion.button
            className={`send-love-pill ${isLovePulsing ? "is-pulsing" : ""}`}
            onClick={handleSendLove}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 400 }}
            aria-label="Send love"
          >
            <Heart className="send-love-icon" size={16} fill="#e8607a" />
            <span>{t.sendLove}</span>
            <span className="love-badge">{loveCount}</span>
          </motion.button>

          {/* ════════════════════════════════════════════ */}
          {/* ─── INVITATION POSTER CARD ─── */}
          {/* ════════════════════════════════════════════ */}
          <main className="invite-stage">
            <article className="invite-card">
              {/* Outer Golden Border Frame */}
              <span className="card-ornament-frame" aria-hidden="true" />

              <div className="card-content">
                {/* Top Nav: Eyebrow + Language Switcher */}
                <div className="card-top-nav">
                  <span className="invite-eyebrow">
                    <Sparkles size={11} className="inline mr-1" />
                    {t.eyebrow}
                  </span>

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

                {/* Hero Centerpiece: Birthday Cake with Parallax */}
                <motion.div
                  className="cake-stage"
                  style={{ y: cakeParallax }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9, delay: 0.2 }}
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

                {/* Golden Line Divider */}
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
          {/* ─── BABY PORTRAIT ORBIT SHOWCASE ─── */}
          {/* ════════════════════════════════════════════ */}
          <section className="orbit-showcase-section">
            <motion.div
              className="orbit-container"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              <div className="orbit-glow-ring" />
              <div className="orbit-track-ring" />

              {/* Main Baby Portrait */}
              <div className="orbit-center-portrait">
                <img
                  src={portraits[0].src}
                  alt={portraits[0].alt}
                  className="center-baby-img"
                />
              </div>

              {/* Orbiting Satellite Photos */}
              <div className="orbit-satellites">
                {portraits.slice(1).map((item, idx) => (
                  <div
                    key={item.src}
                    className="satellite-arm"
                    style={{
                      "--rot": `${idx * 72}deg`,
                      "--delay": `${idx * 0.15}s`,
                    } as React.CSSProperties}
                  >
                    <motion.div
                      className="satellite-photo-wrap"
                      whileHover={{ scale: 1.18 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="satellite-img"
                      />
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* ════════════════════════════════════════════ */}
          {/* ─── INTERACTIVE MEMORIES (Draggable Polaroids) ─── */}
          {/* ════════════════════════════════════════════ */}
          <section className="memories-showcase-section">
            <motion.div
              className="memories-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <span className="memories-tag">{t.momentsTag}</span>
              <h2 className="memories-title">
                {t.momentsHeading} <i>{t.momentsItalic}</i>
              </h2>
              <p className="memories-sub">{t.momentsSubtitle}</p>
            </motion.div>

            <DraggableCardContainer className="polaroid-stack-container">
              {portraits.slice(1, 5).map((img, i) => (
                <DraggableCardBody
                  key={img.src}
                  className={`polaroid-card polaroid-pos-${i + 1}`}
                >
                  <div className="polaroid-inner">
                    <div className="polaroid-pin" />
                    <img src={img.src} alt={img.alt} className="polaroid-photo" />
                    <span className="polaroid-caption">{t.captions[i]}</span>
                  </div>
                </DraggableCardBody>
              ))}
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
              Celebrating Shrishtiika • Chennai 2026
            </p>
          </footer>
      </div>
    </CursorProvider>
  )
}
