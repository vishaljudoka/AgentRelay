"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ThemeLanguageBar } from "./ThemeLanguageBar"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-zinc-900/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-orange-500">⚡</span> AgentRelay
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-zinc-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/dashboard" className="text-zinc-300 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/about" className="text-zinc-300 hover:text-white transition-colors">
              About
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <ThemeLanguageBar />
            </div>

            <Button asChild className="hidden sm:inline-flex bg-orange-600 hover:bg-orange-700 text-white border-0">
              <Link href="/login">Get Started</Link>
            </Button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden" onClick={closeMobileMenu} />
      )}

      <div
        className={`fixed top-20 right-0 bottom-0 w-64 bg-zinc-900 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col p-6 gap-6">
          <Link
            href="/"
            className="text-zinc-300 hover:text-white transition-colors text-lg"
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-zinc-300 hover:text-white transition-colors text-lg"
            onClick={closeMobileMenu}
          >
            Dashboard
          </Link>
          <Link
            href="/about"
            className="text-zinc-300 hover:text-white transition-colors text-lg"
            onClick={closeMobileMenu}
          >
            About
          </Link>

          <div className="border-t border-zinc-700 pt-6 flex flex-col gap-6">
            <ThemeLanguageBar className="justify-center" />
            <Button asChild className="w-full bg-orange-600 hover:bg-orange-700 text-white">
              <Link href="/login" onClick={closeMobileMenu}>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
