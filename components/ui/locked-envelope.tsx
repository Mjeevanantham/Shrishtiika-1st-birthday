"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Sparkles } from "lucide-react"

interface LockedEnvelopeProps {
  lang: "en" | "ta"
  onOpen: () => void
}

export function LockedEnvelope({ lang, onOpen }: LockedEnvelopeProps) {
  const [isOpening, setIsOpening] = React.useState(false)

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isOpening) return
    setIsOpening(true)
    setTimeout(() => {
      onOpen()
    }, 1000)
  }

  const isTa = lang === "ta"

  return (
    <div
      className="locked-envelope-backdrop"
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      aria-label={isTa ? "அழைப்பிதழை திறக்க தொடவும்" : "Tap to open the invitation"}
    >
      <div className="envelope-ambient-glow" />

      {/* Floating Sparkles around Envelope */}
      <div className="envelope-sparkles" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="env-sparkle"
            style={{
              "--x": `${(i * 7.5) % 100}%`,
              "--y": `${10 + ((i * 19) % 80)}%`,
              "--delay": `${(i * 0.25) % 3}s`,
            } as React.CSSProperties}
          >
            ✦
          </span>
        ))}
      </div>

      <motion.div
        className={`royal-envelope-box ${isOpening ? "is-unfolding" : ""}`}
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* The Envelope Pocket Background */}
        <div className="envelope-pocket">
          {/* Gold Decorative Corner Borders */}
          <div className="envelope-gold-border" />

          {/* Letter Inside that slides up on opening */}
          <motion.div
            className="envelope-sliding-letter"
            animate={isOpening ? { y: -140, opacity: 1 } : { y: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sliding-letter-card">
              <span className="sliding-letter-tag">
                {isTa ? "முதல் பிறந்தநாள் விழா" : "1ST BIRTHDAY CELEBRATION"}
              </span>
              <h3 className="sliding-letter-name">
                {isTa ? "ஸ்ரிஷ்டிகா" : "Shrishtiika"}
              </h3>
              <p className="sliding-letter-sub">
                {isTa ? "த்வர்கநாத்" : "Dwaraknaath"}
              </p>
            </div>
          </motion.div>

          {/* Envelope Body Content (Crisp, High-Contrast Gold Foil Typography) */}
          <div className="envelope-plaque">
            <div className="envelope-crest-row">
              <Sparkles size={12} className="text-gold inline mr-1.5" />
              <span>{isTa ? "அரச அழைப்பிதழ்" : "ROYAL INVITATION"}</span>
              <Sparkles size={12} className="text-gold inline ml-1.5" />
            </div>

            <p className="envelope-honor-text">
              {isTa
                ? "எங்கள் அன்பான குடும்பத்தினருக்கும் நண்பர்களுக்கும்"
                : "To Our Beloved Family & Friends"}
            </p>

            <div className="envelope-divider-ornament">
              <span className="divider-line" />
              <span className="divider-gem">◆</span>
              <span className="divider-line" />
            </div>

            <h2 className="envelope-celebrant-name">
              {isTa ? "ஸ்ரிஷ்டிகாவின் 1வது பிறந்தநாள்" : "Shrishtiika's 1st Birthday"}
            </h2>

            <p className="envelope-occasion-tag">
              {isTa ? "மகிழ்ச்சியான முதல் ஆண்டு கொண்டாட்டம்" : "One Little Year of Magic & Love"}
            </p>

            <div className="envelope-meta-pill">
              <span>{isTa ? "26 செப்டம்பர் 2026" : "Saturday, 26th September 2026"}</span>
              <span className="meta-bullet">•</span>
              <span>{isTa ? "சென்னை" : "Chennai"}</span>
            </div>
          </div>

          {/* Top Flap with 3D Fold */}
          <div className="envelope-tri-flap" />

          {/* Wax Seal placed centrally over the flap joint */}
          <motion.div
            className={`royal-wax-seal ${isOpening ? "is-broken" : ""}`}
            animate={
              isOpening
                ? { scale: 1.3, opacity: 0, rotate: 20 }
                : { scale: [1, 1.05, 1] }
            }
            transition={
              isOpening
                ? { duration: 0.35 }
                : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
            }
            onClick={handleOpen}
          >
            <div className="wax-seal-glow" />
            <svg
              className="wax-seal-svg"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Organic Melted Wax Edge */}
              <path
                d="M50 3C59 3 62 8 69 10C76 12 81 9 87 15C93 21 90 26 92 33C94 40 99 43 99 51C99 59 94 62 92 69C90 76 93 81 87 87C81 93 76 90 69 92C62 94 59 99 51 99C43 99 40 94 33 92C26 90 21 93 15 87C9 81 12 76 10 69C8 62 3 59 3 51C3 43 8 40 10 33C12 26 9 21 15 15C21 9 26 12 33 10C40 8 43 3 50 3Z"
                fill="url(#waxGradLuxury)"
              />
              {/* Embossed Concentric Rings */}
              <circle cx="51" cy="51" r="37" stroke="#ffe4a0" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.75" />
              <circle cx="51" cy="51" r="33" stroke="#6b151d" strokeWidth="1.5" />
              <circle cx="51" cy="51" r="31" fill="#841e27" />

              {/* Royal Crown */}
              <path
                d="M39 43L44 49L51 36L58 49L63 43L61 53H41L39 43Z"
                fill="#ffd27a"
              />
              <circle cx="39" cy="41" r="1.5" fill="#ffe4a0" />
              <circle cx="51" cy="34" r="2" fill="#ffe4a0" />
              <circle cx="63" cy="41" r="1.5" fill="#ffe4a0" />

              {/* Letter S Monogram */}
              <text
                x="51"
                y="70"
                fontFamily="'Playfair Display', Georgia, serif"
                fontSize="20"
                fontWeight="700"
                fill="#ffd27a"
                textAnchor="middle"
              >
                S
              </text>

              <defs>
                <radialGradient id="waxGradLuxury" cx="38%" cy="32%" r="68%">
                  <stop offset="0%" stopColor="#d13848" />
                  <stop offset="40%" stopColor="#aa202e" />
                  <stop offset="80%" stopColor="#691119" />
                  <stop offset="100%" stopColor="#3d070c" />
                </radialGradient>
              </defs>
            </svg>
          </motion.div>
        </div>

        {/* Pulsing Action Prompt Below Envelope */}
        <div className="unseal-action-prompt">
          <span className="unseal-pill">
            <Sparkles size={13} className="text-gold inline mr-1.5" />
            {isTa ? "முத்திரையை உடைத்து திறக்க தொடவும் ✉️" : "Tap seal to open invitation ✉️"}
          </span>
        </div>
      </motion.div>
    </div>
  )
}
