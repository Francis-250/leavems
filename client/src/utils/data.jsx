import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiFileText,
  FiPieChart,
  FiList,
} from "react-icons/fi";

export const adminLinks = [
  {
    name: "Employee Dashboard",
    link: "/",
    icon: <FiHome className="mr-3" />,
  },
  {
    name: "Leave Requests",
    link: "/admin",
    icon: <FiFileText className="mr-3" />,
  },
  {
    name: "Employee",
    link: "/admin/employees",
    icon: <FiUsers className="mr-3" />,
  },
];

export const employeeLinks = [
  {
    name: "Admin",
    link: "/",
    icon: <FiHome className="mr-3" />,
  },
  {
    name: "My Leaves",
    link: "/leaves",
    icon: <FiList className="mr-3" />,
  },
];

export const metrics = [
  {
    title: "Pending Approvals",
    value: "3",
  },
  {
    title: "Approved This Month",
    value: "5",
  },
  {
    title: "Rejected Requests",
    value: "1",
  },
];
