"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Database, Brain, Share2 } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black font-sans text-zinc-100 selection:bg-orange-500/30">
            <Navigation />

            <main className="pt-32 pb-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in-up">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            From Chaos to <span className="text-orange-500">Clarity</span>
                        </h1>
                        <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
                            AgentRelay isn&apos;t just a job processor. It&apos;s an enterprise-grade architecture for secure async processing with webhook integration.
                        </p>
                    </div>

                    <div className="grid gap-12 max-w-5xl mx-auto relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/0 via-orange-500/50 to-orange-500/0 transform -translate-x-1/2" />

                        {/* Step 1 */}
                        <div className="relative md:grid md:grid-cols-2 gap-8 items-center group">
                            <div className="md:text-right md:pr-12 mb-8 md:mb-0">
                                <div className="inline-block p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 mb-4 group-hover:bg-zinc-800 transition-colors">
                                    <Database className="w-8 h-8 text-orange-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">1. Input & Collect</h3>
                                <p className="text-zinc-400">
                                    Submit a job via authenticated API. Data is validated and securely stored in Supabase with Row Level Security.
                                </p>
                            </div>
                            <div className="hidden md:flex justify-start pl-12">
                                <div className="h-4 w-4 rounded-full bg-zinc-900 border-2 border-orange-500 absolute left-1/2 -translate-x-1/2 z-10 group-hover:bg-orange-500 transition-colors" />
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative md:grid md:grid-cols-2 gap-8 items-center group">
                            <div className="hidden md:flex justify-end pr-12">
                                <div className="h-4 w-4 rounded-full bg-zinc-900 border-2 border-orange-500 absolute left-1/2 -translate-x-1/2 z-10 group-hover:bg-orange-500 transition-colors" />
                            </div>
                            <div className="md:pl-12">
                                <div className="inline-block p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 mb-4 group-hover:bg-zinc-800 transition-colors">
                                    <Brain className="w-8 h-8 text-orange-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">2. Analyze & Synthesize</h3>
                                <p className="text-zinc-400">
                                    External webhook services process jobs asynchronously, ensuring scalability and reliability for demanding workloads.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative md:grid md:grid-cols-2 gap-8 items-center group">
                            <div className="md:text-right md:pr-12 mb-8 md:mb-0">
                                <div className="inline-block p-4 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 mb-4 group-hover:bg-zinc-800 transition-colors">
                                    <Share2 className="w-8 h-8 text-orange-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">3. Create & Publish</h3>
                                <p className="text-zinc-400">
                                    Real-time status updates via Supabase Realtime. Secure webhook validation ensures only authorized updates are processed.
                                </p>
                            </div>
                            <div className="hidden md:flex justify-start pl-12">
                                <div className="h-4 w-4 rounded-full bg-zinc-900 border-2 border-orange-500 absolute left-1/2 -translate-x-1/2 z-10 group-hover:bg-orange-500 transition-colors" />
                            </div>
                        </div>

                    </div>

                    <div className="text-center mt-20">
                        <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-8 h-14 text-lg shadow-lg shadow-orange-900/20">
                            <Link href="/login">
                                Start Building <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    )
}
