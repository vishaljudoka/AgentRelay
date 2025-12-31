import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { topic, seedUrls, maxItems } = await request.json();

        if (!topic || !seedUrls) {
            return NextResponse.json(
                { error: "Topic and Seed URLs are required" },
                { status: 400 }
            );
        }

        // 1. Create Job in Supabase
        const { data: job, error: dbError } = await supabase
            .from("jobs")
            .insert({
                user_id: user.id,
                topic,
                input_config: { seedUrls, maxItems },
                status: "pending",
            })
            .select()
            .single();

        if (dbError) {
            console.error("Database error:", dbError);
            return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
        }

        // 2. Trigger External Webhook
        const n8nUrl = process.env.N8N_WEBHOOK_URL;

        const n8nSecret = process.env.N8N_WEBHOOK_SECRET;

        console.log(`[Job ${job.id}] Triggering N8n Webhook at ${n8nUrl}`);
        const payload = {
            topic,
            seedUrls,
            maxItems,
            user_id: user.id,
            job_id: job.id,
        };
        console.log(`[Job ${job.id}] Payload:`, JSON.stringify(payload, null, 2));

        try {
            const res = await fetch(n8nUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-n8n-secret": n8nSecret || "",
                },
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                console.log(`[Job ${job.id}] N8n Triggered Successfully. Status: ${res.status}`);
            } else {
                const text = await res.text();
                // We log the error but don't fail the job creation response to the UI
                console.error(`[Job ${job.id}] N8n Trigger Failed. Status: ${res.status} Body: ${text}`);
            }
        } catch (err) {
            console.error(`[Job ${job.id}] Failed to trigger n8n:`, err);
        }

        return NextResponse.json(job);
    } catch (error) {
        console.error("Internal error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: jobs, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(jobs);
}
