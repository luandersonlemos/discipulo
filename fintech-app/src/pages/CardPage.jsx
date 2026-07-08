import { useState } from "react";
import { formatCurrency, maskCardNumber } from "../lib/format.js";
import { card } from "../lib/mockData.js";

export default function CardPage() {
  const [blocked, setBlocked] = useState(card.blocked);
  const available = card.limit - card.used;

  return (
    <>
      <header className="page-header">
        <div>
          <h1 className="page-title">Cartão</h1>
          <p className="page-subtitle">Virtual</p>
        </div>
      </header>

      <div className="app-content">
        <div className={`virtual-card${blocked ? " blocked" : ""}`}>
          <div className="card-brand">VERDEX</div>
          <div className="card-chip" />
          <p className="card-number">{maskCardNumber(card.number)}</p>
          <div className="card-footer">
            <div>
              <p className="card-holder">{card.holder}</p>
            </div>
            <p className="card-expiry">{card.expiry}</p>
          </div>
        </div>

        <div className="card mb-4">
          <div className="balance-row">
            <div className="balance-stat">
              <p className="balance-stat-label">Limite</p>
              <p className="balance-stat-value">{formatCurrency(card.limit)}</p>
            </div>
            <div className="balance-stat">
              <p className="balance-stat-label">Disponível</p>
              <p className="balance-stat-value income">{formatCurrency(available)}</p>
            </div>
          </div>
        </div>

        <button
          className={`btn btn-block ${blocked ? "btn-primary" : "btn-secondary"}`}
          type="button"
          onClick={() => setBlocked((v) => !v)}
        >
          {blocked ? "Desbloquear cartão" : "Bloquear cartão"}
        </button>

        {blocked && (
          <p className="text-muted text-sm mt-4" style={{ textAlign: "center" }}>
            Cartão bloqueado — nenhuma compra será autorizada
          </p>
        )}
      </div>
    </>
  );
}
