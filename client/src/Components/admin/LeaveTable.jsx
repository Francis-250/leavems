import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import { calculateDuration, formatDate } from "../../utils/format";
import axios from "axios";

export default function LeaveEmployeeTable() {
  const [leave, setLeave] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingStatus, setEditingStatus] = useState(null);

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

  const handleStatusChange = async (leaveId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/leave/${leaveId}`, {
        status: newStatus,
      });
      setLeave((prevLeave) =>
        prevLeave.map((item) =>
          item._id === leaveId ? { ...item, status: newStatus } : item
        )
      );

      toast.success("Leave status updated successfully");
    } catch (error) {
      console.error("Error updating leave status:", error);
      toast.error("Failed to update leave status");
    } finally {
      setEditingStatus(null);
    }
  };

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
          Loading Leave data...
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
          </div>
        </div>
      </div>

      <div className="rounded-lg shadow-sm overflow-hidden transition-colors duration-200 bg-white border border-blue-200 dark:bg-gray-900 dark:border-gray-700">
        {filteredLeave.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 text-lg">
              {searchTerm
                ? "No Leave records found matching your search."
                : "No Leave records found."}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-blue-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    leaveType
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="w-3 h-3" />
                      startDate
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="w-3 h-3" />
                      EndDate
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-blue-200 dark:divide-gray-700">
                {filteredLeave.map((leaveItem, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">
                        {leaveItem.leaveType}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(leaveItem.startDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(leaveItem.endDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowra">
                      {calculateDuration(
                        leaveItem.startDate,
                        leaveItem.endDate
                      )}{" "}
                      days
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingStatus === leaveItem._id ? (
                        <select
                          defaultValue={leaveItem.status}
                          onChange={(e) =>
                            handleStatusChange(leaveItem._id, e.target.value)
                          }
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                          autoFocus
                          onBlur={() => setEditingStatus(null)}
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      ) : (
                        <div
                          className={`text-sm font-medium capitalize px-2 py-1 rounded-full inline-flex items-center cursor-pointer ${
                            leaveItem.status === "approved"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : leaveItem.status === "rejected"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          }`}
                          onClick={() => setEditingStatus(leaveItem._id)}
                        >
                          {leaveItem.status}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
