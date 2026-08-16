export type ID = string;

export interface Friend {
  id: ID;
  name: string;
  phone?: string;
}

export type ExpenseCategory =
  | "rent"
  | "food"
  | "travel"
  | "recharge"
  | "shopping"
  | "entertainment"
  | "education"
  | "health"
  | "other";

export type IncomeSource = "home" | "scholarship" | "salary" | "freelance" | "other";

export interface Participant {
  /** "me" or a friend id */
  id: ID;
  share: number;
}

interface BaseTx {
  id: ID;
  /** ISO date string */
  date: string;
  note?: string;
}

export interface PersonalTx extends BaseTx {
  type: "personal";
  amount: number;
  category: ExpenseCategory;
  description: string;
}

export interface IncomeTx extends BaseTx {
  type: "income";
  amount: number;
  source: IncomeSource;
  description: string;
}

export interface FriendTx extends BaseTx {
  type: "friend";
  amount: number;
  description: string;
  category: ExpenseCategory;
  /** "me" or friend id */
  paidBy: ID;
  participants: Participant[];
}

export interface SettlementTx extends BaseTx {
  type: "settlement";
  friendId: ID;
  amount: number;
  /** received = friend paid me back, paid = I paid friend back */
  direction: "received" | "paid";
}

export type Transaction = PersonalTx | IncomeTx | FriendTx | SettlementTx;

export interface Profile {
  name: string;
  email: string;
  currency: string;
  theme: "light" | "dark";
  remindersEnabled: boolean;
  monthlySummaryEnabled: boolean;
}

export interface HisabData {
  profile: Profile;
  friends: Friend[];
  transactions: Transaction[];
}
