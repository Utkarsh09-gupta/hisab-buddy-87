import type { ExpenseCategory, IncomeSource } from "./types";

export const CATEGORIES: { value: ExpenseCategory; label: string; emoji: string }[] = [
  { value: "rent", label: "Rent", emoji: "🏠" },
  { value: "food", label: "Food", emoji: "🍱" },
  { value: "travel", label: "Travel", emoji: "🚕" },
  { value: "recharge", label: "Recharge", emoji: "📱" },
  { value: "shopping", label: "Shopping", emoji: "🛍" },
  { value: "entertainment", label: "Entertainment", emoji: "🎬" },
  { value: "education", label: "Education", emoji: "📚" },
  { value: "health", label: "Health", emoji: "💊" },
  { value: "other", label: "Other", emoji: "📦" },
];

export const categoryMeta = (c: ExpenseCategory) =>
  CATEGORIES.find((x) => x.value === c) ?? CATEGORIES[CATEGORIES.length - 1];

export const SOURCES: { value: IncomeSource; label: string; emoji: string }[] = [
  { value: "home", label: "Home", emoji: "🏡" },
  { value: "scholarship", label: "Scholarship", emoji: "🎓" },
  { value: "salary", label: "Salary", emoji: "💼" },
  { value: "freelance", label: "Freelance", emoji: "💻" },
  { value: "other", label: "Other", emoji: "✨" },
];

export const sourceMeta = (s: IncomeSource) =>
  SOURCES.find((x) => x.value === s) ?? SOURCES[SOURCES.length - 1];
