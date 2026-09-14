import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.shrishtiika.site'),
  title: "Shrishtiika Dwaraknaath's 1st Birthday Invitation",
  description:
    'Saturday, 26th September 2026 · 6:00 PM – 8:00 PM · Zaitoon Velachery, Chennai',
  alternates: {
    canonical: 'https://www.shrishtiika.site',
  },
  openGraph: {
    title: "Shrishtiika Dwaraknaath's 1st Birthday Invitation",
    description:
      'Saturday, 26th September 2026 · 6:00 PM – 8:00 PM · Zaitoon Velachery, Chennai',
    url: 'https://www.shrishtiika.site',
    siteName: "Shrishtiika's 1st Birthday",
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        secureUrl: 'https://www.shrishtiika.site/og-image.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: "Shrishtiika Dwaraknaath's 1st Birthday Celebration Invitation",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Shrishtiika Dwaraknaath's 1st Birthday Invitation",
    description:
      'Saturday, 26th September 2026 · 6:00 PM – 8:00 PM · Zaitoon Velachery, Chennai',
    images: ['https://www.shrishtiika.site/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/baby-princess.png', type: 'image/png' },
    ],
    apple: '/baby-princess.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#fffaf4',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
