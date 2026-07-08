import { spiritualLevels } from "legacy:journey.js";
import { formatDate, formatMinutesLabel } from "../lib/format.js";
import {
  getAiHistory,
  getCompletedDays,
  getJournals,
  getPrayerSessions,
  getReflections,
  getSpiritualProgress
} from "../lib/storage.js";

const REFLECTION_LABELS = {
  yes: "Viveu o desafio",
  partial: "Viveu parcialmente",
  no: "Ainda não viveu o desafio"
};

export default function HistoryPage() {
  const completedDays = getCompletedDays();
  const journals = getJournals();
  const aiHistory = getAiHistory();
  const reflections = getReflections();
  const prayerSessions = getPrayerSessions();
  const spiritualProgress = getSpiritualProgress();

  const reflectionEntries = Object.entries(reflections)
    .map(([date, data]) => ({ type: "reflection", date, data }))
    .sort((a, b) => b.date.localeCompare(a.date));

  const entries = [];

  completedDays.slice().reverse().forEach((day) => {
    entries.push({
      key: `devotional-${day}`,
      text: `✅ Devocional concluído em ${formatDate(day)}`
    });
  });

  reflectionEntries.forEach(({ date, data }) => {
    entries.push({
      key: `reflection-${date}`,
      text: `🌙 ${formatDate(date)}: ${REFLECTION_LABELS[data.result] || "Reflexão salva"}`
    });
  });

  journals.forEach((journal) => {
    entries.push({
      key: `journal-${journal.date}-${journal.text.slice(0, 12)}`,
      text: `📝 ${formatDate(journal.date)}: ${journal.text}`
    });
  });

  prayerSessions.slice(0, 10).forEach((session) => {
    entries.push({
      key: `prayer-${session.id}`,
      text: `🙏 ${formatDate(session.date)}: ${formatMinutesLabel(session.durationSeconds)} de oração`
    });
  });

  spiritualProgress.slice(0, 10).forEach((entry) => {
    const topic = spiritualLevels
      .flatMap((level) => level.topics)
      .find((item) => item.id === entry.topicId);

    entries.push({
      key: `spiritual-${entry.topicId}-${entry.completedAt}`,
      text: `🌱 ${formatDate(entry.completedAt)}: ${topic?.title || "Tópico"} concluído`
    });
  });

  aiHistory.slice(0, 10).forEach((entry) => {
    entries.push({
      key: `ai-${entry.date}-${entry.question.slice(0, 12)}`,
      text: `💬 ${formatDate(entry.date)}: ${entry.question}`
    });
  });

  return (
    <section className="card">
      <h3>📚 Histórico</h3>
      <ul className="list-plain">
        {entries.length === 0 ? (
          <li className="list-item">Nenhum registro ainda.</li>
        ) : (
          entries.map((entry) => (
            <li key={entry.key} className="list-item">{entry.text}</li>
          ))
        )}
      </ul>
    </section>
  );
}
