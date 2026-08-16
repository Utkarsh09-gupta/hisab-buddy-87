import { useHisab } from "@/lib/hisab/store";
import { relativeDay, timeLabel } from "@/lib/hisab/format";
import { describeTx, toneClass } from "@/lib/hisab/tx-display";
import type { Transaction } from "@/lib/hisab/types";
import { cn } from "@/lib/utils";
import { useUI } from "./ui-store";

export function TransactionCard({ tx, showTime = true }: { tx: Transaction; showTime?: boolean }) {
  const { data } = useHisab();
  const { open } = useUI();
  const d = describeTx(tx, data.friends);

  return (
    <button
      type="button"
      onClick={() => open({ type: "txDetail", txId: tx.id })}
      className="flex w-full items-center gap-3 rounded-2xl px-2 py-3 text-left transition-colors hover:bg-surface focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-surface text-lg">
        {d.emoji}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold">{d.title}</span>
        <span className="block truncate text-xs text-muted-foreground">{d.subtitle}</span>
        {showTime && (
          <span className="mt-0.5 block text-[11px] text-muted-foreground/80">
            {relativeDay(tx.date)}, {timeLabel(tx.date)}
          </span>
        )}
      </span>
      <span className={cn("num shrink-0 text-sm font-semibold", toneClass(d.tone))}>
        {d.amountLabel}
      </span>
    </button>
  );
}

export function TransactionList({ items }: { items: Transaction[] }) {
  return (
    <div className="divide-y divide-border/60">
      {items.map((tx) => (
        <TransactionCard key={tx.id} tx={tx} />
      ))}
    </div>
  );
}
