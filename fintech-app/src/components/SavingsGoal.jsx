import { formatCurrency } from "../lib/format.js";
import { account } from "../lib/mockData.js";

export default function SavingsGoal() {
  const progress = (account.savingsCurrent / account.savingsGoal) * 100;

  return (
    <div className="card savings-card">
      <div className="savings-header">
        <div>
          <p className="savings-title">Meta: Reserva de emergência</p>
          <p className="savings-amount">
            {formatCurrency(account.savingsCurrent)} de {formatCurrency(account.savingsGoal)}
          </p>
        </div>
        <span className="text-green text-sm">{Math.round(progress)}%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
