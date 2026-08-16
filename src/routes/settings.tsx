import { createFileRoute } from "@tanstack/react-router";
import { LogOut, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/hisab/AppShell";
import { SectionCard } from "@/components/hisab/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useHisab } from "@/lib/hisab/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings & profile — Hisab" },
      {
        name: "description",
        content: "Manage your profile, currency, theme and notification preferences in Hisab.",
      },
      { property: "og:title", content: "Settings & profile — Hisab" },
      { property: "og:description", content: "Profile, preferences and notifications." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { data, updateProfile, reset } = useHisab();
  const p = data.profile;

  return (
    <AppShell>
      <div className="space-y-6">
        <header className="pt-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Paise kahan gaye, kisne diye aur kis se lene hain — sab ek jagah.
          </p>
        </header>

        <SectionCard title="Profile">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="st-name">Name</Label>
              <Input
                id="st-name"
                value={p.name}
                onChange={(e) => updateProfile({ name: e.target.value })}
                className="h-12 rounded-2xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="st-email">Email</Label>
              <Input
                id="st-email"
                type="email"
                value={p.email}
                onChange={(e) => updateProfile({ email: e.target.value })}
                className="h-12 rounded-2xl"
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Preferences">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">Currency</p>
                <p className="text-xs text-muted-foreground">Used across the app</p>
              </div>
              <span className="rounded-full bg-surface px-3 py-1.5 text-sm font-medium">INR (₹)</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">Theme</p>
                <p className="text-xs text-muted-foreground">Light or dark appearance</p>
              </div>
              <div className="flex gap-1 rounded-full border border-border bg-surface p-1">
                {(["light", "dark"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => updateProfile({ theme: t })}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors",
                      p.theme === t ? "bg-card shadow-[var(--shadow-card)]" : "text-muted-foreground",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Notifications">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">Payment reminders</p>
                <p className="text-xs text-muted-foreground">Nudge friends about pending balances</p>
              </div>
              <Switch
                checked={p.remindersEnabled}
                onCheckedChange={(v) => updateProfile({ remindersEnabled: v })}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium">Monthly summary</p>
                <p className="text-xs text-muted-foreground">A recap on the 1st of every month</p>
              </div>
              <Switch
                checked={p.monthlySummaryEnabled}
                onCheckedChange={(v) => updateProfile({ monthlySummaryEnabled: v })}
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Account">
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="rounded-2xl"
              onClick={() => {
                reset();
                toast.success("Demo data restored");
              }}
            >
              <RotateCcw className="size-4" /> Reset demo data
            </Button>
            <Button
              variant="destructive"
              className="rounded-2xl"
              onClick={() => toast("Logout will be available once accounts are connected")}
            >
              <LogOut className="size-4" /> Logout
            </Button>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
