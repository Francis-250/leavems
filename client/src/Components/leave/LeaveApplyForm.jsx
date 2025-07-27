import React, { useState } from "react";
import axios from "axios";
import { FiX, FiCalendar, FiClock, FiEdit, FiInfo } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { url } from "../../assets/asset";

export default function LeaveApplyForm({ setShowAddModal, showAddModal }) {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const values = { leaveType, startDate, endDate, reason };
  const navigate = useNavigate();

  const BASE_URL = url;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    try {
      await axios.post(`${BASE_URL}/leave`, values);
      setIsSubmitting(false);
      navigate("/leaves");
    } catch (error) {
      console.log(error);
      setIsSubmitting(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="rounded-xl shadow-2xl w-full max-w-4xl min-h-[95vh] overflow-y-auto bg-white dark:bg-gray-900 dark:border dark:border-gray-700 transition-colors duration-200">
        <div className="sticky top-0 z-10 border-b p-6 flex justify-between items-center bg-white dark:bg-gray-900 dark:border-gray-700 transition-colors duration-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-200">
              Apply for Leave
            </h2>
            <p className="text-sm mt-1 text-gray-500 dark:text-gray-400 transition-colors duration-200">
              Fill in your leave request details
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(!showAddModal)}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors hover:bg-gray-100/10"
            aria-label="Close"
          >
            <FiX size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium flex items-center text-gray-700 dark:text-gray-300 transition-colors duration-200">
                  <FiCalendar className="mr-2 text-blue-500" />
                  Leave Type*
                </label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="w-full px-4 py-2.5 border rounded-lg outline-none transition-all duration-200 border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-gray-700 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 "
                  required
                >
                  <option value="">Select leave type</option>
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Personal Leave">Personal Leave</option>
                  <option value="Maternity/Paternity">
                    Maternity/Paternity
                  </option>
                  <option value="Unpaid Leave">Unpaid Leave</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium flex items-center text-gray-700 dark:text-gray-300 transition-colors duration-200">
                  <FiCalendar className="mr-2 text-blue-500" />
                  Start Date*
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2.5 border rounded-lg outline-none transition-all duration-200 border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-gray-700 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 "
                  required
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium flex items-center text-gray-700 dark:text-gray-300 transition-colors duration-200">
                  <FiCalendar className="mr-2 text-blue-500" />
                  End Date*
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2.5 border rounded-lg outline-none transition-all duration-200 border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-gray-700 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 "
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium flex items-center text-gray-700 dark:text-gray-300 transition-colors duration-200">
                  <FiClock className="mr-2 text-blue-500" />
                  Duration
                </label>
                <input
                  type="text"
                  value={
                    startDate && endDate
                      ? `${
                          Math.floor(
                            (new Date(endDate) - new Date(startDate)) /
                              (1000 * 60 * 60 * 24)
                          ) + 1
                        } days`
                      : ""
                  }
                  readOnly
                  className="w-full px-4 py-2.5 border rounded-lg outline-none transition-all duration-200 border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-gray-700 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-gray-50 dark:bg-gray-700/50"
                />
              </div>
            </div>
          </div>
          <div className="rounded-xl p-4 mb-6 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-200">
            <h3 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300 transition-colors duration-200">
              Additional Information
            </h3>
            <div className="space-y-1">
              <label className="text-sm font-medium flex items-center text-gray-700 dark:text-gray-300 transition-colors duration-200">
                <FiEdit className="mr-2 text-blue-500" />
                Reason for Leave
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-2.5 border resize-none rounded-lg outline-none transition-all duration-200 h-24 border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-gray-700 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 "
                placeholder="Brief reason for your leave request"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700 transition-colors duration-200">
            <button
              type="button"
              onClick={() => setShowAddModal(!showAddModal)}
              className="px-5 py-2.5 rounded-lg transition-colors font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium flex items-center gap-2 disabled:opacity-70"
              disabled={isSubmitting}
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
