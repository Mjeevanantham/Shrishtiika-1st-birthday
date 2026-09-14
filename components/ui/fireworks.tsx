"use client"

import * as React from "react"

export function FireworksBackground({ className = "", color = "#e5a36f", population = 6 }: { className?: string; color?: string; population?: number }) {
  return <div className={`fireworks-layer ${className}`} aria-hidden="true">{Array.from({ length: population }).map((_, index) => <i key={index} style={{ "--i": index, "--color": color } as React.CSSProperties} />)}</div>
}
