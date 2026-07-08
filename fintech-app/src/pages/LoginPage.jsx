import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/home");
  }

  return (
    <div className="app-shell login-page">
      <div className="login-header">
        <Logo />
        <h1 className="login-title" style={{ marginTop: 32 }}>
          Bem-vinda de volta
        </h1>
        <p className="login-subtitle">Acesse sua conta Verdex</p>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label" htmlFor="email">
            E-mail ou CPF
          </label>
          <input
            id="email"
            className="input"
            type="text"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="password">
            Senha
          </label>
          <input
            id="password"
            className="input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary btn-block" type="submit">
          Entrar
        </button>

        <p className="login-footer">
          Projeto de portfólio — qualquer credencial funciona
        </p>
      </form>
    </div>
  );
}
