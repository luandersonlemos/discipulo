import { useNavigate } from "react-router-dom";
import { formatCpf } from "../lib/format.js";
import { user } from "../lib/mockData.js";

const menuItems = [
  { icon: "◈", label: "Minhas chaves PIX", to: "/pix" },
  { icon: "◎", label: "Investimentos", to: "/investimentos" },
  { icon: "⚙", label: "Configurações" },
  { icon: "?", label: "Ajuda" },
  { icon: "↪", label: "Sair", action: "logout" }
];

export default function ProfilePage() {
  const navigate = useNavigate();

  function handleMenuClick(item) {
    if (item.action === "logout") {
      navigate("/");
      return;
    }
    if (item.to) {
      navigate(item.to);
    }
  }

  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Perfil</h1>
      </header>

      <div className="app-content">
        <div className="profile-header">
          <div className="profile-avatar">{user.avatarInitials}</div>
          <p className="profile-name">{user.name}</p>
          <p className="profile-email">{user.email}</p>
          <p className="text-muted text-sm" style={{ marginTop: 4 }}>
            CPF {formatCpf(user.cpf)}
          </p>
        </div>

        <div className="card mb-4">
          <p className="text-sm text-muted">Chave PIX principal</p>
          <p className="text-green" style={{ marginTop: 4, fontWeight: 500 }}>
            {user.pixKey}
          </p>
        </div>

        <div className="menu-list">
          {menuItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className="menu-item"
              style={{ width: "100%" }}
              onClick={() => handleMenuClick(item)}
            >
              <div className="menu-item-left">
                <span className="menu-item-icon">{item.icon}</span>
                <span className="menu-item-label">{item.label}</span>
              </div>
              <span className="menu-item-arrow">›</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
