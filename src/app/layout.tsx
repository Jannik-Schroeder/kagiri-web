import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {Toaster} from "react-hot-toast";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-white h-full">
      <body className={inter.className}>
      <Toaster position={"top-right"} toastOptions={{style: {background: "#000", color: "#fff"}}} />
      {children}
      </body>
    </html>
  )
}
