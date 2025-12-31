"use client";

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { useLanguage } from "./providers"
// Unused icons removed

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black font-sans text-zinc-100 selection:bg-primary/30">
      <Navigation />

      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20 pb-12">
        <div className="absolute inset-0 z-0 bg-zinc-900">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-zinc-900/80 to-zinc-900 transition-colors duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 px-4 mx-auto text-center">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm animate-fade-in-up transition-colors duration-500">
            <span className="text-primary text-sm font-medium tracking-wide uppercase transition-colors duration-500">{t.hero.badge}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight animate-fade-in-up [animation-delay:200ms]">
            {t.hero.title_prefix} <span className="text-primary transition-colors duration-500">{t.hero.title_highlight}</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto mb-10 font-light animate-fade-in-up [animation-delay:400ms] leading-relaxed">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up [animation-delay:600ms]">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[200px] h-14 text-lg transition-colors duration-500">
              <Link href="/dashboard">{t.hero.cta_dashboard}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-zinc-700 text-white hover:bg-zinc-800 bg-black/40 backdrop-blur-sm min-w-[200px] h-14 text-lg"
            >
              <Link href="/login">{t.hero.cta_login}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 hover:border-primary/30 transition-colors group">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500">
                <span className="text-3xl">🕸️</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.features.crawling_title}</h3>
              <p className="text-zinc-400 leading-relaxed">
                {t.features.crawling_desc}
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 hover:border-primary/30 transition-colors group">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.features.ai_title}</h3>
              <p className="text-zinc-400 leading-relaxed">
                {t.features.ai_desc}
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 hover:border-primary/30 transition-colors group">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{t.features.async_title}</h3>
              <p className="text-zinc-400 leading-relaxed">
                {t.features.async_desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 sm:mb-16 gap-6">
            <div>
              <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block transition-colors duration-500">
                {t.capabilities.subtitle}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{t.capabilities.title}</h2>
            </div>
            <Button
              asChild
              variant="link"
              className="text-white hover:text-primary p-0 text-lg group hidden sm:inline-flex transition-colors duration-500"
            >
              <Link href="/dashboard">
                {t.capabilities.link_dashboard} <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto mb-6 sm:mb-8">
            <div className="relative aspect-square rounded-xl overflow-hidden group bg-zinc-800 border border-zinc-700/50 transition-colors hover:border-primary/30">
              <div className="absolute inset-0 transition-opacity duration-500 opacity-60 group-hover:opacity-80">
                <Image
                  src="/images/feature-social.png"
                  alt="Social Content Generation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity" />
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                <span className="text-primary font-semibold text-xs sm:text-sm mb-1 sm:mb-2 transition-colors duration-500">CORE FUNCTION</span>
                <p className="text-white font-bold text-xl sm:text-2xl mb-1 sm:mb-2">{t.capabilities.social_title}</p>
                <p className="text-zinc-300 text-xs sm:text-sm">{t.capabilities.social_desc}</p>
              </div>
            </div>

            <div className="relative aspect-square rounded-xl overflow-hidden group bg-zinc-800 border border-zinc-700/50 transition-colors hover:border-primary/30">
              <div className="absolute inset-0 transition-opacity duration-500 opacity-80 group-hover:opacity-100">
                <Image
                  src="/images/feature-json-vibrant.png"
                  alt="JSON Output"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-3 sm:p-4 w-full">
                  <div className="relative h-full flex flex-col justify-between">
                    <span className="text-3xl mb-auto opacity-80 drop-shadow-lg">⚙️</span>
                    <div>
                      <span className="text-primary text-xs font-semibold transition-colors duration-500">OUTPUT</span>
                      <p className="text-white font-semibold text-sm sm:text-base">{t.capabilities.json_title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative aspect-square rounded-xl overflow-hidden group bg-zinc-800 border border-zinc-700/50 transition-colors hover:border-primary/30">
              <div className="absolute inset-0 transition-opacity duration-500 opacity-80 group-hover:opacity-100">
                <Image
                  src="/images/feature-multi-url.png"
                  alt="Data Input"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-3 sm:p-4 w-full">
                  <div className="relative h-full flex flex-col justify-between">
                    <span className="text-3xl mb-auto opacity-80 drop-shadow-lg">🔗</span>
                    <div>
                      <span className="text-primary text-xs font-semibold transition-colors duration-500">INPUT</span>
                      <p className="text-white font-semibold text-sm sm:text-base">{t.capabilities.multi_url_title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative aspect-square rounded-xl overflow-hidden group bg-zinc-800 border border-zinc-700/50 transition-colors hover:border-primary/30">
              <div className="absolute inset-0 transition-opacity duration-500 opacity-80 group-hover:opacity-100">
                <Image
                  src="/images/feature-n8n-vibrant.png"
                  alt="n8n Workflow"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={100}
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-4 sm:p-6">
                  <span className="text-primary text-xs font-semibold transition-colors duration-500">AUTOMATION</span>
                  <p className="text-white font-bold text-lg sm:text-xl">{t.capabilities.n8n_title}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center sm:hidden mt-8">
            <Button asChild className="w-full bg-zinc-800 hover:bg-zinc-700 text-white h-12">
              <Link href="/dashboard">{t.capabilities.link_dashboard}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-zinc-900">
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-primary/20 transition-colors duration-500" />
        </div>

        <div className="container relative z-10 px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t.footer.ready_title}</h2>
          <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 text-lg transition-colors duration-500">
              <Link href="/dashboard">{t.hero.cta_dashboard}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-zinc-500 text-white hover:bg-zinc-800 bg-transparent h-14 px-8 text-lg"
            >
              <Link href="/login">{t.hero.cta_login}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer with Privacy Policy */}
      <footer className="py-8 bg-black border-t border-zinc-900 text-center">
        <div className="container mx-auto px-4">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} AgentRelay. All rights reserved. {" "}
            <Link href="/privacy" className="text-zinc-400 hover:text-white transition-colors underline underline-offset-4">
              Privacy Policy
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
