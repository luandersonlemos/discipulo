import { useAuth } from "../contexts/AuthContext.jsx";

export default function Home() {
  const { user, signOut } = useAuth();
  const displayName = user?.user_metadata?.name || user?.email || "Discípulo";

  return (
    <div className="app-shell">
      <header className="header">
        <div>
          <p className="label">Bem-vindo</p>
          <h1>Discípulo</h1>
        </div>
        <button type="button" className="btn-secondary header-btn" onClick={signOut}>
          Sair
        </button>
      </header>

      <main>
        <section className="card">
          <h2>Olá, {displayName} 👋</h2>
          <p className="muted">
            Esta é a base do app React + Supabase. O protótipo HTML continua na pasta raiz
            enquanto migramos as funcionalidades para cá.
          </p>
        </section>

        <section className="card">
          <h3>Próximas migrações</h3>
          <ul className="checklist">
            <li>Home / dashboard</li>
            <li>Devocional personalizado</li>
            <li>Bíblia, diário, oração e jornada</li>
            <li>Sincronização com Supabase</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
