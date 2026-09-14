"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

const CursorContext = React.createContext<{ x: ReturnType<typeof useMotionValue<number>>; y: ReturnType<typeof useMotionValue<number>> } | null>(null)

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  React.useEffect(() => { const move = (event: MouseEvent) => { x.set(event.clientX); y.set(event.clientY) }; window.addEventListener("pointermove", move); return () => window.removeEventListener("pointermove", move) }, [x, y])
  return <CursorContext.Provider value={{ x, y }}>{children}</CursorContext.Provider>
}

export function Cursor() {
  const context = React.useContext(CursorContext)
  if (!context) return null
  const x = useSpring(context.x, { stiffness: 500, damping: 30 })
  const y = useSpring(context.y, { stiffness: 500, damping: 30 })
  return <motion.div aria-hidden="true" className="custom-cursor" style={{ x, y }} />
}

export function CursorFollow({ children }: { children: React.ReactNode }) {
  const context = React.useContext(CursorContext)
  if (!context) return null
  const x = useSpring(context.x, { stiffness: 220, damping: 25 })
  const y = useSpring(context.y, { stiffness: 220, damping: 25 })
  return <motion.div aria-hidden="true" className="cursor-follow" style={{ x, y }}>{children}</motion.div>
}
