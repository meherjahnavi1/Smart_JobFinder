// src/components/DashboardSidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaRegFileAlt, FaRegComments, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';

function DashboardSidebar() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/dashboard' },
    { name: 'Documents', icon: <FaRegFileAlt />, path: '/documents' },
    { name: 'Resume Builder', icon: <FaRegComments />, path: 'https://cv-builder.bedatatech.com/' }, // ✅ updated path
    { name: 'Logout', icon: <FaSignOutAlt />, path: '/logout' },
  ];

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path.split('?')[0]);

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-md z-40 flex flex-col py-6 px-4">
      <h2 className="text-xl font-bold text-purple-700 mb-8 text-center">JobFinder</h2>
      <nav className="flex-1 space-y-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center space-x-3 py-2 px-3 rounded-lg text-sm font-medium ${
              isActive(item.path)
                ? 'bg-purple-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default DashboardSidebar;
