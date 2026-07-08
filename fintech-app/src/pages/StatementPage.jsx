import { useState } from "react";
import SpendingChart from "../components/SpendingChart.jsx";
import TransactionDetail from "../components/TransactionDetail.jsx";
import TransactionItem from "../components/TransactionItem.jsx";
import { categoryLabels, transactions } from "../lib/mockData.js";

const filters = [
  { id: "all", label: "Todas" },
  ...Object.entries(categoryLabels).map(([id, label]) => ({ id, label }))
];

export default function StatementPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedTx, setSelectedTx] = useState(null);

  const filtered =
    activeFilter === "all"
      ? transactions
      : transactions.filter((tx) => tx.category === activeFilter);

  return (
    <>
      <header className="page-header">
        <div>
          <h1 className="page-title">Extrato</h1>
          <p className="page-subtitle">Julho 2026</p>
        </div>
      </header>

      <div className="app-content">
        <SpendingChart />

        <div className="filter-chips">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={`chip${activeFilter === filter.id ? " active" : ""}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="transaction-list">
          {filtered.map((tx) => (
            <TransactionItem key={tx.id} transaction={tx} onSelect={setSelectedTx} />
          ))}
        </div>
      </div>

      {selectedTx && <TransactionDetail transaction={selectedTx} onClose={() => setSelectedTx(null)} />}
    </>
  );
}
