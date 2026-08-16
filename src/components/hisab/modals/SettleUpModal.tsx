import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { friendBalance } from "@/lib/hisab/calc";
import { inr } from "@/lib/hisab/format";
import { useHisab } from "@/lib/hisab/store";
import { balanceTone } from "@/lib/hisab/tx-display";
import { cn } from "@/lib/utils";
import { ModalShell } from "./ModalShell";

export function SettleUpModal({
  presetFriendId,
  onClose,
}: {
  presetFriendId?: string;
  onClose: () => void;
}) {
  const { data, addTransaction } = useHisab();
  const [friendId, setFriendId] = useState(presetFriendId ?? data.friends[0]?.id ?? "");
  const balance = useMemo(
    () => (friendId ? friendBalance(data.transactions, friendId) : 0),
    [data.transactions, friendId],
  );
  const [amount, setAmount] = useState(String(Math.abs(balance) || ""));
  const friend = data.friends.find((f) => f.id === friendId);
  const value = Number(amount) || 0;

  const selectFriend = (id: string) => {
    setFriendId(id);
    setAmount(String(Math.abs(friendBalance(data.transactions, id)) || ""));
  };

  const save = () => {
    if (!friendId || value <= 0) return;
    addTransaction({
      type: "settlement",
      friendId,
      amount: value,
      direction: balance >= 0 ? "received" : "paid",
      date: new Date().toISOString(),
    });
    toast.success("Balance settled");
    onClose();
  };

  return (
    <ModalShell
      title="Settle Up"
      description="Record a repayment and clear the balance."
      onClose={onClose}
      footer={
        <Button
          className="h-12 w-full rounded-2xl text-base"
          disabled={!friendId || value <= 0}
          onClick={save}
        >
          Mark as Paid
        </Button>
      }
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <Label>Friend</Label>
          <div className="flex flex-wrap gap-2">
            {data.friends.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => selectFriend(f.id)}
                className={cn(
                  "rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
                  friendId === f.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:border-primary/40",
                )}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        {friend && (
          <div className="rounded-2xl border border-border bg-surface/70 p-4">
            <p className="text-sm text-muted-foreground">
              {balance > 0
                ? `${friend.name} owes you`
                : balance < 0
                  ? `You owe ${friend.name}`
                  : "Already settled"}
            </p>
            <p className={cn("num mt-1 text-3xl font-semibold", balanceTone(balance))}>
              {inr(Math.abs(balance))}
            </p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="su-amount">
            {balance >= 0 ? "Amount received" : "Amount paid"}
          </Label>
          <div className="relative">
            <span className="num absolute top-1/2 left-4 -translate-y-1/2 text-xl text-muted-foreground">
              ₹
            </span>
            <Input
              id="su-amount"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="num h-14 rounded-2xl pl-9 text-2xl font-semibold"
            />
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
