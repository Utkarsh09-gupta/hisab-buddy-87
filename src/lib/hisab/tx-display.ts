import { categoryMeta } from "./categories";
import { ME } from "./calc";
import { inr } from "./format";
import type { Friend, Transaction } from "./types";

export interface TxDisplay {
  emoji: string;
  title: string;
  subtitle: string;
  amountLabel: string;
  tone: "positive" | "negative" | "neutral";
  kind: "Personal" | "Friends" | "Money Received" | "Settlement";
}

export function describeTx(tx: Transaction, friends: Friend[]): TxDisplay {
  const nameOf = (id: string) =>
    id === ME ? "You" : (friends.find((f) => f.id === id)?.name ?? "Friend");

  if (tx.type === "income") {
    return {
      emoji: "💰",
      title: tx.description || "Money received",
      subtitle: "Received",
      amountLabel: inr(tx.amount, { sign: true }),
      tone: "positive",
      kind: "Money Received",
    };
  }

  if (tx.type === "personal") {
    return {
      emoji: categoryMeta(tx.category).emoji,
      title: tx.description,
      subtitle: `Personal expense · ${categoryMeta(tx.category).label}`,
      amountLabel: inr(tx.amount),
      tone: "neutral",
      kind: "Personal",
    };
  }

  if (tx.type === "settlement") {
    const name = nameOf(tx.friendId);
    return {
      emoji: "🤝",
      title: tx.direction === "received" ? `${name} paid you back` : `You paid ${name} back`,
      subtitle: "Settlement",
      amountLabel: inr(tx.amount, { sign: false }),
      tone: "neutral",
      kind: "Settlement",
    };
  }

  const others = tx.participants.filter((p) => p.id !== ME);
  const myShare = tx.participants.find((p) => p.id === ME)?.share ?? 0;
  const othersShare = others.reduce((s, p) => s + p.share, 0);
  const paidByMe = tx.paidBy === ME;

  return {
    emoji: categoryMeta(tx.category).emoji,
    title: tx.description,
    subtitle: paidByMe
      ? `You paid ${inr(tx.amount)} · ${others.map((p) => nameOf(p.id)).join(", ")} owe ${inr(othersShare)}`
      : `${nameOf(tx.paidBy)} paid ${inr(tx.amount)} · you owe ${inr(myShare)}`,
    amountLabel: paidByMe ? inr(othersShare, { sign: true }) : inr(-myShare, { sign: true }),
    tone: paidByMe ? "positive" : "negative",
    kind: "Friends",
  };
}

export const toneClass = (tone: TxDisplay["tone"]) =>
  tone === "positive" ? "text-positive" : tone === "negative" ? "text-negative" : "text-foreground";

export const balanceTone = (balance: number) =>
  balance > 0 ? "text-positive" : balance < 0 ? "text-negative" : "text-muted-foreground";

export const balanceLabel = (balance: number, name: string) =>
  balance > 0 ? `${name} owes you` : balance < 0 ? `You owe ${name}` : "Settled up";
