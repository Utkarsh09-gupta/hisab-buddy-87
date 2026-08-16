import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { MOCK_DATA } from "./mock";
import type { Friend, HisabData, NewTransaction, Profile, Transaction } from "./types";

const STORAGE_KEY = "hisab.data.v1";

const uid = () => Math.random().toString(36).slice(2, 10);

/**
 * Frontend data layer. All mutations funnel through here, so swapping
 * localStorage for a REST API later means changing only this file.
 */
interface HisabStore {
  data: HisabData;
  hydrated: boolean;
  addFriend: (friend: Omit<Friend, "id">) => Friend;
  addTransaction: (tx: NewTransaction) => Transaction;
  updateTransaction: (id: string, patch: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  updateProfile: (patch: Partial<Profile>) => void;
  reset: () => void;
}

const HisabContext = createContext<HisabStore | null>(null);

export function HisabProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<HisabData>(MOCK_DATA);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setData(JSON.parse(raw) as HisabData);
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* storage full or unavailable */
    }
  }, [data, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.classList.toggle("dark", data.profile.theme === "dark");
  }, [data.profile.theme, hydrated]);

  const addFriend = useCallback((friend: Omit<Friend, "id">) => {
    const created: Friend = { ...friend, id: `f_${uid()}` };
    setData((d) => ({ ...d, friends: [...d.friends, created] }));
    return created;
  }, []);

  const addTransaction = useCallback((tx: NewTransaction) => {
    const created = { ...tx, id: `t_${uid()}` } as Transaction;
    setData((d) => ({ ...d, transactions: [created, ...d.transactions] }));
    return created;
  }, []);

  const updateTransaction = useCallback((id: string, patch: Partial<Transaction>) => {
    setData((d) => ({
      ...d,
      transactions: d.transactions.map((t) => (t.id === id ? ({ ...t, ...patch } as Transaction) : t)),
    }));
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setData((d) => ({ ...d, transactions: d.transactions.filter((t) => t.id !== id) }));
  }, []);

  const updateProfile = useCallback((patch: Partial<Profile>) => {
    setData((d) => ({ ...d, profile: { ...d.profile, ...patch } }));
  }, []);

  const reset = useCallback(() => setData(MOCK_DATA), []);

  const value = useMemo<HisabStore>(
    () => ({
      data,
      hydrated,
      addFriend,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      updateProfile,
      reset,
    }),
    [data, hydrated, addFriend, addTransaction, updateTransaction, deleteTransaction, updateProfile, reset],
  );

  return <HisabContext.Provider value={value}>{children}</HisabContext.Provider>;
}

export function useHisab() {
  const ctx = useContext(HisabContext);
  if (!ctx) throw new Error("useHisab must be used inside HisabProvider");
  return ctx;
}

export function useFriendName() {
  const { data } = useHisab();
  return useCallback(
    (id: string) => (id === "me" ? "You" : (data.friends.find((f) => f.id === id)?.name ?? "Unknown")),
    [data.friends],
  );
}
