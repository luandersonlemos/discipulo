import { formatCurrency } from "../lib/format.js";
import { getExpensesByCategory, getTotalExpenses } from "../lib/analytics.js";

export default function SpendingChart() {
  const items = getExpensesByCategory();
  const total = getTotalExpenses();

  if (items.length === 0) return null;

  return (
    <div className="card spending-chart">
      <div className="section-header" style={{ marginBottom: 16 }}>
        <h2 className="section-title">Gastos do mês</h2>
        <span className="text-green text-sm">{formatCurrency(total)}</span>
      </div>

      <div className="chart-bars">
        {items.map((item) => {
          const percent = total > 0 ? (item.amount / total) * 100 : 0;

          return (
            <div key={item.category} className="chart-row">
              <div className="chart-row-header">
                <span className="chart-label">{item.label}</span>
                <span className="chart-value">{formatCurrency(item.amount)}</span>
              </div>
              <div className="chart-track">
                <div
                  className="chart-fill"
                  style={{ width: `${percent}%`, background: item.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
