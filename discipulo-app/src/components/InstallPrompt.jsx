import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isPremium } from "../lib/subscription.js";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [dismissed, setDismissed] = useState(
    localStorage.getItem("pwaInstallDismissed") === "true"
  );
  const [isInstalled, setIsInstalled] = useState(
    window.matchMedia("(display-mode: standalone)").matches
  );

  useEffect(() => {
    function handleBeforeInstall(event) {
      event.preventDefault();
      setDeferredPrompt(event);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
  }

  function dismiss() {
    localStorage.setItem("pwaInstallDismissed", "true");
    setDismissed(true);
  }

  if (isInstalled || dismissed || !deferredPrompt) {
    return null;
  }

  return (
    <section className="card install-banner">
      <div>
        <strong>📲 Instale o Discípulo</strong>
        <p className="muted small">Acesse como app no celular — mais rápido e com ícone na tela inicial.</p>
      </div>
      <div className="install-actions">
        <button type="button" onClick={handleInstall}>Instalar</button>
        <button type="button" className="btn-secondary" onClick={dismiss}>Agora não</button>
      </div>
    </section>
  );
}

export function PremiumBadge() {
  if (!isPremium()) {
    return (
      <Link to="/premium" className="premium-badge premium-badge--free">
        ⭐ Premium
      </Link>
    );
  }

  return (
    <span className="premium-badge premium-badge--active">✨ Premium</span>
  );
}
