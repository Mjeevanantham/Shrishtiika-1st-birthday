"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { cn } from "@/lib/utils"

export function DraggableCardContainer({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return <div className={cn("[perspective:1800px]", className)}>{children}</div>
}

export function DraggableCardBody({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-200, 200], [10, -10]), {
    stiffness: 220,
    damping: 24,
  })
  const rotateY = useSpring(useTransform(x, [-200, 200], [-10, 10]), {
    stiffness: 220,
    damping: 24,
  })

  // Detect touch device to avoid blocking page scroll on mobile
  const [isTouchDevice, setIsTouchDevice] = React.useState(false)

  React.useEffect(() => {
    setIsTouchDevice(
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth <= 768
    )
  }, [])

  return (
    <motion.div
      drag={!isTouchDevice}
      dragConstraints={{ left: -260, right: 260, top: -200, bottom: 200 }}
      dragElastic={0.25}
      onDrag={(_event, info) => {
        x.set(info.offset.x)
        y.set(info.offset.y)
      }}
      onDragEnd={() => {
        x.set(0)
        y.set(0)
      }}
      style={{
        rotateX: isTouchDevice ? 0 : rotateX,
        rotateY: isTouchDevice ? 0 : rotateY,
        touchAction: isTouchDevice ? "pan-y" : "none",
      }}
      whileHover={!isTouchDevice ? { scale: 1.05 } : undefined}
      whileTap={!isTouchDevice ? { scale: 1.08 } : undefined}
      className={cn(
        "relative select-none",
        !isTouchDevice && "cursor-grab active:cursor-grabbing",
        className
      )}
    >
      {children}
    </motion.div>
  )
}
