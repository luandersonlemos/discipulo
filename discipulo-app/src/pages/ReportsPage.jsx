import { Link } from "react-router-dom";
import { buildProgressReport } from "../lib/reports.js";
import { isPremium } from "../lib/subscription.js";

function BarChart({ items, labelKey = "week", valueKey = "count" }) {
  const max = Math.max(...items.map((item) => item[valueKey]), 1);

  return (
    <div className="bar-chart">
      {items.map((item) => (
        <div key={item[labelKey]} className="bar-row">
          <span className="bar-label">{item[labelKey].slice(5)}</span>
          <div className="bar-track">
            <div
              className="bar-fill"
              style={{ width: `${Math.round((item[valueKey] / max) * 100)}%` }}
            />
          </div>
          <span className="bar-value">{item[valueKey]}</span>
        </div>
      ))}
    </div>
  );
}

export default function ReportsPage() {
  if (!isPremium()) {
    return (
      <section className="card paywall-card">
        <h3>📊 Relatórios detalhados</h3>
        <p className="muted">
          Veja sua evolução espiritual em profundidade: streak, oração, Bíblia, reflexões e mais.
        </p>
        <p className="muted">Este recurso é exclusivo do <strong>Premium</strong>.</p>
        <Link to="/premium" className="premium-cta">Conhecer o Premium</Link>
      </section>
    );
  }

  const report = buildProgressReport();

  return (
    <>
      <section className="card">
        <p className="label">Relatório de crescimento</p>
        <h2>Sua caminhada em números</h2>
        <p className="muted">Gerado em {report.generatedAt}</p>
      </section>

      <section className="card">
        <h3>🔥 Sequência (streak)</h3>
        <div className="report-grid">
          <div><span>Atual</span><strong>{report.streak.current} dias</strong></div>
          <div><span>Recorde</span><strong>{report.streak.longest} dias</strong></div>
          <div><span>Total</span><strong>{report.streak.totalDays} devocionais</strong></div>
          <div><span>Últimos 30 dias</span><strong>{report.activity.devotionalsLast30}</strong></div>
        </div>
      </section>

      <section className="card">
        <h3>📈 Devocionais por semana</h3>
        {report.activity.weeklyDevotionals.length === 0 ? (
          <p className="muted">Ainda sem dados suficientes.</p>
        ) : (
          <BarChart items={report.activity.weeklyDevotionals} />
        )}
      </section>

      <section className="card">
        <h3>📖 Bíblia e planos</h3>
        <div className="report-grid">
          <div><span>Bíblia lida</span><strong>{report.bible.percent}%</strong></div>
          <div><span>Plano atual</span><strong>{report.plan.percentage}%</strong></div>
          <div><span>Plano dias</span><strong>{report.plan.completed}/{report.plan.total}</strong></div>
          <div><span>Jornada</span><strong>{report.journey.topicsCompleted} tópicos</strong></div>
        </div>
      </section>

      <section className="card">
        <h3>🙏 Oração</h3>
        <div className="report-grid">
          <div><span>Total orado</span><strong>{report.prayer.totalMinutes} min</strong></div>
          <div><span>Sessões</span><strong>{report.prayer.sessions}</strong></div>
          <div><span>Média/sessão</span><strong>{report.prayer.avgMinutes} min</strong></div>
          <div><span>Pedidos respondidos</span><strong>{report.prayers.answerRate}%</strong></div>
        </div>
      </section>

      <section className="card">
        <h3>📝 Diário e reflexão</h3>
        <div className="report-grid">
          <div><span>Entradas no diário</span><strong>{report.journal.entries}</strong></div>
          <div><span>Diário (30 dias)</span><strong>{report.journal.last30}</strong></div>
          <div><span>Reflexões</span><strong>{report.reflections.total}</strong></div>
          <div><span>Viveu o desafio</span><strong>{report.reflections.liveRate}%</strong></div>
        </div>
      </section>

      <section className="card">
        <h3>🤖 Uso da IA</h3>
        <div className="report-grid">
          <div><span>Total de perguntas</span><strong>{report.ai.totalQuestions}</strong></div>
          <div><span>Últimos 30 dias</span><strong>{report.ai.last30}</strong></div>
        </div>
      </section>
    </>
  );
}
