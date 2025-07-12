import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function Status({ title, value }) {
  return (
    <div className="rounded-lg shadow-sm p-6 transition-all duration-200 hover:shadow-md bg-white border border-blue-200 hover:border-blue-300 dark:bg-gray-900 dark:border-gray-700 dark:hover:border-gray-600">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium transition-colors duration-200 text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-3xl font-bold mt-2 transition-colors duration-200 text-gray-900 dark:text-gray-100">
            {value}
          </p>
          <div className="flex items-center mt-3">
            <span className="text-sm ml-2 transition-colors duration-200 text-gray-500">
              Last month
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
