"use client";

import { createClient } from "@/utils/supabase/client";
import React from "react";

import { Job } from "@/types";
import { JobCard } from "./job-card";
// Link removed
import { useRouter } from "next/navigation";

export function JobList({ jobs: initialJobs }: { jobs: Job[] }) {
    const router = useRouter();
    const [jobs, setJobs] = React.useState<Job[]>(initialJobs);

    React.useEffect(() => {
        setJobs(initialJobs);
    }, [initialJobs, router]);

    React.useEffect(() => {
        const supabase = createClient();
        const channel = supabase
            .channel("realtime-jobs")
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .on(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                "postgres_changes" as any,
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "jobs",
                },
                (payload: { new: Job; old: Job }) => {
                    const updatedJob = payload.new as Job;

                    setJobs((currentJobs) =>
                        currentJobs.map((job) => {
                            if (job.id === updatedJob.id) {
                                return updatedJob;
                            }
                            return job;
                        })
                    );

                    // Force a router refresh to ensure server components are in sync
                    router.refresh();

                    if (payload.old.status !== "completed" && updatedJob.status === "completed") {
                        // Optional: Add toast notification here
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [router]);

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/jobs/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setJobs((current) => current.filter((j) => j.id !== id));
                router.refresh();
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (jobs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 p-8 text-center animate-in fade-in-50 bg-zinc-900/50">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800/80">
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
                        className="h-6 w-6 text-zinc-400"
                    >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-zinc-200">No jobs yet</h3>
                <p className="mb-4 mt-2 text-sm text-zinc-400 max-w-sm">
                    You haven&apos;t created any jobs yet. Start a new job analysis above.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
                <JobCard key={job.id} job={job} onDelete={handleDelete} />
            ))}
        </div>
    );
}
