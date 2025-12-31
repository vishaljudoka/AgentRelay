import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { DashboardHeader } from "@/components/dashboard/header";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="flex min-h-screen flex-col">
            <DashboardHeader email={user.email!} />
            <main className="flex-1 space-y-4 p-8 pt-6">
                {children}
            </main>
        </div>
    );
}
