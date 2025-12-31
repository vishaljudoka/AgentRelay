import Link from "next/link";
import { signOut } from "@/app/auth/actions";

export function DashboardHeader({ email }: { email: string }) {
    return (
        <header className="sticky top-0 z-30 flex h-20 items-center gap-4 border-b border-zinc-800 bg-zinc-900/95 px-6 shadow-lg backdrop-blur-sm">
            <nav className="flex flex-1 items-center gap-8 text-sm font-medium">
                <Link href="/dashboard" className="flex items-center gap-2 text-xl font-bold md:text-2xl transition-all hover:scale-105">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600/20 text-orange-500 shadow-sm ring-1 ring-orange-600/20">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                        >
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                    </div>
                    <span className="hidden md:block text-white">Agent<span className="text-orange-500">Relay</span></span>
                </Link>
                <Link href="/dashboard" className="text-zinc-300 transition-colors hover:text-white hover:bg-zinc-800 px-3 py-2 rounded-md">
                    Overview
                </Link>
                <Link href="/dashboard/settings" className="text-zinc-400 transition-colors hover:text-white hover:bg-zinc-800 px-3 py-2 rounded-md">
                    Settings
                </Link>
            </nav>
            <div className="flex items-center gap-4">
                <span className="hidden text-sm text-zinc-400 sm:inline-block font-mono bg-zinc-800/50 px-3 py-1 rounded-full border border-zinc-700">
                    {email}
                </span>
                <form action={signOut}>
                    <button
                        type="submit"
                        className="rounded-full bg-orange-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 hover:shadow-orange-600/40 active:scale-95"
                    >
                        Logout
                    </button>
                </form>
            </div>
        </header>
    );
}
