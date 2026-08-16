import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES } from "@/lib/hisab/categories";
import { useHisab } from "@/lib/hisab/store";
import type { ExpenseCategory } from "@/lib/hisab/types";
import { cn } from "@/lib/utils";
import { ModalShell } from "./ModalShell";
import { localInputValue, toISO } from "./datetime";

export function AddPersonalExpenseModal({ onClose }: { onClose: () => void }) {
  const { addTransaction } = useHisab();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("food");
  const [description, setDescription] = useState("");
  const [when, setWhen] = useState(localInputValue(new Date()));
  const [note, setNote] = useState("");

  const total = Number(amount) || 0;
  const valid = total > 0 && description.trim().length > 0;

  const save = () => {
    if (!valid) return;
    addTransaction({
      type: "personal",
      amount: total,
      category,
      description: description.trim(),
      note: note.trim() || undefined,
      date: toISO(when),
    });
    toast.success("Expense added successfully");
    onClose();
  };

  return (
    <ModalShell
      title="Add Personal Expense"
      description="Track where your own money went."
      onClose={onClose}
      footer={
        <Button className="h-12 w-full rounded-2xl text-base" disabled={!valid} onClick={save}>
          Save Expense
        </Button>
      }
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="pe-amount">Amount</Label>
          <div className="relative">
            <span className="num absolute top-1/2 left-4 -translate-y-1/2 text-xl text-muted-foreground">
              ₹
            </span>
            <Input
              id="pe-amount"
              inputMode="decimal"
              placeholder="5000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="num h-14 rounded-2xl pl-9 text-2xl font-semibold"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setCategory(c.value)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-2xl border px-2 py-3 text-xs font-medium transition-colors",
                  category === c.value
                    ? "border-primary bg-accent text-accent-foreground"
                    : "border-border bg-card hover:border-primary/40",
                )}
              >
                <span className="text-lg">{c.emoji}</span>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pe-desc">Description</Label>
          <Input
            id="pe-desc"
            placeholder="August Room Rent"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-12 rounded-2xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pe-when">Date & time</Label>
          <Input
            id="pe-when"
            type="datetime-local"
            value={when}
            onChange={(e) => setWhen(e.target.value)}
            className="h-12 rounded-2xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pe-note">Note (optional)</Label>
          <Textarea
            id="pe-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="rounded-2xl"
          />
        </div>
      </div>
    </ModalShell>
  );
}
