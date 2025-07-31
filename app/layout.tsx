import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "EduMind AI - Team-Based Learning Platform",
  description: "AI-powered collaborative learning platform for team discussions",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}