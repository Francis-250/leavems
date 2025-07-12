import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import { calculateDuration, formatDate } from "../../utils/format";

export default function LeaveHistoryTable({ setShowAddModal }) {
  const [leave, setLeave] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/leave");
        if (!response.ok) {
          throw new Error("Failed to fetch Leave");
        }
        const data = await response.json();
        setLeave(data);
      } catch (error) {
        console.error("Error fetching Leaves:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeave();
  }, []);

  const filteredLeave = leave.filter(
    (item) =>
      item.leaveType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reason?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="rounded-lg shadow-sm mt-6 p-6 h-96 flex items-center justify-center bg-white border border-blue-200 dark:bg-gray-900 dark:border-gray-700">
        <p className="text-gray-800 dark:text-gray-200">
          Loading Product data...
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="rounded-lg shadow-sm mb-6 transition-colors duration-200 bg-white border border-blue-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search leave history..."
                  className="pl-10 pr-4 py-2 border rounded-lg outline-none hover:border-blue-200 w-full sm:w-64 transition-colors duration-200 bg-white border-gray-300 text-gray-900 placeholder-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 hover:shadow-md"
            >
              <FaPlus className="h-4 w-4" />
              Add Leave
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-lg shadow-sm overflow-hidden transition-colors duration-200 bg-white border border-blue-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
          {filteredLeave.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 text-lg">
                {searchTerm
                  ? "No leave records found matching your search."
                  : "No leave records found."}
              </div>
            </div>
          ) : (
            filteredLeave.map((leave, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-blue-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 overflow-hidden group hover:border-blue-300 dark:hover:border-gray-600 p-3"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 capitalize">
                    {leave.leaveType}
                  </h3>
                  <div className="flex items-center gap-1">
                    <button className="p-1 cursor-pointer text-blue-400">
                      <FaEdit />
                    </button>
                    <button className="p-1 text-red-600 cursor-pointer">
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="py-2 space-y-4">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <FaCalendarAlt className="w-4 h-4 text-blue-500" />
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="text-sm font-medium">
                        {formatDate(leave.startDate)}
                      </span>
                      <span className="hidden sm:block text-gray-400">→</span>
                      <span className="text-sm font-medium">
                        {formatDate(leave.endDate)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <FaClock className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">
                    {calculateDuration(leave.startDate, leave.endDate)} days
                  </span>
                </div>
                <div className="mt-3 border-t border-blue-100 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Reason:
                    </span>
                    {leave.reason}
                  </p>
                </div>
                <div className="px-6 mt-3 py-4 bg-gray-50 dark:bg-gray-900 border-t border-blue-200 dark:border-none rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Applied on {formatDate(leave.startDate)}
                    </span>
                    <div className="flex gap-2">
                      <p className="text-lg capitalize">{leave.status}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {filteredLeave.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Leave Summary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {
                  filteredLeave.filter(
                    (item) => item.status?.toLowerCase() === "approved"
                  ).length
                }
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">
                Approved
              </div>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {
                  filteredLeave.filter(
                    (item) => item.status?.toLowerCase() === "pending"
                  ).length
                }
              </div>
              <div className="text-sm text-yellow-700 dark:text-yellow-300">
                Pending
              </div>
            </div>
            <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {
                  filteredLeave.filter(
                    (item) => item.status?.toLowerCase() === "rejected"
                  ).length
                }
              </div>
              <div className="text-sm text-red-700 dark:text-red-300">
                Rejected
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
