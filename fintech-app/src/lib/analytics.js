import { categoryLabels, transactions } from "./mockData.js";

const expenseCategories = ["alimentacao", "transporte", "lazer", "saude"];

const categoryColors = {
  alimentacao: "#00e676",
  transporte: "#34d399",
  lazer: "#00c853",
  saude: "#00a844"
};

export function getExpensesByCategory() {
  const totals = {};

  for (const tx of transactions) {
    if (tx.type !== "out" || !expenseCategories.includes(tx.category)) continue;
    totals[tx.category] = (totals[tx.category] || 0) + Math.abs(tx.amount);
  }

  return Object.entries(totals)
    .map(([category, amount]) => ({
      category,
      label: categoryLabels[category],
      amount,
      color: categoryColors[category] || "#00e676"
    }))
    .sort((a, b) => b.amount - a.amount);
}

export function getTotalExpenses() {
  return getExpensesByCategory().reduce((sum, item) => sum + item.amount, 0);
}
