import { useState } from "react";
import { Link } from "react-router-dom";
import BalanceCard from "../components/BalanceCard.jsx";
import QuickActions from "../components/QuickActions.jsx";
import SavingsGoal from "../components/SavingsGoal.jsx";
import SpendingChart from "../components/SpendingChart.jsx";
import TransactionDetail from "../components/TransactionDetail.jsx";
import TransactionItem from "../components/TransactionItem.jsx";
import { transactions, user } from "../lib/mockData.js";

export default function HomePage() {
  const [showBalance, setShowBalance] = useState(true);
  const [selectedTx, setSelectedTx] = useState(null);
  const recent = transactions.slice(0, 5);

  return (
    <>
      <header className="page-header">
        <div>
          <p className="page-subtitle">Olá, {user.firstName}</p>
          <h1 className="page-title">Início</h1>
        </div>
        <Link to="/investimentos" className="header-pill">
          ◎ Investir
        </Link>
      </header>

      <div className="app-content">
        <div className="notice-banner">
          <span className="notice-dot" />
          <p>Você rendeu <strong>R$ 12,87</strong> na reserva este mês</p>
        </div>

        <BalanceCard showBalance={showBalance} onToggle={() => setShowBalance((v) => !v)} />
        <QuickActions />
        <SpendingChart />
        <SavingsGoal />

        <div className="section-header">
          <h2 className="section-title">Últimas movimentações</h2>
          <Link to="/extrato" className="section-link">
            Ver tudo
          </Link>
        </div>

        <div className="transaction-list">
          {recent.map((tx) => (
            <TransactionItem key={tx.id} transaction={tx} onSelect={setSelectedTx} />
          ))}
        </div>
      </div>

      {selectedTx && <TransactionDetail transaction={selectedTx} onClose={() => setSelectedTx(null)} />}
    </>
  );
}
