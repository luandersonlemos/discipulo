import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AI_DAILY_LIMIT,
  AI_SUGGESTIONS,
  askAi,
  getAiRemainingToday,
  getAiUsageToday
} from "../lib/ai.js";
import { getTodayDevotional, truncateText } from "../lib/devotional.js";
import { isPremium } from "../lib/subscription.js";
import {
  getTodayMomentSelection,
  hasTodayMomentChoice
} from "../lib/storage.js";

export default function AiPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("A resposta aparecerá aqui.");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState("");
  const [usageKey, setUsageKey] = useState(0);
  void usageKey;

  const premium = isPremium();
  const devotional = getTodayDevotional();
  const selection = getTodayMomentSelection();
  const remaining = getAiRemainingToday();
  const used = getAiUsageToday();

  const contextText = !hasTodayMomentChoice()
    ? "Comece o devocional de hoje para personalizar as respostas."
    : selection?.skipped
      ? `Devocional: ${devotional.title} — ${devotional.verse}`
      : `Você escreveu: "${truncateText(selection.userText, 80)}" · Devocional: ${devotional.title} — ${devotional.verse}`;

  async function handleAsk(questionText = question) {
    setError("");
    setLoading(true);

    try {
      const result = await askAi(questionText);
      setAnswer(result.answer);
      setSource(result.source === "openai" ? "IA real (OpenAI)" : "Modo local (simulado)");
      setQuestion("");
      setUsageKey((value) => value + 1);
    } catch (askError) {
      setError(askError.message);
    } finally {
      setLoading(false);
    }
  }

  const limitReached = !premium && remaining <= 0;

  return (
    <>
      <section className="card">
        <h3>💬 Pergunte sobre o devocional</h3>
        <p className="muted">Escreva uma dúvida sobre o texto, aplicação ou vida cristã.</p>
        <p className="ai-context muted">{contextText}</p>

        <div className="ai-usage">
          {premium ? (
            <>
              <span>Plano Premium</span>
              <strong>IA ilimitada ✨</strong>
            </>
          ) : (
            <>
              <span>Perguntas hoje: {used}/{AI_DAILY_LIMIT}</span>
              <strong>{remaining} restante(s)</strong>
            </>
          )}
        </div>

        {limitReached && (
          <p className="warning">
            Limite diário atingido. <Link to="/premium">Assine o Premium</Link> para IA ilimitada.
          </p>
        )}

        <textarea
          rows={3}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ex: O que significa permanecer na Palavra?"
          disabled={loading || limitReached}
        />
        <div className="ai-suggestions">
          {AI_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion.label}
              type="button"
              className="chip"
              disabled={loading || limitReached}
              onClick={() => handleAsk(suggestion.question)}
            >
              {suggestion.label}
            </button>
          ))}
        </div>
        {error && <p className="error">{error}</p>}
        <button type="button" disabled={loading || limitReached} onClick={() => handleAsk()}>
          {loading ? "Pensando..." : "Perguntar"}
        </button>
      </section>

      <section className="card">
        <h3>🤖 Resposta</h3>
        {source && <p className="muted small">Fonte: {source}</p>}
        <p className="ai-answer">{answer}</p>
      </section>
    </>
  );
}
