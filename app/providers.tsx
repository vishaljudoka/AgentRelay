"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// --- Language Context ---
type Language = "en" | "es";

type Translations = {
    hero: {
        badge: string;
        title_prefix: string;
        title_highlight: string;
        subtitle: string;
        description: string;
        cta_dashboard: string;
        cta_login: string;
    };
    features: {
        crawling_title: string;
        crawling_desc: string;
        ai_title: string;
        ai_desc: string;
        async_title: string;
        async_desc: string;
    };
    capabilities: {
        subtitle: string;
        title: string;
        link_dashboard: string;
        social_title: string;
        social_desc: string;
        json_title: string;
        multi_url_title: string;
        n8n_title: string;
    };
    footer: {
        ready_title: string;
    };
};

const dictionaries: Record<Language, Translations> = {
    en: {
        hero: {
            badge: "Async Job Processing",
            title_prefix: "Agent",
            title_highlight: "Relay",
            subtitle: "",
            description: "Enterprise-grade async job processing with secure webhook integration. Built with Next.js, TypeScript, and Supabase.",
            cta_dashboard: "Go to Dashboard",
            cta_login: "Login",
        },
        features: {
            crawling_title: "Smart Crawling",
            crawling_desc: "Provide a topic and seed URLs to automatically crawl and gather relevant content.",
            ai_title: "AI Extraction",
            ai_desc: "Generate summaries, key insights, and social media drafts using advanced AI.",
            async_title: "Async Processing",
            async_desc: "Jobs run asynchronously in the background, updating results in minutes.",
        },
        capabilities: {
            subtitle: "Capabilities",
            title: "Latest Features",
            link_dashboard: "View Dashboard",
            social_title: "Content to Social",
            social_desc: "Turn any article or topic into ready-to-post social media content instantly.",
            json_title: "JSON & Drafts",
            multi_url_title: "Multi-URL Seed",
            n8n_title: "n8n Workflow Integration",
        },
        footer: {
            ready_title: "Ready to process your jobs?",
        },
    },
    es: {
        hero: {
            badge: "Procesamiento Asíncrono",
            title_prefix: "Agent",
            title_highlight: "Relay",
            subtitle: "",
            description: "Arquitectura de procesamiento asíncrono de nivel empresarial con integración segura de webhooks.",
            cta_dashboard: "Ir al Dashboard",
            cta_login: "Iniciar Sesión",
        },
        features: {
            crawling_title: "Rastreo Inteligente",
            crawling_desc: "Proporciona un tema y URLs semilla para rastrear y recopilar contenido relevante automáticamente.",
            ai_title: "Extracción con IA",
            ai_desc: "Genera resúmenes, insights clave y borradores de redes sociales utilizando IA avanzada.",
            async_title: "Procesamiento Asíncrono",
            async_desc: "Los trabajos se ejecutan en segundo plano, actualizando los resultados en minutos.",
        },
        capabilities: {
            subtitle: "Capacidades",
            title: "Últimas Funciones",
            link_dashboard: "Ver Dashboard",
            social_title: "Contenido a Redes",
            social_desc: "Convierte cualquier artículo o tema en contenido listo para publicar al instante.",
            json_title: "JSON y Borradores",
            multi_url_title: "Semilla Multi-URL",
            n8n_title: "Integración n8n",
        },
        footer: {
            ready_title: "¿Listo para procesar tus trabajos?",
        },
    },
};

const LanguageContext = React.createContext<{
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
} | null>(null);

export function useLanguage() {
    const context = React.useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}

export function Providers({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = React.useState<Language>("en");

    return (
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
            <LanguageContext.Provider value={{ language, setLanguage, t: dictionaries[language] }}>
                {children}
            </LanguageContext.Provider>
        </NextThemesProvider>
    );
}
