"use client";

import * as React from "react";
import { Moon, Sun, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "../app/providers";
import { cn } from "@/lib/utils";

const colors = [
    { name: "gold", value: "#fbbf24" },
    { name: "blue", value: "#06b6d4" },
    { name: "green", value: "#22c55e" },
    { name: "red", value: "#ef4444" },
];

export function ThemeLanguageBar({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme();
    const { language, setLanguage } = useLanguage();
    const [mounted, setMounted] = React.useState(false);
    const [activeColor, setActiveColor] = React.useState("gold"); // Default theme color

    React.useEffect(() => {
        setMounted(true);
        // Initialize theme color on mount
        const currentTheme = document.documentElement.getAttribute("data-theme");
        if (!currentTheme) {
            document.documentElement.setAttribute("data-theme", "gold");
        } else {
            setActiveColor(currentTheme);
        }
    }, []);

    const handleColorChange = (color: string) => {
        setActiveColor(color);
        document.documentElement.setAttribute("data-theme", color);
    };

    if (!mounted) return null;

    return (
        <div className={cn("flex items-center gap-3", className)}>
            {/* Language Switcher */}
            <button
                onClick={() => setLanguage(language === "en" ? "es" : "en")}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-white hover:border-white/20 transition-all text-sm font-medium"
            >
                <Globe size={16} />
                <span className="uppercase">{language}</span>
            </button>

            {/* Theme & Color Toggle Pill */}
            <div className="flex items-center p-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 gap-3">
                {/* Dark/Light Toggle */}
                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    aria-label="Toggle Theme"
                >
                    {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
                </button>

                <div className="w-[1px] h-4 bg-white/10" />

                {/* Color Palette */}
                <div className="flex items-center gap-2 pr-1">
                    {colors.map((color) => (
                        <button
                            key={color.name}
                            onClick={() => handleColorChange(color.name)}
                            className={cn(
                                "w-4 h-4 rounded-full transition-all duration-300",
                                activeColor === color.name ? "scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-900" : "hover:scale-110 opacity-70 hover:opacity-100"
                            )}
                            style={{ backgroundColor: color.value }}
                            aria-label={`Set theme to ${color.name}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
