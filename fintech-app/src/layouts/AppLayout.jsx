import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottomNav.jsx";
import PageTransition from "../components/PageTransition.jsx";

export default function AppLayout() {
  return (
    <div className="app-shell">
      <PageTransition>
        <Outlet />
      </PageTransition>
      <BottomNav />
    </div>
  );
}
