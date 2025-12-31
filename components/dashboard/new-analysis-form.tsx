"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function NewAnalysisForm({ }: { userId: string }) {
    const [topic, setTopic] = useState("");
    const [seedUrls, setSeedUrls] = useState<string[]>([""]);
    const [maxItems, setMaxItems] = useState(3);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    function handleUrlChange(index: number, value: string) {
        const newUrls = [...seedUrls];
        newUrls[index] = value;
        setSeedUrls(newUrls);
    }

    function addUrlField() {
        setSeedUrls([...seedUrls, ""]);
    }

    function removeUrlField(index: number) {
        const newUrls = [...seedUrls];
        newUrls.splice(index, 1);
        setSeedUrls(newUrls);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/jobs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    topic,
                    seedUrls: seedUrls.filter((u) => u.trim() !== ""),
                    maxItems,
                }),
            });

            if (!res.ok) throw new Error("Failed to create job");

            setTopic("");
            setSeedUrls([""]);
            setMaxItems(3);
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="font-semibold leading-none tracking-tight">New Job Analysis</h3>
                <p className="text-sm text-muted-foreground">
                    Enter a topic and seed URLs to generate an automated analysis.
                </p>
            </div>
            <div className="p-6 pt-0">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Topic</label>
                        <input
                            type="text"
                            placeholder="e.g. AWS DevOps"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Seed URLs</label>
                        {seedUrls.map((url, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="url"
                                    placeholder="https://example.com/blog"
                                    value={url}
                                    onChange={(e) => handleUrlChange(index, e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                />
                                {seedUrls.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeUrlField(index)}
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addUrlField}
                            className="text-sm text-primary hover:underline"
                        >
                            + Add another URL
                        </button>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Max Items</label>
                        <input
                            type="number"
                            min="1"
                            max="10"
                            value={maxItems}
                            onChange={(e) => setMaxItems(parseInt(e.target.value))}
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    >
                        {loading ? "Starting Analysis..." : "Start Analysis"}
                    </button>
                </form>
            </div>
        </div>
    );
}
