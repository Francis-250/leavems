import { useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const { isDark, setIsDark } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "");
  }, [isDark]);

  return (
    <button
      className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
      onClick={() => setIsDark(!isDark)}
    >
      {!isDark ? (
        <FaMoon className="text-gray-700 dark:text-yellow-300" />
      ) : (
        <FaSun className="text-gray-700 dark:text-yellow-300" />
      )}
    </button>
  );
}
