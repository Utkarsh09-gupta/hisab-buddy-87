import type { Friend, HisabData, Transaction } from "./types";

/**
 * Mock data layer. Replace this module (and the store's initial load) with an
 * API call once a backend exists — nothing else in the UI reads mock data.
 */

const at = (y: number, m: number, d: number, h = 12, min = 0) =>
  new Date(y, m - 1, d, h, min).toISOString();

export const MOCK_FRIENDS: Friend[] = [
  { id: "f_rahul", name: "Rahul", phone: "9812345670" },
  { id: "f_ankit", name: "Ankit", phone: "9812345671" },
  { id: "f_aman", name: "Aman" },
  { id: "f_yash", name: "Yash", phone: "9812345673" },
  { id: "f_shivam", name: "Shivam" },
  { id: "f_abhishek", name: "Abhishek", phone: "9812345675" },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  // ── Income ───────────────────────────────────────────────
  {
    id: "t_inc_aug",
    type: "income",
    amount: 15000,
    source: "home",
    description: "Money from Home",
    note: "August monthly money",
    date: at(2026, 8, 15, 10, 0),
  },
  {
    id: "t_inc_jul",
    type: "income",
    amount: 15000,
    source: "home",
    description: "Money from Home",
    note: "July monthly money",
    date: at(2026, 7, 1, 10, 0),
  },

  // ── Personal expenses – August 2026 ─────────────────────
  {
    id: "t_p1",
    type: "personal",
    amount: 5000,
    category: "rent",
    description: "August Room Rent",
    date: at(2026, 8, 15, 20, 15),
  },
  {
    id: "t_p2",
    type: "personal",
    amount: 500,
    category: "food",
    description: "Dinner",
    date: at(2026, 8, 14, 21, 10),
  },
  {
    id: "t_p3",
    type: "personal",
    amount: 900,
    category: "food",
    description: "Groceries",
    date: at(2026, 8, 11, 18, 0),
  },
  {
    id: "t_p4",
    type: "personal",
    amount: 600,
    category: "food",
    description: "Mess top-up",
    date: at(2026, 8, 9, 13, 30),
  },
  {
    id: "t_p5",
    type: "personal",
    amount: 600,
    category: "travel",
    description: "Cab to station",
    date: at(2026, 8, 13, 8, 20),
  },
  {
    id: "t_p6",
    type: "personal",
    amount: 400,
    category: "travel",
    description: "Metro card recharge",
    date: at(2026, 8, 8, 9, 0),
  },
  {
    id: "t_p7",
    type: "personal",
    amount: 300,
    category: "recharge",
    description: "Mobile recharge",
    date: at(2026, 8, 12, 11, 0),
  },
  {
    id: "t_p8",
    type: "personal",
    amount: 500,
    category: "other",
    description: "Printouts & misc",
    date: at(2026, 8, 7, 16, 0),
  },

  // ── Personal expenses – July 2026 ───────────────────────
  {
    id: "t_pj1",
    type: "personal",
    amount: 5000,
    category: "rent",
    description: "July Room Rent",
    date: at(2026, 7, 3, 10, 0),
  },
  {
    id: "t_pj2",
    type: "personal",
    amount: 3200,
    category: "food",
    description: "Mess & eating out",
    date: at(2026, 7, 12, 20, 0),
  },
  {
    id: "t_pj3",
    type: "personal",
    amount: 1500,
    category: "travel",
    description: "Trip home",
    date: at(2026, 7, 18, 7, 0),
  },
  {
    id: "t_pj4",
    type: "personal",
    amount: 2000,
    category: "shopping",
    description: "Sneakers",
    date: at(2026, 7, 22, 17, 30),
  },
  {
    id: "t_pj5",
    type: "personal",
    amount: 700,
    category: "entertainment",
    description: "Movie night",
    date: at(2026, 7, 26, 21, 0),
  },

  // ── Friend expenses ─────────────────────────────────────
  {
    id: "t_f1",
    type: "friend",
    amount: 500,
    description: "Pizza with Rahul",
    category: "food",
    paidBy: "me",
    participants: [
      { id: "me", share: 250 },
      { id: "f_rahul", share: 250 },
    ],
    note: "Pizza after college",
    date: at(2026, 8, 15, 21, 42),
  },
  {
    id: "t_f2",
    type: "friend",
    amount: 100,
    description: "Chai with Ankit",
    category: "food",
    paidBy: "f_ankit",
    participants: [
      { id: "me", share: 50 },
      { id: "f_ankit", share: 50 },
    ],
    date: at(2026, 8, 15, 18, 30),
  },
  {
    id: "t_f3",
    type: "friend",
    amount: 100,
    description: "Chai with Rahul",
    category: "food",
    paidBy: "f_rahul",
    participants: [
      { id: "me", share: 50 },
      { id: "f_rahul", share: 50 },
    ],
    date: at(2026, 8, 13, 17, 15),
  },
  {
    id: "t_f4",
    type: "friend",
    amount: 400,
    description: "Burger",
    category: "food",
    paidBy: "me",
    participants: [
      { id: "me", share: 200 },
      { id: "f_rahul", share: 200 },
    ],
    date: at(2026, 8, 10, 20, 5),
  },
  {
    id: "t_f5",
    type: "friend",
    amount: 300,
    description: "Movie snacks",
    category: "entertainment",
    paidBy: "f_ankit",
    participants: [
      { id: "me", share: 150 },
      { id: "f_ankit", share: 150 },
    ],
    date: at(2026, 8, 6, 19, 45),
  },
  {
    id: "t_f6",
    type: "friend",
    amount: 300,
    description: "Lunch with Aman",
    category: "food",
    paidBy: "me",
    participants: [
      { id: "me", share: 150 },
      { id: "f_aman", share: 150 },
    ],
    date: at(2026, 8, 5, 14, 0),
  },
  {
    id: "t_f7",
    type: "friend",
    amount: 900,
    description: "Concert tickets",
    category: "entertainment",
    paidBy: "me",
    participants: [
      { id: "me", share: 450 },
      { id: "f_yash", share: 450 },
    ],
    date: at(2026, 8, 9, 12, 0),
  },
  {
    id: "t_f8",
    type: "friend",
    amount: 200,
    description: "Auto fare",
    category: "travel",
    paidBy: "f_shivam",
    participants: [
      { id: "me", share: 100 },
      { id: "f_shivam", share: 100 },
    ],
    date: at(2026, 8, 4, 9, 30),
  },
  {
    id: "t_f9",
    type: "friend",
    amount: 240,
    description: "Stationery",
    category: "education",
    paidBy: "me",
    participants: [
      { id: "me", share: 120 },
      { id: "f_abhishek", share: 120 },
    ],
    date: at(2026, 8, 3, 15, 20),
  },

  // ── Settlements ─────────────────────────────────────────
  {
    id: "t_s1",
    type: "settlement",
    friendId: "f_aman",
    amount: 150,
    direction: "received",
    note: "Aman paid back for lunch",
    date: at(2026, 8, 7, 11, 0),
  },
  {
    id: "t_s2",
    type: "settlement",
    friendId: "f_ankit",
    amount: 100,
    direction: "paid",
    note: "Paid Ankit back",
    date: at(2026, 8, 8, 13, 0),
  },
];

export const MOCK_DATA: HisabData = {
  profile: {
    name: "Utkarsh",
    email: "utkarsh@example.com",
    currency: "INR",
    theme: "light",
    remindersEnabled: true,
    monthlySummaryEnabled: true,
  },
  friends: MOCK_FRIENDS,
  transactions: MOCK_TRANSACTIONS,
};
