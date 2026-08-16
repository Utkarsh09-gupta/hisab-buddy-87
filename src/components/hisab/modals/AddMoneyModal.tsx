import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SOURCES } from "@/lib/hisab/categories";
import { useHisab } from "@/lib/hisab/store";
import type { IncomeSource } from "@/lib/hisab/types";
import { cn } from "@/lib/utils";
import { ModalShell } from "./ModalShell";
import { localInputValue, toISO } from "./datetime";

const titleFor = (source: IncomeSource) =>
  source === "home" ? "Money from Home" : `Money from ${source[0]?.toUpperCase()}${source.slice(1)}`;

export function AddMoneyModal({ onClose }: { onClose: () => void }) {
  const { addTransaction } = useHisab();
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState<IncomeSource>("home");
  const [note, setNote] = useState("");
  const [when, setWhen] = useState(localInputValue(new Date()));

  const total = Number(amount) || 0;

  const save = () => {
    if (total <= 0) return;
    addTransaction({
      type: "income",
      amount: total,
      source,
      description: titleFor(source),
      note: note.trim() || undefined,
      date: toISO(when),
    });
    toast.success("Money added successfully");
    onClose();
  };

  return (
    <ModalShell
      title="Add Money"
      description="Record money you received this month."
      onClose={onClose}
      footer={
        <Button className="h-12 w-full rounded-2xl text-base" disabled={total <= 0} onClick={save}>
          Save Money
        </Button>
      }
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="am-amount">Amount</Label>
          <div className="relative">
            <span className="num absolute top-1/2 left-4 -translate-y-1/2 text-xl text-muted-foreground">
              ₹
            </span>
            <Input
              id="am-amount"
              inputMode="decimal"
              placeholder="15000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="num h-14 rounded-2xl pl-9 text-2xl font-semibold"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Source</Label>
          <div className="flex flex-wrap gap-2">
            {SOURCES.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setSource(s.value)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  source === s.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:border-primary/40",
                )}
              >
                {s.emoji} {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="am-when">Date & time</Label>
          <Input
            id="am-when"
            type="datetime-local"
            value={when}
            onChange={(e) => setWhen(e.target.value)}
            className="h-12 rounded-2xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="am-note">Note (optional)</Label>
          <Textarea
            id="am-note"
            placeholder="August monthly money"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="rounded-2xl"
          />
        </div>
      </div>
    </ModalShell>
  );
}
