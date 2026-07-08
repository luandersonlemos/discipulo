import { formatCurrency } from "../lib/format.js";
import { account } from "../lib/mockData.js";

export default function BalanceCard({ showBalance, onToggle }) {
  return (
    <div className="card card-glow balance-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p className="balance-label">Saldo disponível</p>
        <button className="btn-ghost btn-sm" onClick={onToggle} type="button">
          {showBalance ? "Ocultar" : "Mostrar"}
        </button>
      </div>
      <p className="balance-amount">
        {showBalance ? formatCurrency(account.balance) : "R$ ••••••"}
      </p>
      <div className="balance-row">
        <div className="balance-stat">
          <p className="balance-stat-label">Entradas</p>
          <p className="balance-stat-value income">
            {showBalance ? `+${formatCurrency(account.income)}` : "••••"}
          </p>
        </div>
        <div className="balance-stat">
          <p className="balance-stat-label">Saídas</p>
          <p className="balance-stat-value expense">
            {showBalance ? `-${formatCurrency(account.expenses)}` : "••••"}
          </p>
        </div>
      </div>
    </div>
  );
}
