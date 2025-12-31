import { Job } from "@/types";
import Link from "next/link";
import { Trash2, ExternalLink, ArrowRight } from "lucide-react";

interface JobCardProps {
    job: Job;
    onDelete: (id: string) => void;
}

export function JobCard({ job, onDelete }: JobCardProps) {
    const isCompleted = job.status === "completed";
    const isFailed = job.status === "failed";

    return (
        <div className="group h-[220px] md:h-[200px] w-full [perspective:1000px]">
            <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] md:group-hover:[transform:rotateY(180deg)]">

                {/* Front Face */}
                <div className="absolute inset-0 h-full w-full rounded-xl border border-zinc-800 bg-zinc-900/90 p-5 md:p-6 shadow-xl [backface-visibility:hidden] flex flex-col justify-between">
                    <div className="space-y-4">
                        <div className="flex items-start justify-between">
                            <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${isCompleted
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                    : isFailed
                                        ? "bg-red-500/10 text-red-400 border-red-500/20"
                                        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                    }`}
                            >
                                {isCompleted ? "Completed" : isFailed ? "Failed" : "Pending"}
                            </span>
                            <p className="text-xs text-zinc-500 font-mono">
                                {new Date(job.created_at).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </p>
                        </div>

                        <h3 className="font-bold text-lg md:text-xl leading-tight text-white line-clamp-2">
                            {job.topic}
                        </h3>
                    </div>

                    {/* Desktop Hover Hint */}
                    <div className="hidden md:flex text-xs text-zinc-400 items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        Hover to view details
                    </div>

                    {/* Mobile Actions (Visible only on small screens) */}
                    <div className="flex md:hidden items-center justify-between gap-3 mt-2">
                        <Link
                            href={isCompleted ? `/dashboard/${job.id}` : "#"}
                            className={`flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${isCompleted
                                    ? "bg-orange-600 text-white hover:bg-orange-700"
                                    : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                                }`}
                            aria-disabled={!isCompleted}
                        >
                            Open <ArrowRight className="w-4 h-4" />
                        </Link>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (confirm("Are you sure you want to delete this digest?")) {
                                    onDelete(job.id);
                                }
                            }}
                            className="p-2 text-zinc-400 hover:text-red-400 bg-zinc-800/50 rounded-lg transition-colors"
                            title="Delete Digest"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Back Face (Desktop Only Flip) */}
                <div className="absolute inset-0 h-full w-full rounded-xl border border-orange-500/30 bg-zinc-950 p-6 shadow-xl [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between">
                    <div className="text-sm text-zinc-300 leading-relaxed line-clamp-4">
                        {isCompleted && job.output?.results?.summary ? (
                            job.output.results.summary
                        ) : isFailed ? (
                            "Analysis failed. Please try deleting and running again."
                        ) : (
                            "Analysis in progress... AI is processing your request."
                        )}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <Link
                            href={`/dashboard/${job.id}`}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-400 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            View Report <ExternalLink className="w-4 h-4" />
                        </Link>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (confirm("Are you sure you want to delete this digest?")) {
                                    onDelete(job.id);
                                }
                            }}
                            className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete Digest"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
