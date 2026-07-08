import { formatCurrency, formatDate } from "../lib/format.js";

const categoryIcons = {
  renda: "↓",
  alimentacao: "🍽",
  transporte: "🚗",
  transferencia: "↔",
  lazer: "▶",
  saude: "✚",
  investimento: "◎"
};

export default function TransactionItem({ transaction, onSelect }) {
  const isIncome = transaction.type === "in";
  const icon = categoryIcons[transaction.category] || (isIncome ? "↓" : "↑");

  const content = (
    <>
      <div className={`transaction-icon ${transaction.type}`}>{icon}</div>
      <div className="transaction-info">
        <p className="transaction-title">{transaction.title}</p>
        <p className="transaction-subtitle">
          {transaction.subtitle} · {formatDate(transaction.date)}
        </p>
      </div>
      <p className={`transaction-amount ${transaction.type}`}>
        {isIncome ? "+" : ""}
        {formatCurrency(Math.abs(transaction.amount))}
      </p>
    </>
  );

  if (onSelect) {
    return (
      <button type="button" className="transaction-item transaction-button" onClick={() => onSelect(transaction)}>
        {content}
      </button>
    );
  }

  return <div className="transaction-item">{content}</div>;
}
