import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Handshake, Plus } from "lucide-react";

import { AppShell } from "@/components/hisab/AppShell";
import { Avatar, EmptyState, SectionCard } from "@/components/hisab/primitives";
import { TransactionList } from "@/components/hisab/TransactionCard";
import { useUI } from "@/components/hisab/ui-store";
import { Button } from "@/components/ui/button";
import { friendBalance, friendTransactions } from "@/lib/hisab/calc";
import { inr } from "@/lib/hisab/format";
import { useHisab } from "@/lib/hisab/store";
import { balanceLabel, balanceTone } from "@/lib/hisab/tx-display";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/friends/$friendId")({
  head: () => ({
    meta: [
      { title: "Friend balance & history — Hisab" },
      {
        name: "description",
        content: "Every shared expense with this friend, with a running balance and one-tap settle up.",
      },
      { property: "og:title", content: "Friend balance & history — Hisab" },
      {
        property: "og:description",
        content: "See each shared expense, who paid, and the net balance.",
      },
    ],
  }),
  component: FriendDetail,
});

function FriendDetail() {
  const { friendId } = Route.useParams();
  const { data } = useHisab();
  const { open } = useUI();
  const friend = data.friends.find((f) => f.id === friendId);

  if (!friend) {
    return (
      <AppShell>
        <EmptyState
          icon="🔍"
          title="Friend not found"
          description="This friend may have been removed."
          action={
            <Link to="/friends">
              <Button className="rounded-2xl">Back to friends</Button>
            </Link>
          }
        />
      </AppShell>
    );
  }

  const balance = friendBalance(data.transactions, friend.id);
  const history = friendTransactions(data.transactions, friend.id);

  return (
    <AppShell>
      <div className="space-y-6">
        <Link
          to="/friends"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Friends
        </Link>

        <SectionCard>
          <div className="flex items-center gap-4">
            <Avatar name={friend.name} className="size-14 text-lg" />
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-bold tracking-tight">{friend.name}</h1>
              {friend.phone && <p className="num text-xs text-muted-foreground">{friend.phone}</p>}
            </div>
          </div>
          <div className="mt-5 rounded-2xl bg-surface/70 p-4">
            <p className="text-xs tracking-wide text-muted-foreground uppercase">Current balance</p>
            <p className={cn("num mt-1 text-3xl font-semibold", balanceTone(balance))}>
              {balance === 0 ? "₹0" : inr(balance, { sign: true })}
            </p>
            <p className={cn("mt-1 text-sm", balanceTone(balance))}>
              {balanceLabel(balance, friend.name)}
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              className="rounded-2xl"
              onClick={() => open({ type: "friendExpense", friendId: friend.id })}
            >
              <Plus className="size-4" /> Add Expense
            </Button>
            <Button
              variant="outline"
              className="rounded-2xl"
              onClick={() => open({ type: "settle", friendId: friend.id })}
            >
              <Handshake className="size-4" /> Settle Up
            </Button>
          </div>
        </SectionCard>

        <SectionCard title="Transaction history">
          {history.length ? (
            <>
              <TransactionList items={history} />
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="text-sm text-muted-foreground">Net balance</span>
                <span className={cn("num text-lg font-semibold", balanceTone(balance))}>
                  {inr(Math.abs(balance))}
                </span>
              </div>
              <p className={cn("mt-1 text-right text-xs", balanceTone(balance))}>
                {balanceLabel(balance, friend.name)}
                {balance !== 0 && ` ${inr(Math.abs(balance))}`}
              </p>
            </>
          ) : (
            <EmptyState
              icon="🧾"
              title="No transactions yet."
              description={`Add your first shared expense with ${friend.name}.`}
              action={
                <Button
                  className="rounded-2xl"
                  onClick={() => open({ type: "friendExpense", friendId: friend.id })}
                >
                  <Plus className="size-4" /> Add Expense
                </Button>
              }
            />
          )}
        </SectionCard>
      </div>
    </AppShell>
  );
}
