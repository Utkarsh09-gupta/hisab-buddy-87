import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES } from "@/lib/hisab/categories";
import { ME, splitEqually } from "@/lib/hisab/calc";
import { inr } from "@/lib/hisab/format";
import { useHisab } from "@/lib/hisab/store";
import type { ExpenseCategory, Participant } from "@/lib/hisab/types";
import { cn } from "@/lib/utils";
import { ModalShell } from "./ModalShell";
import { OptionToggle } from "./OptionToggle";

export function AddFriendExpenseModal({
  presetFriendId,
  onClose,
}: {
  presetFriendId?: string;
  onClose: () => void;
}) {
  const { data, addTransaction } = useHisab();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("food");
  const [paidBy, setPaidBy] = useState<string>(ME);
  const [splitMode, setSplitMode] = useState<"equal" | "custom">("equal");
  const [note, setNote] = useState("");
  const [selected, setSelected] = useState<string[]>(presetFriendId ? [presetFriendId] : []);
  const [custom, setCustom] = useState<Record<string, string>>({});

  const total = Number(amount) || 0;
  const participantIds = useMemo(() => [ME, ...selected], [selected]);

  const shares = useMemo<Participant[]>(() => {
    if (splitMode === "equal") {
      const values = splitEqually(total, participantIds.length);
      return participantIds.map((id, i) => ({ id, share: values[i] ?? 0 }));
    }
    return participantIds.map((id) => ({ id, share: Number(custom[id]) || 0 }));
  }, [splitMode, total, participantIds, custom]);

  const assigned = shares.reduce((s, p) => s + p.share, 0);
  const nameOf = (id: string) =>
    id === ME ? "You" : (data.friends.find((f) => f.id === id)?.name ?? "Friend");

  const toggleFriend = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));

  const valid =
    total > 0 &&
    description.trim().length > 0 &&
    selected.length > 0 &&
    (splitMode === "equal" || Math.abs(assigned - total) < 0.5);

  const save = () => {
    if (!valid) return;
    addTransaction({
      type: "friend",
      amount: total,
      description: description.trim(),
      category,
      paidBy,
      participants: shares,
      note: note.trim() || undefined,
      date: new Date().toISOString(),
    });
    toast.success("Expense added successfully");
    onClose();
  };

  return (
    <ModalShell
      title="Add Expense"
      description="Split a bill with friends — balances update automatically."
      onClose={onClose}
      footer={
        <Button className="h-12 w-full rounded-2xl text-base" disabled={!valid} onClick={save}>
          Save Expense
        </Button>
      }
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <Label>Who was this with?</Label>
          {data.friends.length === 0 ? (
            <p className="text-sm text-muted-foreground">Add a friend first to split expenses.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {data.friends.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => toggleFriend(f.id)}
                  className={cn(
                    "rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
                    selected.includes(f.id)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card hover:border-primary/40",
                  )}
                >
                  {f.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fe-amount">Amount</Label>
            <div className="relative">
              <span className="num absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
                ₹
              </span>
              <Input
                id="fe-amount"
                inputMode="decimal"
                placeholder="500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="num h-12 rounded-2xl pl-7 text-lg"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="fe-desc">Description</Label>
            <Input
              id="fe-desc"
              placeholder="Pizza"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-12 rounded-2xl"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={(v) => setCategory(v as ExpenseCategory)}>
            <SelectTrigger className="h-12 w-full rounded-2xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.emoji} {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Who paid?</Label>
            <OptionToggle
              value={paidBy === ME ? ME : "friend"}
              onChange={(v) => setPaidBy(v === ME ? ME : (selected[0] ?? ME))}
              options={[
                { value: ME, label: "I paid" },
                { value: "friend", label: "Friend paid" },
              ]}
            />
            {paidBy !== ME && selected.length > 1 && (
              <Select value={paidBy} onValueChange={setPaidBy}>
                <SelectTrigger className="h-11 w-full rounded-2xl">
                  <SelectValue placeholder="Select payer" />
                </SelectTrigger>
                <SelectContent>
                  {selected.map((id) => (
                    <SelectItem key={id} value={id}>
                      {nameOf(id)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="space-y-2">
            <Label>Split</Label>
            <OptionToggle
              value={splitMode}
              onChange={(v) => setSplitMode(v as "equal" | "custom")}
              options={[
                { value: "equal", label: "Equal" },
                { value: "custom", label: "Custom" },
              ]}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface/70 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Live split</p>
            <p className="num text-sm font-semibold">Total {inr(total)}</p>
          </div>
          <div className="mt-3 space-y-2">
            {shares.map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-3">
                <span className="text-sm">{nameOf(p.id)}</span>
                {splitMode === "custom" ? (
                  <Input
                    inputMode="decimal"
                    value={custom[p.id] ?? ""}
                    placeholder="0"
                    onChange={(e) => setCustom((c) => ({ ...c, [p.id]: e.target.value }))}
                    className="num h-9 w-28 rounded-xl text-right"
                  />
                ) : (
                  <span className="num text-sm font-semibold">{inr(p.share)}</span>
                )}
              </div>
            ))}
          </div>
          {splitMode === "custom" && (
            <p
              className={cn(
                "mt-3 text-xs",
                Math.abs(assigned - total) < 0.5 ? "text-positive" : "text-negative",
              )}
            >
              Assigned {inr(assigned)} of {inr(total)}
            </p>
          )}
          {total > 0 && selected.length > 0 && (
            <div className="mt-3 space-y-1 border-t border-border pt-3">
              {shares
                .filter((p) => p.id !== ME)
                .map((p) =>
                  paidBy === ME ? (
                    <p key={p.id} className="text-xs text-positive">
                      {nameOf(p.id)} owes you {inr(p.share)}
                    </p>
                  ) : p.id === paidBy ? (
                    <p key={p.id} className="text-xs text-negative">
                      You owe {nameOf(p.id)} {inr(shares.find((s) => s.id === ME)?.share ?? 0)}
                    </p>
                  ) : null,
                )}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="fe-note">Note (optional)</Label>
          <Textarea
            id="fe-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Pizza after college"
            className="rounded-2xl"
          />
        </div>
      </div>
    </ModalShell>
  );
}
