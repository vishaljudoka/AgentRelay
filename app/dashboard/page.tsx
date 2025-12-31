import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { NewAnalysisForm } from "@/components/dashboard/new-analysis-form";
import { JobList } from "@/components/dashboard/job-list";
import { Job } from "@/types";

export default async function DashboardPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: jobs } = await supabase
        .from("jobs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    return (
        <div className="flex flex-col gap-8 min-h-[calc(100vh-5rem)] bg-zinc-950 p-6 md:p-8 animate-in fade-in-50">
            {/* Hero / Header Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 p-8 shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 rounded-full bg-orange-950/30 border border-orange-500/20 px-3 py-1 text-xs font-medium text-orange-400">
                            <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                            Viral Analysis Engine Active
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                            Viral <span className="text-orange-500">Analysis</span>
                        </h2>
                        <p className="text-zinc-400 max-w-lg text-lg">
                            Manage your channel analyses and view AI-powered insights.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_350px] xl:grid-cols-[1fr_400px]">
                {/* Main Content Area */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                            Recent <span className="text-orange-500">Digests</span>
                        </h3>
                    </div>
                    <JobList jobs={(jobs as Job[]) || []} />
                </div>

                {/* Sidebar / Form Area */}
                <div className="space-y-6">
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-1 shadow-xl backdrop-blur-sm sticky top-24">
                        <div className="p-5 border-b border-zinc-800">
                            <h3 className="font-semibold text-white">New Analysis</h3>
                            <p className="text-sm text-zinc-400">Start a new content digest</p>
                        </div>
                        <div className="p-5">
                            <NewAnalysisForm userId={user.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
