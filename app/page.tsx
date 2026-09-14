"use client"

import * as React from "react"
import { ArrowDown, MapPin } from "lucide-react"
import { motion, useScroll, useTransform } from "motion/react"
import { Cursor, CursorFollow, CursorProvider } from "@/components/ui/cursor"
import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card"
import { FireworksBackground } from "@/components/ui/fireworks"
import { RadialIntro } from "@/components/animate-ui/components/community/radial-intro"

const portraits = [
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Joyful%20Baby%20Girl%20in%20Floral%20Tulle%20Dress-bOHV5mIIJy70rElIXHefU0aUkq1Jzh.png", alt: "Shrishtiika in a floral dress" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Smiling%20Baby%20Cuddling%20a%20Teddy%20Bear-04te7UnbPa1sSucEkeYB5qCP3Stv6j.png", alt: "Shrishtiika cuddling a teddy bear" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Joyful%20Pink%20Frosting%20Cake%20Smash-qNDdAcN7BSpGLVS9doyuJEgAUdJdHK.png", alt: "Shrishtiika enjoying birthday cake" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Joyful%20Baby%20Girl%20Waving%20in%20Lace%20Dress-pk4BKGWg9C4gVoU3hMkMxf1hlc3XQ7.png", alt: "Shrishtiika waving" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Giggling%20Baby%20in%20Pink%20Tulle%20Dress-UurT4VBbfBa7pePuOHyydmWe3fY6uC.png", alt: "Shrishtiika giggling" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Adorable%20Baby%20in%20Pink%20Frills-lcA6rrKOnuzSIvVxiiEBz0JcJQ5M48.png", alt: "Shrishtiika smiling" },
]

export default function Page() {
  const [open, setOpen] = React.useState(false)
  const { scrollYProgress } = useScroll()
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const babyY = useTransform(scrollYProgress, [0, 1], [0, 180])
  const orbitItems = portraits.slice(1).map((image, index) => ({ id: index + 1, name: image.alt, src: image.src }))

  return (
    <CursorProvider>
      <Cursor />
      <CursorFollow>move me</CursorFollow>
      <main className="invitation" onClick={() => setOpen(true)}>
        <motion.article style={{ y: cardY }} className={`invitation-card ${open ? "opened" : ""}`}>
          <FireworksBackground className="fireworks" population={8} />
          <div className="card-inner">
            <p className="eyebrow">you are warmly invited</p>
            <div className="portrait-orbit" aria-label="Shrishtiika's birthday portraits">
              <div className="orbit-line" />
              <motion.img style={{ y: babyY }} className="main-portrait" src={portraits[0].src} alt={portraits[0].alt} priority="false" />
              <RadialIntro orbitItems={orbitItems} stageSize={288} imageSize={54} />
            </div>
            <p className="occasion">FIRST BIRTHDAY CELEBRATION</p>
            <h1>Shrishtiika</h1>
            <p className="intro">One little year of love,<br />laughter and magic.</p>
            <div className="details">
              <div><span>DATE &amp; TIME</span><strong>Saturday, 26th September 2026</strong><p>6:00 PM – 8:00 PM</p></div>
              <div><span>VENUE</span><strong>Zaitoon Velachery</strong><p>362, Velachery – Tambaram Main Road<br />opposite Adayar Ananda Bhavan, Velachery<br />Chennai 600042</p><a href="https://www.google.com/maps/search/?api=1&query=Zaitoon+Velachery+Chennai" target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}><MapPin size={13} /> Open in Maps ↗</a></div>
            </div>
            <p className="signature">With love,<br /><b>Dwaraknaath, Srivarsini and Shrishtiika</b></p>
            <div className="scroll-cue"><span>{open ? "scroll to explore" : "tap to open"}</span><ArrowDown size={14} /></div>
          </div>
        </motion.article>
        <section className="parallax-memories" aria-label="Shrishtiika's first year">
          <div className="section-copy"><span>little moments</span><h2>A year<br /><i>in bloom.</i></h2><p>Drag a memory and keep<br />a little piece of today.</p></div>
          <DraggableCardContainer className="memory-stack">
            {portraits.slice(1, 5).map((image, index) => <DraggableCardBody key={image.src} className={`memory memory-${index + 1}`}><img src={image.src} alt={image.alt} /><small>{["the first smile", "best cuddles", "cake everywhere", "hello, world"][index]}</small></DraggableCardBody>)}
          </DraggableCardContainer>
        </section>
      </main>
    </CursorProvider>
  )
}
