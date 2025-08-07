import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import { formatDate } from "../../utils/format";
import { url } from "../../assets/asset";

export default function EmployeeTable({ setShowAddModal }) {
  const [emp, setEmp] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const BASE_URL = url;

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/employees`);
        setEmp(response.data);
      } catch (error) {
        console.error("Error fetching employee:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, []);

  const filteredEmployee = emp.filter(
    (item) =>
      item.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${employeeId}`);
      toast.success("Employee deleted successfully");
      const response = await axios.get("http://localhost:5000/api/employees");
      setEmp(response.data);
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee");
    }
  };

  if (loading) {
    return (
      <div className="rounded-lg shadow-sm mt-6 p-6 h-96 flex items-center justify-center bg-white border border-blue-200 dark:bg-gray-900 dark:border-gray-700">
        <p className="text-gray-800 dark:text-gray-200">
          Loading Employees data...
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
                  placeholder="Search emp history..."
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
              Add Employee
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-lg shadow-sm overflow-hidden transition-colors duration-200 bg-white border border-blue-200 dark:bg-gray-900 dark:border-gray-700">
        {filteredEmployee.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 text-lg">
              {searchTerm
                ? "No empoloyee records found matching your search."
                : "No empoloyee records found."}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-blue-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    FirstName
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="w-3 h-3" />
                      Last Name
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="w-3 h-3" />
                      Email
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FaClock className="w-3 h-3" />
                      Department
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    HireDate
                  </th>

                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-blue-200 dark:divide-gray-700">
                {filteredEmployee.map((emp, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">
                        {emp.firstName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {emp.lastname}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {emp.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {emp.department}
                    </td>
                    <td className="px-6 py-4  whitespace-nowra">
                      {emp.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(emp.hireDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center items-center gap-2">
                        
                        <button
                          onClick={() => handleDelete(emp._id)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-gray-700 rounded-full transition-all duration-200"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
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
