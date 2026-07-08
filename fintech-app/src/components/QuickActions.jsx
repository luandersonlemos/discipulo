import { Link } from "react-router-dom";

const actions = [
  { to: "/pix", label: "PIX", icon: "◈" },
  { to: "/cartao", label: "Cartão", icon: "▭" },
  { to: "/investimentos", label: "Investir", icon: "◎" },
  { to: "/extrato", label: "Extrato", icon: "☰" }
];

export default function QuickActions() {
  return (
    <div className="quick-actions">
      {actions.map((action) => (
        <Link key={action.label} to={action.to} className="quick-action">
          <div className="quick-action-icon">{action.icon}</div>
          <span className="quick-action-label">{action.label}</span>
        </Link>
      ))}
    </div>
  );
}
