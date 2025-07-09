import { useNavigate } from "react-router-dom";
import { FiSearch, FiMenu } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import { useAuth, UserButton } from "@clerk/clerk-react";

export default function Navbar({ onMenuToggle }) {
  const navigate = useNavigate();

  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null;
  }
  return (
    <div>
      <header className="flex items-center justify-between h-16 p-2 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 px-4 md:px-6 sticky top-0 z-10">
        <div className="flex items-center">
          <button
            onClick={onMenuToggle}
            className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mr-4 focus:outline-none"
          >
            <FiMenu />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100 hidden md:block">
            Leave Mangment System
          </h1>
        </div>
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 outline-none sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <div className="relative">
            {isSignedIn ? (
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "h-8 w-8",
                    userButtonBox: "flex items-center space-x-2",
                    userButtonOuterIdentifier:
                      "hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-200",
                  },
                }}
              />
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-200">
                  Sign In
                </span>
              </button>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
