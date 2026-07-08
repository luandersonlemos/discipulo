import { formatCurrency } from "../lib/format.js";
import { investments } from "../lib/mockData.js";

export default function InvestmentsPage() {
  return (
    <>
      <header className="page-header">
        <div>
          <h1 className="page-title">Investimentos</h1>
          <p className="page-subtitle">Carteira Verdex</p>
        </div>
      </header>

      <div className="app-content">
        <div className="card card-glow invest-summary">
          <p className="balance-label">Total investido</p>
          <p className="balance-amount">{formatCurrency(investments.total)}</p>
          <div className="invest-yield">
            <span className="text-green">+{formatCurrency(investments.yield)}</span>
            <span className="text-muted text-sm"> este mês ({investments.yieldPercent}%)</span>
          </div>
        </div>

        <div className="section-header">
          <h2 className="section-title">Meus produtos</h2>
        </div>

        <div className="invest-list">
          {investments.products.map((product) => (
            <div key={product.id} className="card invest-card">
              <div className="invest-card-top">
                <div>
                  <p className="invest-name">{product.name}</p>
                  <p className="invest-type">{product.type} · {product.rate}</p>
                </div>
                <span className="invest-risk">{product.risk}</span>
              </div>
              <div className="invest-card-bottom">
                <div>
                  <p className="balance-stat-label">Aplicado</p>
                  <p className="invest-amount">{formatCurrency(product.amount)}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p className="balance-stat-label">Rendimento</p>
                  <p className="invest-yield-value">+{formatCurrency(product.yield)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="btn btn-primary btn-block" type="button">
          Aplicar em novo produto
        </button>

        <p className="text-muted text-sm" style={{ textAlign: "center", marginTop: 12 }}>
          Projeto de portfólio — valores simulados
        </p>
      </div>
    </>
  );
}
