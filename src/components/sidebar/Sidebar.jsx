import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as LogoIcon } from "../../assets/icons/logo.svg";
import { ReactComponent as DashboardIcon } from "../../assets/icons/dashboard.svg";
import { ReactComponent as UserIcon } from "../../assets/icons/users.svg";
import { ReactComponent as ProjectIcon } from "../../assets/icons/projects.svg";
import { ReactComponent as CategoryIcon } from "../../assets/icons/categories.svg";
import { ReactComponent as SettingsIcon } from "../../assets/icons/settings.svg";
import { ReactComponent as TeamIcon } from "../../assets/icons/team.svg";
import { ReactComponent as AccountIcon } from "../../assets/icons/account.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/closesm.svg";

function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getNavLinkClass = ({ isActive }) =>
    `flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300 dark:hover:bg-gray-300 dark:hover:text-gray-700 transition-colors duration-150 ${
      isActive
        ? "bg-gray-700 text-gray-300 dark:text-gray-700 dark:bg-gray-300"
        : "text-gray-600 dark:text-gray-400"
    }`;
  return (
    <>
      {!isMenuOpen && (
        <button
          className={`fixed top-4 left-4 z-50 p-2 text-gray-800 bg-white rounded-md lg:hidden ${
            !isMenuOpen && "shadow-menu-glow"
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      )}
      <div
        className={`
          fixed top-0 left-0 w-60 h-full
          overflow-y-auto
          z-40 
          bg-[rgb(247,247,247)] 
          dark:bg-gray-700
          shadow-lg 
          pt-5 
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:flex lg:flex-col lg:shadow-none
        `}
      >
        {isMenuOpen && (
          <button
            className={`absolute top-5 right-3 z-50 p-1 text-red-800 bg-white rounded-md lg:hidden ${
              isMenuOpen && "shadow-red-glow"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        )}
        <div className="flex flex-col w-full h-full text-gray-800">
          <NavLink
            className="flex items-center w-full px-5 pb-5 border-gray-200"
            to="/"
          >
            <LogoIcon className="w-8 h-8 text-green-600" />
            <span className="ml-2 text-xl font-bold dark:text-gray-400">
              The App
            </span>
          </NavLink>
          <NavLink className={getNavLinkClass} to="/">
            <DashboardIcon className="w-6 h-6" />
            <span className="ml-2 text-sm font-medium">Dashboard</span>
          </NavLink>
          <NavLink className={getNavLinkClass} to="/users">
            <UserIcon className="w-6 h-6" />
            <span className="ml-2 text-sm font-medium">Users</span>
          </NavLink>
          <NavLink className={getNavLinkClass} to="/projects">
            <ProjectIcon className="w-6 h-6" />
            <span className="ml-2 text-sm font-medium">Projects</span>
          </NavLink>
          <NavLink className={getNavLinkClass} to="/departments">
            <SettingsIcon className="w-6 h-6" />

            <span className="ml-2 text-sm font-medium">Departments</span>
          </NavLink>
          <NavLink className={getNavLinkClass} to="/teams">
            <TeamIcon className="w-6 h-6" />
            <span className="ml-2 text-sm font-medium">Teams</span>
          </NavLink>
        </div>
        <NavLink
          className="flex items-center w-full h-16 px-5 mt-auto bg-gray-100 hover:bg-gray-200 text-gray-600 transition duration-150 ease-in-out"
          to="#"
        >
          <AccountIcon className="w-6 h-6" />
          <span className="ml-2 text-sm font-medium">Account</span>
        </NavLink>
      </div>
      {/* overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-20 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}

export default Sidebar;
