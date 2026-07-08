import { formatCurrency, formatDateTime } from "../lib/format.js";
import { categoryLabels } from "../lib/mockData.js";

const categoryIcons = {
  renda: "↓",
  alimentacao: "🍽",
  transporte: "🚗",
  transferencia: "↔",
  lazer: "▶",
  saude: "✚",
  investimento: "◎"
};

export default function TransactionDetail({ transaction, onClose }) {
  if (!transaction) return null;

  const isIncome = transaction.type === "in";
  const icon = categoryIcons[transaction.category] || (isIncome ? "↓" : "↑");

  return (
    <div className="sheet-overlay" onClick={onClose} role="presentation">
      <div
        className="sheet"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tx-detail-title"
      >
        <div className="sheet-handle" />

        <div className="sheet-header">
          <div className={`transaction-icon ${transaction.type}`} style={{ width: 56, height: 56, fontSize: "1.5rem" }}>
            {icon}
          </div>
          <h2 id="tx-detail-title" className="sheet-title">
            {transaction.title}
          </h2>
          <p className={`sheet-amount ${transaction.type}`}>
            {isIncome ? "+" : "-"}
            {formatCurrency(Math.abs(transaction.amount))}
          </p>
        </div>

        <div className="sheet-details">
          <div className="detail-row">
            <span className="detail-label">Status</span>
            <span className="detail-value text-green">Concluído</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Categoria</span>
            <span className="detail-value">{categoryLabels[transaction.category]}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Descrição</span>
            <span className="detail-value">{transaction.subtitle}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Data</span>
            <span className="detail-value">{formatDateTime(transaction.date)}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">ID</span>
            <span className="detail-value detail-mono">VDX-{transaction.id.padStart(8, "0")}</span>
          </div>
        </div>

        <button className="btn btn-secondary btn-block" type="button" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}
