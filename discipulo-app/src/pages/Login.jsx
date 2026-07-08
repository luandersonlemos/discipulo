import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Login() {
  const { signInWithEmail, signUpWithEmail, isConfigured } = useAuth();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);

    try {
      if (mode === "login") {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password, name);
        setMessage("Conta criada! Verifique seu e-mail se a confirmação estiver ativa no Supabase.");
      }
    } catch (submitError) {
      setError(submitError.message || "Não foi possível autenticar.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="app-shell center">
      <section className="card auth-card">
        <p className="label">Discípulo</p>
        <h1>{mode === "login" ? "Entrar" : "Criar conta"}</h1>
        <p className="muted">
          Seu companheiro diário de crescimento espiritual — com login e sincronização.
        </p>

        {!isConfigured && (
          <p className="warning">
            Supabase não configurado — o app funciona em modo local (dados no navegador).
            Para login na nuvem, copie <code>.env.example</code> para <code>.env</code>.
          </p>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === "signup" && (
            <label>
              Nome
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Seu nome"
                required
              />
            </label>
          )}

          <label>
            E-mail
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="voce@email.com"
              required
            />
          </label>

          <label>
            Senha
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Mínimo 6 caracteres"
              minLength={6}
              required
            />
          </label>

          {error && <p className="error">{error}</p>}
          {message && <p className="success">{message}</p>}

          <button type="submit" disabled={submitting || (!isConfigured && mode === "signup")}>
            {submitting ? "Aguarde..." : mode === "login" ? "Entrar" : "Criar conta"}
          </button>
        </form>

        <button
          type="button"
          className="link-button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login" ? "Ainda não tenho conta" : "Já tenho conta"}
        </button>
      </section>
    </div>
  );
}
