import { useState } from "react";
import ProgressBarChart from "../ProgressBarChart";
import "./index.css";
import { Link } from "react-router-dom";
import LogoutConfirm from "../LogoutConfirm";

const Sidebar = () => {
  const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);

    const progressData = {
  education: 100,
  experience: 100,
  personalDetails: 100,
  projects: 100,
  skills: 60,
};
  return (
    <aside className="cvb-sidebar">
      <div className="cvb-sidebar-logo"><img src="/logo.png" className="cvb-sidebar-logo-img" alt="CV Builder Logo"/>Builder</div>
      <nav className="cvb-sidebar-nav">
        <Link to="/dashboard" className="cvb-sidebar-nav-link">My CVs</Link>
        <Link to="/dashboard/templates" className="cvb-sidebar-nav-link">Templates</Link>
        <Link to="/dashboard/details" className="cvb-sidebar-nav-link">CV Details</Link>
        <Link to="/dashboard/settings" className="cvb-sidebar-nav-link">Settings</Link>
      </nav>
      <ProgressBarChart data={progressData} />
        <button onClick={() => setOpenLogoutConfirm(true)} className="cvb-sidebar-nav-logout-button">Logout</button>
      {openLogoutConfirm && <LogoutConfirm onClose={() => setOpenLogoutConfirm(false)} />}
    </aside>
  );
}

export default Sidebar;