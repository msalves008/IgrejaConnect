import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'IgrejaConnect',
  description: 'Sistema de gerenciamento para igrejas',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
