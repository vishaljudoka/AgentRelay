import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Job } from "@/types";

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: job, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !job) {
        notFound();
    }

    const typedJob = job as Job;

    return (
        <div className="flex flex-col gap-8">
            <div>
                <Link
                    href="/dashboard"
                    className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
                >
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
                        className="mr-2 h-4 w-4"
                    >
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    Back to Dashboard
                </Link>
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">{typedJob.topic}</h1>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${typedJob.status === 'completed' ? 'bg-green-100 text-green-800' :
                        typedJob.status === 'failed' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                        }`}>
                        {typedJob.status.charAt(0).toUpperCase() + typedJob.status.slice(1)}
                    </span>
                </div>
                <p className="text-muted-foreground mt-2">
                    Analysis ID: {typedJob.id}
                </p>
            </div>

            {typedJob.status === "completed" && typedJob.output?.results ? (
                <div className="space-y-8">
                    {/* Summary Section */}
                    <div className="bg-card border rounded-xl p-6 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Executive Summary</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {typedJob.output.results.summary}
                        </p>
                    </div>

                    {/* Key Insights */}
                    <div className="bg-card border rounded-xl p-6 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Key Insights</h2>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            {typedJob.output.results.key_insights.map((insight, i) => (
                                <li key={i}>{insight}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Media Drafts */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {typedJob.output.results.social_posts.map((post, i) => (
                            <div key={i} className="bg-card border rounded-xl p-6 shadow-sm flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold capitalize">{post.platform}</h3>
                                    <button
                                        className="text-xs bg-secondary px-2 py-1 rounded hover:bg-secondary/80 transition"

                                    >
                                        Copy
                                    </button>
                                </div>
                                <div className="bg-muted/50 p-4 rounded-md text-sm whitespace-pre-wrap flex-1">
                                    {post.content}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sources */}
                    <div className="bg-card border rounded-xl p-6 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Sources Processed</h2>
                        <ul className="space-y-2">
                            {typedJob.output.results.sources_processed.map((source, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <span className="text-muted-foreground text-sm">•</span>
                                    <a href={source.url} target="_blank" className="text-primary hover:underline truncate">
                                        {source.title || source.url}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="rounded-xl border border-dashed p-8 text-center">
                    <p className="text-muted-foreground">
                        {typedJob.status === 'failed'
                            ? "This analysis failed. Please try again."
                            : "Analysis is currently in progress. Check back in a minute."}
                    </p>
                </div>
            )}
        </div>
    );
}
