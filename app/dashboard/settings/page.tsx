import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { UserSettings } from "@/components/settings/user-settings";

export default async function SettingsPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">Manage your account and preferences.</p>
            </div>

            <div className="max-w-2xl">
                <UserSettings email={user.email!} />
            </div>
        </div>
    );
}
