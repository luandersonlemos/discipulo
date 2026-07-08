import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout.jsx";
import SplashPage from "./pages/SplashPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import StatementPage from "./pages/StatementPage.jsx";
import PixPage from "./pages/PixPage.jsx";
import CardPage from "./pages/CardPage.jsx";
import InvestmentsPage from "./pages/InvestmentsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/extrato" element={<StatementPage />} />
        <Route path="/pix" element={<PixPage />} />
        <Route path="/cartao" element={<CardPage />} />
        <Route path="/investimentos" element={<InvestmentsPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
