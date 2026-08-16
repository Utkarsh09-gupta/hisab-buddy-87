import { Handshake, Receipt, Users, Wallet } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUI, type ModalState } from "../ui-store";

const ACTIONS: {
  label: string;
  hint: string;
  icon: typeof Users;
  modal: ModalState;
}[] = [
  {
    label: "Add Friend Expense",
    hint: "Split a bill and track balances",
    icon: Users,
    modal: { type: "friendExpense" },
  },
  {
    label: "Add Personal Expense",
    hint: "Rent, food, travel and more",
    icon: Receipt,
    modal: { type: "personalExpense" },
  },
  {
    label: "Add Money Received",
    hint: "Money from home or other sources",
    icon: Wallet,
    modal: { type: "money" },
  },
  {
    label: "Settle Up",
    hint: "Clear a balance with a friend",
    icon: Handshake,
    modal: { type: "settle" },
  },
];

export function QuickAddSheet({ onClose }: { onClose: () => void }) {
  const { open } = useUI();
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="rounded-3xl p-0 sm:max-w-md max-sm:top-auto max-sm:bottom-0 max-sm:translate-y-0 max-sm:rounded-b-none">
        <DialogHeader className="px-5 pt-5 text-left">
          <DialogTitle>What would you like to add?</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 px-4 pb-6">
          {ACTIONS.map((a) => (
            <button
              key={a.label}
              type="button"
              onClick={() => open(a.modal)}
              className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/50 hover:bg-surface"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                <a.icon className="size-5" />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-semibold">{a.label}</span>
                <span className="block text-xs text-muted-foreground">{a.hint}</span>
              </span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
