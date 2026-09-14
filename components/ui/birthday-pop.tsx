"use client"

import * as React from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  shape: "circle" | "ribbon" | "star" | "heart"
  rotation: number
  rotationSpeed: number
  alpha: number
  decay: number
}

const CONFETTI_COLORS = [
  "#ffd27a", // champagne gold
  "#e8607a", // rose pink
  "#ffb6c1", // light pink
  "#f43f5e", // vibrant rose
  "#fffaf4", // cream
  "#f0a04a", // warm gold
  "#fda4af", // peach pink
  "#ffffff", // pure white sparkle
]

export function BirthdayPop({ triggerKey = 0 }: { triggerKey?: number }) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", handleResize)

    // Spawn 140 particles from top-left, center, and top-right cannons
    const particles: Particle[] = []
    const origins = [
      { x: width * 0.5, y: height * 0.4, count: 70 },
      { x: width * 0.15, y: height * 0.25, count: 35 },
      { x: width * 0.85, y: height * 0.25, count: 35 },
    ]

    origins.forEach(({ x, y, count }) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 4 + Math.random() * 9
        const shapes: Particle["shape"][] = ["circle", "ribbon", "star", "heart"]
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2.5,
          size: 7 + Math.random() * 9,
          color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 12,
          alpha: 1,
          decay: 0.007 + Math.random() * 0.008,
        })
      }
    })

    let animId: number

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.16 // gravity
        p.vx *= 0.985 // drag
        p.rotation += p.rotationSpeed
        p.alpha -= p.decay

        if (p.alpha <= 0 || p.y > height + 20) {
          particles.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.globalAlpha = Math.max(0, p.alpha)
        ctx.fillStyle = p.color

        if (p.shape === "circle") {
          ctx.beginPath()
          ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2)
          ctx.fill()
        } else if (p.shape === "ribbon") {
          ctx.fillRect(-p.size * 0.6, -p.size * 0.2, p.size * 1.2, p.size * 0.4)
        } else if (p.shape === "star") {
          // 4-point golden sparkle
          ctx.beginPath()
          for (let s = 0; s < 4; s++) {
            ctx.lineTo(0, -p.size * 0.6)
            ctx.lineTo(p.size * 0.15, -p.size * 0.15)
            ctx.rotate(Math.PI / 2)
          }
          ctx.closePath()
          ctx.fill()
        } else {
          // Heart shape
          ctx.beginPath()
          const topCurveHeight = p.size * 0.3
          ctx.moveTo(0, topCurveHeight)
          // top left curve
          ctx.bezierCurveTo(
            -p.size * 0.5,
            -topCurveHeight,
            -p.size,
            topCurveHeight,
            0,
            p.size * 0.8
          )
          // top right curve
          ctx.bezierCurveTo(
            p.size,
            topCurveHeight,
            p.size * 0.5,
            -topCurveHeight,
            0,
            topCurveHeight
          )
          ctx.fill()
        }

        ctx.restore()
      }

      if (particles.length > 0) {
        animId = requestAnimationFrame(render)
      }
    }

    animId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animId)
    }
  }, [triggerKey])

  return (
    <canvas
      ref={canvasRef}
      className="birthday-pop-canvas"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 99995,
      }}
    />
  )
}
