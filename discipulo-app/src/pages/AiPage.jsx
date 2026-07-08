import { useEffect, useRef, useState } from "react";
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
  clearChatSession,
  getChatSession,
  getTodayMomentSelection,
  hasTodayMomentChoice
} from "../lib/storage.js";

export default function AiPage() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState(() => getChatSession());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState("");
  const [usageKey, setUsageKey] = useState(0);
  const chatEndRef = useRef(null);
  void usageKey;

  const premium = isPremium();
  const devotional = getTodayDevotional();
  const selection = getTodayMomentSelection();
  const remaining = getAiRemainingToday();
  const used = getAiUsageToday();

  const contextText = !hasTodayMomentChoice()
    ? "Comece o devocional de hoje para personalizar a conversa."
    : selection?.skipped
      ? `Devocional: ${devotional.title} — ${devotional.verse}`
      : `Você escreveu: "${truncateText(selection.userText, 80)}" · Devocional: ${devotional.title}`;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleAsk(questionText = question) {
    setError("");
    setLoading(true);

    try {
      const result = await askAi(questionText);
      setMessages(getChatSession());
      setSource(result.source === "openai" ? "IA real (OpenAI)" : "Modo local (simulado)");
      setQuestion("");
      setUsageKey((value) => value + 1);
    } catch (askError) {
      setError(askError.message);
    } finally {
      setLoading(false);
    }
  }

  function handleClearChat() {
    clearChatSession();
    setMessages([]);
    setSource("");
  }

  const limitReached = !premium && remaining <= 0;

  return (
    <>
      <section className="card">
        <h3>💬 Converse sobre o devocional</h3>
        <p className="muted">Uma conversa, não respostas prontas. A IA acompanha o que você está vivendo.</p>
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

        <div className="chat-thread">
          {messages.length === 0 && (
            <p className="muted chat-empty">
              Nenhuma mensagem ainda. Comece perguntando sobre o devocional ou compartilhe o que está sentindo.
            </p>
          )}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-bubble ${message.role === "user" ? "chat-bubble-user" : "chat-bubble-assistant"}`}
            >
              <span className="chat-role">{message.role === "user" ? "Você" : "Discípulo IA"}</span>
              <p>{message.content}</p>
            </div>
          ))}
          {loading && (
            <div className="chat-bubble chat-bubble-assistant">
              <span className="chat-role">Discípulo IA</span>
              <p className="muted">Pensando...</p>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {source && <p className="muted small">Fonte: {source}</p>}

        <textarea
          rows={3}
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ex: Isso faz sentido para o que estou passando? Como aplico isso hoje?"
          disabled={loading || limitReached}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              if (!loading && !limitReached && question.trim()) {
                handleAsk();
              }
            }
          }}
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
        <div className="chat-actions">
          <button type="button" disabled={loading || limitReached} onClick={() => handleAsk()}>
            {loading ? "Enviando..." : "Enviar"}
          </button>
          {messages.length > 0 && (
            <button type="button" className="btn-secondary" disabled={loading} onClick={handleClearChat}>
              Limpar conversa
            </button>
          )}
        </div>
      </section>
    </>
  );
}
