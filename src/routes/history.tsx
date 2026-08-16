import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/hisab/AppShell";
import { MonthSelector } from "@/components/hisab/MonthSelector";
import { EmptyState, SectionCard } from "@/components/hisab/primitives";
import { TransactionList } from "@/components/hisab/TransactionCard";
import { useUI } from "@/components/hisab/ui-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sortByDateDesc } from "@/lib/hisab/calc";
import { monthKey } from "@/lib/hisab/format";
import { useHisab } from "@/lib/hisab/store";
import { describeTx } from "@/lib/hisab/tx-display";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Transaction history — Hisab" },
      {
        name: "description",
        content:
          "Search and filter every transaction: personal expenses, friend splits, money received and settlements.",
      },
      { property: "og:title", content: "Transaction history — Hisab" },
      {
        property: "og:description",
        content: "One searchable ledger for all your money movement.",
      },
    ],
  }),
  component: History,
});

const TYPE_FILTERS = ["All", "Personal", "Friends", "Money Received", "Settlement"] as const;
const DATE_FILTERS = ["All time", "Today", "This week", "This month"] as const;

function History() {
  const { data } = useHisab();
  const { open } = useUI();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<(typeof TYPE_FILTERS)[number]>("All");
  const [dateFilter, setDateFilter] = useState<(typeof DATE_FILTERS)[number]>("All time");
  const [month, setMonth] = useState(monthKey(new Date()));

  const items = useMemo(() => {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const weekStart = startOfDay - now.getDay() * 86400000;

    return sortByDateDesc(data.transactions).filter((tx) => {
      const d = describeTx(tx, data.friends);
      if (typeFilter !== "All" && d.kind !== typeFilter) return false;

      const time = +new Date(tx.date);
      if (dateFilter === "Today" && time < startOfDay) return false;
      if (dateFilter === "This week" && time < weekStart) return false;
      if (dateFilter === "This month" && monthKey(tx.date) !== month) return false;

      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (d.title + " " + d.subtitle + " " + (tx.note ?? "")).toLowerCase().includes(q);
    });
  }, [data.transactions, data.friends, typeFilter, dateFilter, month, query]);

  return (
    <AppShell>
      <div className="space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">History</h1>
            <p className="mt-1 text-sm text-muted-foreground">Every rupee, in one place</p>
          </div>
          {dateFilter === "This month" && <MonthSelector month={month} onChange={setMonth} />}
        </header>

        <div className="relative">
          <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search transactions..."
            className="h-12 rounded-2xl pl-11"
          />
        </div>

        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {TYPE_FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setTypeFilter(f)}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                typeFilter === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {DATE_FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setDateFilter(f)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                dateFilter === f ? "bg-accent text-accent-foreground" : "bg-surface text-muted-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <SectionCard>
          {items.length ? (
            <TransactionList items={items} />
          ) : (
            <EmptyState
              icon="🧾"
              title="No transactions yet."
              description="Try a different filter, or record something new."
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
