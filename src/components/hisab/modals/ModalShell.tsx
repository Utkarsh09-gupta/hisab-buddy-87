import type { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ModalShell({
  title,
  description,
  children,
  footer,
  onClose,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
}) {
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        showCloseButton
        className="flex max-h-[92dvh] w-full flex-col gap-0 overflow-hidden rounded-3xl border-border p-0 sm:max-w-lg max-sm:h-[92dvh] max-sm:max-w-none"
      >
        <DialogHeader className="border-b border-border/70 px-5 py-4 text-left">
          <DialogTitle className="text-lg">{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
        {footer && <div className="border-t border-border/70 bg-card px-5 py-4">{footer}</div>}
      </DialogContent>
    </Dialog>
  );
}
