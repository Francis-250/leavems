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
    name: "Dashboard",
    link: "/admin",
    icon: <FiHome className="mr-3" />,
  },
  {
    name: "Leave Requests",
    link: "/admin/leave",
    icon: <FiFileText className="mr-3" />,
  },
  {
    name: "Employee Management",
    link: "/admin/employees",
    icon: <FiUsers className="mr-3" />,
  },
  {
    name: "Reports",
    link: "/admin/reports",
    icon: <FiPieChart className="mr-3" />,
  },
  {
    name: "Holiday Calendar",
    link: "/admin/holidays",
    icon: <FiCalendar className="mr-3" />,
  },
];

export const employeeLinks = [
  {
    name: "Dashboard",
    link: "/",
    icon: <FiHome className="mr-3" />,
  },
  {
    name: "My Leaves",
    link: "/leaves",
    icon: <FiList className="mr-3" />,
  },
  {
    name: "Holidays",
    link: "/holidays",
    icon: <FiCalendar className="mr-3" />,
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
