import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type ModalState =
  | { type: null }
  | { type: "quickAdd" }
  | { type: "friendExpense"; friendId?: string }
  | { type: "personalExpense" }
  | { type: "money" }
  | { type: "addFriend" }
  | { type: "settle"; friendId?: string }
  | { type: "txDetail"; txId: string };

interface UIStore {
  modal: ModalState;
  open: (m: ModalState) => void;
  close: () => void;
}

const UIContext = createContext<UIStore | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalState>({ type: null });
  const value = useMemo<UIStore>(
    () => ({ modal, open: setModal, close: () => setModal({ type: null }) }),
    [modal],
  );
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside UIProvider");
  return ctx;
}
