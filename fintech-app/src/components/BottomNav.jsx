import { NavLink } from "react-router-dom";

const items = [
  { to: "/home", label: "Início", icon: "⌂" },
  { to: "/extrato", label: "Extrato", icon: "☰" },
  { to: "/pix", label: "PIX", icon: "◈" },
  { to: "/cartao", label: "Cartão", icon: "▭" },
  { to: "/perfil", label: "Perfil", icon: "○" }
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
        >
          <span className="nav-item-icon">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
