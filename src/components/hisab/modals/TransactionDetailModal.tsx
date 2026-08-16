import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { categoryMeta, sourceMeta } from "@/lib/hisab/categories";
import { ME } from "@/lib/hisab/calc";
import { fullDate, inr, timeLabel } from "@/lib/hisab/format";
import { useHisab } from "@/lib/hisab/store";
import { describeTx, toneClass } from "@/lib/hisab/tx-display";
import { cn } from "@/lib/utils";
import { ModalShell } from "./ModalShell";

export function TransactionDetailModal({ txId, onClose }: { txId: string; onClose: () => void }) {
  const { data, updateTransaction, deleteTransaction } = useHisab();
  const tx = data.transactions.find((t) => t.id === txId);
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState(
    tx && tx.type !== "settlement" ? tx.description : "",
  );
  const [note, setNote] = useState(tx?.note ?? "");

  if (!tx) {
    return (
      <ModalShell title="Transaction" onClose={onClose}>
        <p className="text-sm text-muted-foreground">This transaction no longer exists.</p>
      </ModalShell>
    );
  }

  const d = describeTx(tx, data.friends);
  const nameOf = (id: string) =>
    id === ME ? data.profile.name : (data.friends.find((f) => f.id === id)?.name ?? "Friend");

  const saveEdit = () => {
    updateTransaction(tx.id, {
      ...(tx.type !== "settlement" ? { description: description.trim() } : {}),
      note: note.trim() || undefined,
    } as Partial<typeof tx>);
    setEditing(false);
    toast.success("Transaction updated");
  };

  const remove = () => {
    deleteTransaction(tx.id);
    toast.success("Transaction deleted");
    onClose();
  };

  return (
    <ModalShell
      title="Transaction details"
      onClose={onClose}
      footer={
        <div className="flex gap-3">
          {editing ? (
            <>
              <Button variant="outline" className="h-12 flex-1 rounded-2xl" onClick={() => setEditing(false)}>
                Cancel
              </Button>
              <Button className="h-12 flex-1 rounded-2xl" onClick={saveEdit}>
                Save changes
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="h-12 flex-1 rounded-2xl" onClick={() => setEditing(true)}>
                Edit
              </Button>
              <Button variant="destructive" className="h-12 flex-1 rounded-2xl" onClick={remove}>
                Delete
              </Button>
            </>
          )}
        </div>
      }
    >
      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-surface text-2xl">
            {d.emoji}
          </span>
          <div>
            <p className="text-lg font-semibold">{d.title}</p>
            <p className="num text-2xl font-semibold">{inr(tx.amount)}</p>
          </div>
        </div>

        {editing ? (
          <div className="space-y-4">
            {tx.type !== "settlement" && (
              <div className="space-y-2">
                <Label htmlFor="td-desc">Description</Label>
                <Input
                  id="td-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-12 rounded-2xl"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="td-note">Note</Label>
              <Input
                id="td-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="h-12 rounded-2xl"
              />
            </div>
          </div>
        ) : (
          <dl className="space-y-3 rounded-2xl border border-border bg-surface/60 p-4 text-sm">
            {tx.type === "friend" && (
              <>
                <Row label="Paid by" value={nameOf(tx.paidBy)} />
                <div>
                  <dt className="text-muted-foreground">Participants</dt>
                  <dd className="mt-1 space-y-1">
                    {tx.participants.map((p) => (
                      <div key={p.id} className="flex justify-between">
                        <span>{nameOf(p.id)}</span>
                        <span className="num font-medium">{inr(p.share)}</span>
                      </div>
                    ))}
                  </dd>
                </div>
                <Row label="Category" value={categoryMeta(tx.category).label} />
              </>
            )}
            {tx.type === "personal" && <Row label="Category" value={categoryMeta(tx.category).label} />}
            {tx.type === "income" && <Row label="Source" value={sourceMeta(tx.source).label} />}
            {tx.type === "settlement" && (
              <Row
                label="Type"
                value={tx.direction === "received" ? "Payment received" : "Payment made"}
              />
            )}
            <Row label="Date" value={fullDate(tx.date)} />
            <Row label="Time" value={timeLabel(tx.date)} />
            {tx.note && <Row label="Note" value={tx.note} />}
            <div className="flex justify-between border-t border-border pt-3">
              <dt className="text-muted-foreground">Impact</dt>
              <dd className={cn("num font-semibold", toneClass(d.tone))}>{d.amountLabel}</dd>
            </div>
          </dl>
        )}
      </div>
    </ModalShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
