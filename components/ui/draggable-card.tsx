"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { cn } from "@/lib/utils"

export function DraggableCardContainer({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <div className={cn("[perspective:1800px]", className)}>{children}</div>
}

export function DraggableCardBody({ className, children }: { className?: string; children?: React.ReactNode }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-200, 200], [12, -12]), { stiffness: 180, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-200, 200], [-12, 12]), { stiffness: 180, damping: 20 })
  return (
    <motion.div
      drag
      dragConstraints={{ left: -220, right: 220, top: -180, bottom: 180 }}
      dragElastic={0.22}
      onDrag={(event, info) => { x.set(info.offset.x); y.set(info.offset.y) }}
      onDragEnd={() => { x.set(0); y.set(0) }}
      style={{ rotateX, rotateY, touchAction: "none" }}
      whileHover={{ scale: 1.04 }}
      className={cn("relative cursor-grab active:cursor-grabbing", className)}
    >{children}</motion.div>
  )
}
