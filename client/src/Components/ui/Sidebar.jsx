import {
  FiHome,
  FiFilm,
  FiUsers,
  FiSettings,
  FiBarChart2,
  FiLogOut,
  FiX,
} from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { employeeLinks } from "../../utils/data";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden dark:bg-black/70"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`fixed top-0 left-0 z-50 h-screen transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex flex-col w-64 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 overflow-y-auto">
          <div className="flex items-center justify-between h-16 border-b border-gray-200 dark:border-gray-700 px-4 md:hidden">
            <h1 className="text-gray-800 dark:text-white font-bold text-xl">
              LeaveMs
            </h1>
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden md:flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-gray-800 dark:text-white font-bold text-xl">
              LeaveMs
            </h1>
          </div>
          <div className="flex flex-col flex-grow pt-5 pb-4">
            <div className="flex-1 px-4 space-y-1">
              {employeeLinks.map((link, i) => (
                <Link
                  key={i}
                  to={link.link}
                  onClick={onClose}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg w-full text-left transition-colors
                    ${
                      location.pathname === link.url
                        ? "bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-white"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    }`}
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleSignOut}
              className="flex items-center text-sm font-medium cursor-pointer text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white w-full transition-colors"
            >
              <FiLogOut className="mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
