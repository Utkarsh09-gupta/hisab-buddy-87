import { monthKey } from "./format";
import type { ExpenseCategory, Transaction } from "./types";

export const ME = "me";

/** Positive = friend owes me. Negative = I owe friend. */
export const friendBalance = (txs: Transaction[], friendId: string) => {
  let balance = 0;
  for (const tx of txs) {
    if (tx.type === "friend") {
      const friendPart = tx.participants.find((p) => p.id === friendId);
      if (!friendPart) continue;
      const mePart = tx.participants.find((p) => p.id === ME);
      if (tx.paidBy === ME) balance += friendPart.share;
      else if (tx.paidBy === friendId) balance -= mePart?.share ?? 0;
    } else if (tx.type === "settlement" && tx.friendId === friendId) {
      balance += tx.direction === "received" ? -tx.amount : tx.amount;
    }
  }
  return Math.round(balance);
};

export const friendTransactions = (txs: Transaction[], friendId: string) =>
  txs
    .filter(
      (tx) =>
        (tx.type === "friend" && tx.participants.some((p) => p.id === friendId)) ||
        (tx.type === "settlement" && tx.friendId === friendId),
    )
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

export const friendTotals = (txs: Transaction[], friendIds: string[]) => {
  let receivable = 0;
  let payable = 0;
  for (const id of friendIds) {
    const b = friendBalance(txs, id);
    if (b > 0) receivable += b;
    else payable += -b;
  }
  return { receivable, payable, net: receivable - payable };
};

export const inMonth = (txs: Transaction[], month: string) =>
  txs.filter((t) => monthKey(t.date) === month);

export const monthlySummary = (txs: Transaction[], month: string) => {
  const scoped = inMonth(txs, month);
  const received = scoped
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + (t.type === "income" ? t.amount : 0), 0);
  const spent = scoped
    .filter((t) => t.type === "personal")
    .reduce((sum, t) => sum + (t.type === "personal" ? t.amount : 0), 0);
  return { received, spent, remaining: received - spent };
};

export const categoryTotals = (txs: Transaction[], month: string) => {
  const map = new Map<ExpenseCategory, number>();
  for (const tx of inMonth(txs, month)) {
    if (tx.type !== "personal") continue;
    map.set(tx.category, (map.get(tx.category) ?? 0) + tx.amount);
  }
  return [...map.entries()]
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);
};

export const availableMonths = (txs: Transaction[]) => {
  const set = new Set(txs.map((t) => monthKey(t.date)));
  set.add(monthKey(new Date()));
  return [...set].sort().reverse();
};

export const splitEqually = (amount: number, count: number) => {
  if (count <= 0) return [];
  const base = Math.floor((amount * 100) / count) / 100;
  const shares = Array.from({ length: count }, () => base);
  const remainder = Math.round((amount - base * count) * 100) / 100;
  shares[0] = Math.round((base + remainder) * 100) / 100;
  return shares;
};

export const sortByDateDesc = (txs: Transaction[]) =>
  [...txs].sort((a, b) => +new Date(b.date) - +new Date(a.date));
