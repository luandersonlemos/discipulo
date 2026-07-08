import { useState } from "react";
import QrCode from "../components/QrCode.jsx";
import { formatCurrency } from "../lib/format.js";
import { recentContacts, user } from "../lib/mockData.js";

export default function PixPage() {
  const [mode, setMode] = useState("send");
  const [step, setStep] = useState("contacts");
  const [amount, setAmount] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleSelectContact(contact) {
    setSelectedContact(contact);
    setStep("amount");
  }

  function handleConfirm() {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setStep("contacts");
      setAmount("");
      setSelectedContact(null);
    }, 2500);
  }

  async function handleCopyKey() {
    try {
      await navigator.clipboard.writeText(user.pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  if (success) {
    return (
      <div className="success-overlay">
        <div className="success-icon">✓</div>
        <h2 className="success-title">PIX enviado!</h2>
        <p className="success-message">
          {formatCurrency(Number(amount))} para {selectedContact?.name}
        </p>
      </div>
    );
  }

  return (
    <>
      <header className="page-header">
        <div>
          <h1 className="page-title">PIX</h1>
          <p className="page-subtitle">
            {mode === "receive"
              ? "Receber pagamento"
              : step === "contacts"
                ? "Enviar para"
                : `Para ${selectedContact?.name}`}
          </p>
        </div>
        {mode === "send" && step === "amount" && (
          <button className="btn-ghost" type="button" onClick={() => setStep("contacts")}>
            Voltar
          </button>
        )}
      </header>

      <div className="app-content">
        <div className="pix-tabs">
          <button
            type="button"
            className={`pix-tab${mode === "send" ? " active" : ""}`}
            onClick={() => {
              setMode("send");
              setStep("contacts");
            }}
          >
            Enviar
          </button>
          <button
            type="button"
            className={`pix-tab${mode === "receive" ? " active" : ""}`}
            onClick={() => setMode("receive")}
          >
            Receber
          </button>
        </div>

        {mode === "receive" && (
          <div className="pix-receive">
            <div className="qr-wrapper">
              <QrCode value={user.pixKey} size={220} />
            </div>
            <p className="qr-hint">Escaneie para pagar {user.firstName}</p>

            <div className="card pix-key-card">
              <p className="text-sm text-muted">Chave PIX</p>
              <p className="pix-key-value">{user.pixKey}</p>
              <button className="btn btn-secondary btn-block mt-4" type="button" onClick={handleCopyKey}>
                {copied ? "Chave copiada!" : "Copiar chave"}
              </button>
            </div>
          </div>
        )}

        {mode === "send" && step === "contacts" && (
          <div className="contact-list">
            {recentContacts.map((contact) => (
              <button
                key={contact.id}
                type="button"
                className="contact-item"
                style={{ width: "100%", textAlign: "left" }}
                onClick={() => handleSelectContact(contact)}
              >
                <div className="contact-avatar">{contact.initials}</div>
                <div>
                  <p className="contact-name">{contact.name}</p>
                  <p className="contact-key">{contact.key}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {mode === "send" && step === "amount" && (
          <div className="pix-step">
            <div className="pix-amount-display">
              <p className="pix-amount-value">
                {amount ? formatCurrency(Number(amount)) : "R$ 0,00"}
              </p>
              <p className="pix-amount-currency">Digite o valor</p>
            </div>

            <div className="input-group">
              <input
                className="input"
                type="number"
                placeholder="0,00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="0.01"
                autoFocus
              />
            </div>

            <button
              className="btn btn-primary btn-block"
              type="button"
              disabled={!amount || Number(amount) <= 0}
              onClick={handleConfirm}
            >
              Confirmar PIX
            </button>
          </div>
        )}
      </div>
    </>
  );
}
