import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";

export default function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 2200);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="app-shell splash">
      <Logo size="lg" />
      <p className="splash-tagline">Seu dinheiro, em movimento.</p>
      <div className="splash-actions">
        <button className="btn btn-primary btn-block" onClick={() => navigate("/login")}>
          Começar
        </button>
      </div>
    </div>
  );
}
