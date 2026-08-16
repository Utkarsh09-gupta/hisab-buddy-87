import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import { AppShell } from "@/components/hisab/AppShell";
import { MonthSelector } from "@/components/hisab/MonthSelector";
import { EmptyState, SectionCard, Stat } from "@/components/hisab/primitives";
import { TransactionList } from "@/components/hisab/TransactionCard";
import { useUI } from "@/components/hisab/ui-store";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { categoryMeta } from "@/lib/hisab/categories";
import { categoryTotals, inMonth, monthlySummary, sortByDateDesc } from "@/lib/hisab/calc";
import { inr, monthKey, monthLabel, shiftMonth } from "@/lib/hisab/format";
import { useHisab } from "@/lib/hisab/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/my-money")({
  head: () => ({
    meta: [
      { title: "My Money — monthly income & spending | Hisab" },
      {
        name: "description",
        content:
          "See money received, personal spending, category breakdown and what's left for the month.",
      },
      { property: "og:title", content: "My Money — monthly income & spending | Hisab" },
      {
        property: "og:description",
        content: "Monthly budget, category breakdown and a clean money timeline.",
      },
    ],
  }),
  component: MyMoney,
});

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

type Filter = "all" | "income" | "expenses";

function MyMoney() {
  const { data } = useHisab();
  const { open } = useUI();
  const [month, setMonth] = useState(monthKey(new Date()));
  const [filter, setFilter] = useState<Filter>("all");

  const summary = monthlySummary(data.transactions, month);
  const prevMonth = shiftMonth(month, -1);
  const prevSummary = monthlySummary(data.transactions, prevMonth);
  const categories = categoryTotals(data.transactions, month);
  const spentPct = summary.received > 0 ? Math.min(100, (summary.spent / summary.received) * 100) : 0;

  const timeline = sortByDateDesc(
    inMonth(data.transactions, month).filter((t) => {
      if (filter === "income") return t.type === "income";
      if (filter === "expenses") return t.type === "personal";
      return t.type === "income" || t.type === "personal";
    }),
  );

  const pieData = categories.map((c) => ({
    name: categoryMeta(c.category).label,
    value: c.total,
  }));

  const barData = [
    { name: monthLabel(prevMonth).split(" ")[0], value: prevSummary.spent },
    { name: monthLabel(month).split(" ")[0], value: summary.spent },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">My Money</h1>
            <p className="mt-1 text-sm text-muted-foreground">Your personal monthly budget</p>
          </div>
          <MonthSelector month={month} onChange={setMonth} />
        </header>

        <SectionCard>
          <div className="grid grid-cols-3 gap-3">
            <Stat label="Received" value={inr(summary.received)} tone="positive" />
            <Stat label="Spent" value={inr(summary.spent)} />
            <Stat
              label="Remaining"
              value={inr(summary.remaining)}
              tone={summary.remaining >= 0 ? "positive" : "negative"}
            />
          </div>
          <Progress value={spentPct} className="mt-5 h-2.5" />
          <div className="mt-4 flex flex-wrap gap-2">
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

        <div className="grid gap-5 lg:grid-cols-2">
          <SectionCard title="Spending breakdown">
            {categories.length ? (
              <div className="space-y-4">
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={48}
                        outerRadius={72}
                        paddingAngle={2}
                        stroke="none"
                      >
                        {pieData.map((_, i) => (
                          <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(v: number | string) => inr(Number(v))}
                        contentStyle={{
                          borderRadius: 12,
                          border: "1px solid var(--border)",
                          background: "var(--card)",
                          fontSize: 12,
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((c, i) => (
                    <div
                      key={c.category}
                      className="flex items-center gap-2 rounded-2xl border border-border/70 bg-surface/60 p-3"
                    >
                      <span className="text-base">{categoryMeta(c.category).emoji}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs text-muted-foreground">
                          {categoryMeta(c.category).label}
                        </span>
                        <span className="num block text-sm font-semibold">{inr(c.total)}</span>
                      </span>
                      <span
                        className="size-2.5 rounded-full"
                        style={{ background: CHART_COLORS[i % CHART_COLORS.length] }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <EmptyState
                icon="📊"
                title="No expenses this month."
                description="Your spending history will appear here."
              />
            )}
          </SectionCard>

          <SectionCard title="Monthly spending">
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} barSize={44}>
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                  />
                  <Tooltip
                    cursor={{ fill: "var(--surface)" }}
                    formatter={(v: number | string) => inr(Number(v))}
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--border)",
                      background: "var(--card)",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="value" fill="var(--primary)" radius={[10, 10, 4, 4]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <Stat label={monthLabel(prevMonth)} value={inr(prevSummary.spent)} size="sm" />
              <Stat label={monthLabel(month)} value={inr(summary.spent)} size="sm" />
            </div>
          </SectionCard>
        </div>

        <SectionCard
          title="Money timeline"
          action={
            <div className="flex gap-1 rounded-full border border-border bg-surface p-1">
              {(["all", "income", "expenses"] as Filter[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors",
                    filter === f
                      ? "bg-card text-foreground shadow-[var(--shadow-card)]"
                      : "text-muted-foreground",
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          }
        >
          {timeline.length ? (
            <TransactionList items={timeline} />
          ) : (
            <EmptyState icon="🧾" title="No transactions yet." description="Your spending history will appear here." />
          )}
        </SectionCard>
      </div>
    </AppShell>
  );
}
