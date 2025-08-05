// src/components/DashboardSidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBriefcase,
  FaRegComments,
  FaBrain,
  FaRegFileAlt,
  FaGift,
  FaBell,
  FaTabletAlt,
  FaQuestionCircle,
  FaCog,
} from "react-icons/fa";

function DashboardSidebar() {
  const location = useLocation();

  const topNav = [
    { name: "Jobs", icon: <FaBriefcase />, path: "/dashboard" },
    {
      name: "Resume Builder",
      icon: <FaRegComments />,
      path: "https://cv-builder.bedatatech.com/",
      external: true,
    },
    { name: "Interview Prep", icon: <FaBrain />, path: "/interview-prep" },
    { name: "Documents", icon: <FaRegFileAlt />, path: "/documents" },
  ];

  const bottomNav = [
    { icon: <FaGift />, path: "/rewards" },
    { icon: <FaBell />, path: "/notifications" },
    { icon: <FaTabletAlt />, path: "/devices" },
    { icon: <FaQuestionCircle />, path: "/help" },
    { icon: <FaCog />, path: "/settings" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="fixed top-0 left-0 h-screen w-20 bg-white flex flex-col justify-between items-center py-6 shadow-md z-50">
      {/* Top navigation */}
      <div className="space-y-6">
        {topNav.map((item) =>
          item.external ? (
            <a
              key={item.name}
              href={item.path}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center text-xs text-black hover:text-green-600"
            >
              <div className="text-xl">{item.icon}</div>
              <span className="mt-1 text-[13px] font-medium">{item.name}</span>
            </a>
          ) : (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center text-xs ${
                isActive(item.path)
                  ? "bg-green-50 rounded-xl px-3 py-2 text-black"
                  : "text-black hover:text-green-600"
              }`}
            >
              <div className="text-xl">{item.icon}</div>
              <span className="mt-1 text-[13px] font-medium">{item.name}</span>
            </Link>
          )
        )}
      </div>

      {/* Bottom icons */}
      <div className="flex flex-col items-center gap-6">
        {bottomNav.map((item, idx) => (
          <Link key={idx} to={item.path} className="text-xl text-black hover:text-green-600">
            {item.icon}
          </Link>
        ))}
      </div>
    </aside>
  );
}

export default DashboardSidebar;