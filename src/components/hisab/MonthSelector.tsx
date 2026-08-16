import { ChevronLeft, ChevronRight } from "lucide-react";

import { monthLabel, shiftMonth } from "@/lib/hisab/format";
import { Button } from "@/components/ui/button";

export function MonthSelector({
  month,
  onChange,
}: {
  month: string;
  onChange: (month: string) => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1">
      <Button
        variant="ghost"
        size="icon"
        className="size-8 rounded-full"
        aria-label="Previous month"
        onClick={() => onChange(shiftMonth(month, -1))}
      >
        <ChevronLeft className="size-4" />
      </Button>
      <span className="min-w-[7.5rem] text-center text-sm font-semibold">{monthLabel(month)}</span>
      <Button
        variant="ghost"
        size="icon"
        className="size-8 rounded-full"
        aria-label="Next month"
        onClick={() => onChange(shiftMonth(month, 1))}
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
