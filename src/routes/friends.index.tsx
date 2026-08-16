import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/hisab/AppShell";
import { FriendRow } from "@/components/hisab/FriendRow";
import { EmptyState, SectionCard, Stat } from "@/components/hisab/primitives";
import { useUI } from "@/components/hisab/ui-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { friendBalance, friendTotals } from "@/lib/hisab/calc";
import { inr } from "@/lib/hisab/format";
import { useHisab } from "@/lib/hisab/store";

export const Route = createFileRoute("/friends/")({
  head: () => ({
    meta: [
      { title: "Friends & balances — Hisab" },
      {
        name: "description",
        content: "See who owes you money and whom you owe, with a running balance for every friend.",
      },
      { property: "og:title", content: "Friends & balances — Hisab" },
      {
        property: "og:description",
        content: "Track shared expenses and settle up with friends in one tap.",
      },
    ],
  }),
  component: FriendsPage,
});

function FriendsPage() {
  const { data } = useHisab();
  const { open } = useUI();
  const [query, setQuery] = useState("");

  const totals = friendTotals(
    data.transactions,
    data.friends.map((f) => f.id),
  );

  const filtered = useMemo(
    () => data.friends.filter((f) => f.name.toLowerCase().includes(query.trim().toLowerCase())),
    [data.friends, query],
  );

  return (
    <AppShell>
      <div className="space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Friends</h1>
            <p className="mt-1 text-sm text-muted-foreground">Shared expenses and balances</p>
          </div>
          <Button className="rounded-2xl" onClick={() => open({ type: "addFriend" })}>
            <Plus className="size-4" /> Add Friend
          </Button>
        </header>

        <SectionCard>
          <div className="grid grid-cols-3 gap-3">
            <Stat label="You should receive" value={inr(totals.receivable)} tone="positive" />
            <Stat label="You should pay" value={inr(totals.payable)} tone="negative" />
            <Stat
              label="Net"
              value={inr(totals.net, { sign: true })}
              tone={totals.net > 0 ? "positive" : totals.net < 0 ? "negative" : "muted"}
            />
          </div>
        </SectionCard>

        <div className="relative">
          <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search friends..."
            className="h-12 rounded-2xl pl-11"
          />
        </div>

        {filtered.length ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {filtered.map((f) => (
              <FriendRow
                key={f.id}
                friend={f}
                balance={friendBalance(data.transactions, f.id)}
                variant="card"
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="🧑‍🤝‍🧑"
            title={data.friends.length ? "No friends match your search." : "You haven't added any friends yet."}
            action={
              <Button className="rounded-2xl" onClick={() => open({ type: "addFriend" })}>
                <Plus className="size-4" /> Add Friend
              </Button>
            }
          />
        )}
      </div>
    </AppShell>
  );
}
