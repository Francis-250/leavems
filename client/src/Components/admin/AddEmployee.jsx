import axios from "axios";
import React, { useState } from "react";
import { FiX, FiUser, FiMail, FiBriefcase, FiCalendar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function AddEmployee({ setShowAddModal, showAddModal }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [hireDate, setHireDate] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const values = { firstName, lastName, email, department, position, hireDate };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post("http://localhost:5000/api/employees", values);
      setShowAddModal(false);
      navigate("/admin/employees");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error || "Failed to add employee");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="rounded-xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-y-auto bg-white dark:bg-gray-900 dark:border dark:border-gray-700 transition-colors duration-200">
        <div className="sticky top-0 z-10 border-b p-6 flex justify-between items-center bg-white dark:bg-gray-900 dark:border-gray-700 transition-colors duration-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-200">
              Add New Employee
            </h2>
            <p className="text-sm mt-1 text-gray-500 dark:text-gray-400 transition-colors duration-200">
              Fill in the employee details
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(!showAddModal)}
            className="p-1 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label="Close"
          >
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center text-gray-700 dark:text-gray-300 transition-colors duration-200">
                <FiUser className="mr-2 text-blue-500" />
                First Name*
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg outline-none transition-all duration-200 border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 "
                required
                placeholder="Enter first name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center text-gray-700 dark:text-gray-300 transition-colors duration-200">
                <FiUser className="mr-2 text-blue-500" />
                Last Name*
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg outline-none transition-all duration-200 border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 "
                required
                placeholder="Enter last name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center text-gray-700 dark:text-gray-300 transition-colors duration-200">
                <FiMail className="mr-2 text-blue-500" />
                Email*
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg outline-none transition-all duration-200 border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 "
                required
                placeholder="Enter email address"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center text-gray-700 dark:text-gray-300 transition-colors duration-200">
                <FiBriefcase className="mr-2 text-blue-500" />
                Department*
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg outline-none transition-all duration-200 border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500  appearance-none"
                required
              >
                <option value="">Select department</option>
                <option value="HR">HR</option>
                <option value="Engineering">Engineering</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center text-gray-700 dark:text-gray-300 transition-colors duration-200">
                <FiBriefcase className="mr-2 text-blue-500" />
                Position*
              </label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg outline-none transition-all duration-200 border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 "
                required
                placeholder="Enter job position"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center text-gray-700 dark:text-gray-300 transition-colors duration-200">
                <FiCalendar className="mr-2 text-blue-500" />
                Hire Date*
              </label>
              <input
                type="date"
                value={hireDate}
                onChange={(e) => setHireDate(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg outline-none transition-all duration-200 border-gray-300 dark:border-gray-600 dark:bg-gray-800 text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 "
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-700 transition-colors duration-200">
            <button
              type="button"
              onClick={() => setShowAddModal(!showAddModal)}
              className="px-5 py-2.5 rounded-lg transition-colors font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium flex items-center gap-2 disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              disabled={isSubmitting}
            >
              {isSubmitting ? <>Adding...</> : "Add Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
