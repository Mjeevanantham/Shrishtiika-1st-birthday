"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

/* ─── Heart SVG path ─── */
const HEART_PATH =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"

const CursorContext = React.createContext<{
  x: ReturnType<typeof useMotionValue<number>>
  y: ReturnType<typeof useMotionValue<number>>
} | null>(null)

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  React.useEffect(() => {
    const move = (event: MouseEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }
    window.addEventListener("pointermove", move, { passive: true })
    return () => window.removeEventListener("pointermove", move)
  }, [x, y])

  return (
    <CursorContext.Provider value={{ x, y }}>{children}</CursorContext.Provider>
  )
}

/* ─── Premium Heart Cursor ─── */
export function HeartCursor() {
  const context = React.useContext(CursorContext)
  if (!context) return null

  // Smooth responsive spring
  const x = useSpring(context.x, { stiffness: 800, damping: 35 })
  const y = useSpring(context.y, { stiffness: 800, damping: 35 })

  const [isPointer, setIsPointer] = React.useState(false)

  React.useEffect(() => {
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target?.closest("a") ||
        target?.closest("button") ||
        target?.getAttribute("role") === "button"
      ) {
        setIsPointer(true)
      } else {
        setIsPointer(false)
      }
    }
    window.addEventListener("mouseover", handleOver, { passive: true })
    return () => window.removeEventListener("mouseover", handleOver)
  }, [])

  return (
    <motion.div
      aria-hidden="true"
      className="heart-cursor"
      style={{ x, y }}
    >
      <div className={`heart-cursor-inner ${isPointer ? "is-hovering" : ""}`}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#e8607a"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={HEART_PATH} />
        </svg>
      </div>
    </motion.div>
  )
}

/* ─── Click-to-Like: spawns floating hearts ─── */
interface FloatingHeart {
  id: number
  x: number
  y: number
  size: number
  color: string
  rotation: number
  driftX: number
}

const HEART_COLORS = [
  "#e8607a",
  "#ff7b90",
  "#f43f5e",
  "#c9aa72",
  "#ffb6c1",
  "#fda4af",
  "#e11d48",
  "#fb7185",
]

export function ClickHearts() {
  const [hearts, setHearts] = React.useState<FloatingHeart[]>([])
  const idRef = React.useRef(0)

  const triggerHeartsAt = React.useCallback((clientX: number, clientY: number) => {
    const count = 5 + Math.floor(Math.random() * 4)
    const newBatch: FloatingHeart[] = []
    for (let i = 0; i < count; i++) {
      newBatch.push({
        id: ++idRef.current,
        x: clientX + (Math.random() - 0.5) * 36,
        y: clientY + (Math.random() - 0.5) * 20,
        size: 16 + Math.random() * 16,
        color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
        rotation: (Math.random() - 0.5) * 50,
        driftX: (Math.random() - 0.5) * 80,
      })
    }
    setHearts((prev) => [...prev, ...newBatch])
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newBatch.some((n) => n.id === h.id)))
    }, 1700)
  }, [])

  React.useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      // Don't duplicate if clicking specific interactive elements that handle their own
      triggerHeartsAt(e.clientX, e.clientY)
    }
    window.addEventListener("pointerdown", handlePointerDown, { passive: true })
    return () => window.removeEventListener("pointerdown", handlePointerDown)
  }, [triggerHeartsAt])

  return (
    <div className="click-hearts-layer" aria-hidden="true">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            "--heart-size": `${heart.size}px`,
            "--heart-rotation": `${heart.rotation}deg`,
            "--drift-x": `${heart.driftX}px`,
          } as React.CSSProperties}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill={heart.color}
          >
            <path d={HEART_PATH} />
          </svg>
        </div>
      ))}
    </div>
  )
}
