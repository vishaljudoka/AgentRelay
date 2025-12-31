import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    // Security Check
    const secret = request.headers.get("x-n8n-secret");
    const expectedSecret = process.env.N8N_WEBHOOK_SECRET;

    if (expectedSecret && secret !== expectedSecret) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const payload = await request.json();

        // Expected schema from agent.md: { job_id, results: [...] }
        const { job_id, results } = payload;

        if (!job_id || !results) {
            return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
        }

        // Initialize Supabase Admin Client
        // Ensure SUPABASE_SERVICE_ROLE_KEY is set in .env.local
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const { error } = await supabaseAdmin
            .from("jobs")
            .update({
                status: "completed",
                output: { results },
            })
            .eq("id", job_id);

        if (error) {
            console.error("Supabase update error:", error);
            return NextResponse.json({ error: "Database update failed" }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Webhook processing error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
