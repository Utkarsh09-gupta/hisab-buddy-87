import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { inr } from "@/lib/hisab/format";
import { balanceLabel, balanceTone } from "@/lib/hisab/tx-display";
import type { Friend } from "@/lib/hisab/types";
import { cn } from "@/lib/utils";
import { Avatar } from "./primitives";

export function FriendRow({
  friend,
  balance,
  variant = "row",
}: {
  friend: Friend;
  balance: number;
  variant?: "row" | "card";
}) {
  return (
    <Link
      to="/friends/$friendId"
      params={{ friendId: friend.id }}
      className={cn(
        "flex items-center gap-3 transition-colors",
        variant === "card"
          ? "rounded-2xl border border-border/70 bg-card p-4 shadow-[var(--shadow-card)] hover:border-primary/40"
          : "rounded-2xl px-2 py-3 hover:bg-surface",
      )}
    >
      <Avatar name={friend.name} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{friend.name}</p>
        <p className={cn("truncate text-xs", balanceTone(balance))}>
          {balanceLabel(balance, friend.name)}
        </p>
      </div>
      <span className={cn("num text-sm font-semibold", balanceTone(balance))}>
        {balance === 0 ? "₹0" : inr(balance, { sign: true })}
      </span>
      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
    </Link>
  );
}
