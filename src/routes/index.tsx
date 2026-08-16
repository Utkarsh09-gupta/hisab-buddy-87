import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Plus } from "lucide-react";

import { AppShell } from "@/components/hisab/AppShell";
import { FriendRow } from "@/components/hisab/FriendRow";
import { EmptyState, SectionCard, Stat } from "@/components/hisab/primitives";
import { TransactionList } from "@/components/hisab/TransactionCard";
import { useUI } from "@/components/hisab/ui-store";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { friendBalance, friendTotals, monthlySummary, sortByDateDesc } from "@/lib/hisab/calc";
import { greeting, inr, monthKey, monthLabel } from "@/lib/hisab/format";
import { useHisab } from "@/lib/hisab/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hisab — Track money, expenses and friend balances" },
      {
        name: "description",
        content:
          "Hisab helps students track monthly money, personal spending and who owes whom — all in one clean dashboard.",
      },
      { property: "og:title", content: "Hisab — Paise kahan gaye, sab ek jagah" },
      {
        property: "og:description",
        content: "Track money from home, personal expenses and friend balances in seconds.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { data } = useHisab();
  const { open } = useUI();
  const month = monthKey(new Date());
  const summary = monthlySummary(data.transactions, month);
  const totals = friendTotals(
    data.transactions,
    data.friends.map((f) => f.id),
  );
  const recent = sortByDateDesc(data.transactions).slice(0, 6);
  const spentPct = summary.received > 0 ? Math.min(100, (summary.spent / summary.received) * 100) : 0;

  return (
    <AppShell>
      <div className="space-y-6">
        <header className="pt-1">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {greeting()}, {data.profile.name} 👋
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{monthLabel(month)}</p>
        </header>

        <div className="grid gap-5 lg:grid-cols-2">
          <SectionCard
            title="My Money"
            action={
              <Link
                to="/my-money"
                className="text-xs font-semibold text-primary hover:underline"
              >
                Details
              </Link>
            }
          >
            <div className="grid grid-cols-3 gap-3">
              <Stat label="Received" value={inr(summary.received)} tone="positive" size="sm" />
              <Stat label="Spent" value={inr(summary.spent)} size="sm" />
              <Stat
                label="Remaining"
                value={inr(summary.remaining)}
                tone={summary.remaining >= 0 ? "positive" : "negative"}
                size="sm"
              />
            </div>
            <div className="mt-5">
              <Progress value={spentPct} className="h-2.5" />
              <p className="mt-2 text-xs text-muted-foreground">
                {Math.round(spentPct)}% of this month&apos;s money spent
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button className="rounded-2xl" onClick={() => open({ type: "money" })}>
                <Plus className="size-4" /> Add Money
              </Button>
              <Button
                variant="outline"
                className="rounded-2xl"
                onClick={() => open({ type: "personalExpense" })}
              >
                <Plus className="size-4" /> Add Expense
              </Button>
            </div>
          </SectionCard>

          <SectionCard
            title="Friends"
            action={
              <Link to="/friends" className="text-xs font-semibold text-primary hover:underline">
                View all friends
              </Link>
            }
          >
            <div className="grid grid-cols-3 gap-3">
              <Stat label="Receive" value={inr(totals.receivable)} tone="positive" size="sm" />
              <Stat label="Pay" value={inr(totals.payable)} tone="negative" size="sm" />
              <Stat
                label="Net"
                value={inr(totals.net, { sign: true })}
                tone={totals.net > 0 ? "positive" : totals.net < 0 ? "negative" : "muted"}
                size="sm"
              />
            </div>
            <div className="mt-3 divide-y divide-border/60">
              {data.friends.slice(0, 5).map((f) => (
                <FriendRow key={f.id} friend={f} balance={friendBalance(data.transactions, f.id)} />
              ))}
              {data.friends.length === 0 && (
                <EmptyState
                  icon="🧑‍🤝‍🧑"
                  title="You haven't added any friends yet."
                  action={
                    <Button className="rounded-2xl" onClick={() => open({ type: "addFriend" })}>
                      <Plus className="size-4" /> Add Friend
                    </Button>
                  }
                />
              )}
            </div>
          </SectionCard>
        </div>

        <SectionCard
          title="Recent activity"
          action={
            <Link
              to="/history"
              className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              See all <ArrowRight className="size-3.5" />
            </Link>
          }
        >
          {recent.length ? (
            <TransactionList items={recent} />
          ) : (
            <EmptyState
              icon="🧾"
              title="No transactions yet."
              description="Your spending history will appear here."
              action={
                <Button className="rounded-2xl" onClick={() => open({ type: "quickAdd" })}>
                  <Plus className="size-4" /> Add Transaction
                </Button>
              }
            />
          )}
        </SectionCard>
      </div>
    </AppShell>
  );
}
