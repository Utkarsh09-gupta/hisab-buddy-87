import { Link } from "@tanstack/react-router";
import { Clock3, Home, Plus, Settings, Users, Wallet } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useHisab } from "@/lib/hisab/store";
import { ModalHost } from "./modals/ModalHost";
import { useUI } from "./ui-store";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/my-money", label: "My Money", icon: Wallet },
  { to: "/friends", label: "Friends", icon: Users },
  { to: "/history", label: "History", icon: Clock3 },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

const MOBILE_NAV = [NAV[0], NAV[2], NAV[3]] as const;

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground">
        ₹
      </span>
      {!compact && (
        <span>
          <span className="block text-lg leading-none font-bold tracking-tight">Hisab</span>
          <span className="block text-[10px] leading-tight text-muted-foreground">
            Sab ek jagah
          </span>
        </span>
      )}
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { open } = useUI();
  const { data } = useHisab();

  return (
    <div className="min-h-dvh bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-card px-4 py-6 lg:flex">
        <Logo />
        <nav className="mt-8 flex-1 space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-accent text-accent-foreground" }}
              className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              <item.icon className="size-4.5" />
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => open({ type: "quickAdd" })}
          className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-float)] transition-transform hover:scale-[1.02]"
        >
          <Plus className="size-4" /> Add
        </button>
        <p className="mt-4 text-xs text-muted-foreground">Signed in as {data.profile.name}</p>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border/70 bg-background/85 px-4 py-3 backdrop-blur lg:hidden">
        <Logo />
        <Link
          to="/settings"
          className="flex size-9 items-center justify-center rounded-full bg-surface text-muted-foreground"
          aria-label="Settings"
        >
          <Settings className="size-4" />
        </Link>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 pt-4 pb-28 sm:px-6 lg:pt-8 lg:pb-12 lg:pl-8 xl:max-w-6xl">
        <div className="lg:pl-56">{children}</div>
      </main>

      {/* Mobile bottom navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-4 items-center px-2 py-2">
          {MOBILE_NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="flex flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-medium text-muted-foreground"
            >
              <item.icon className="size-5" />
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => open({ type: "quickAdd" })}
            className={cn(
              "mx-auto flex h-12 w-16 flex-col items-center justify-center gap-0.5 rounded-2xl bg-primary text-[11px] font-semibold text-primary-foreground",
              "shadow-[var(--shadow-float)] transition-transform active:scale-95",
            )}
          >
            <Plus className="size-5" />
            Add
          </button>
        </div>
      </nav>

      <ModalHost />
    </div>
  );
}
