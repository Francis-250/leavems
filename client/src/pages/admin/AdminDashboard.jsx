import { useState } from "react";
import Navbar from "../../Components/ui/Navbar";
import SidebarAdmin from "../../Components/ui/SidebarAdmin";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col flex-1 overflow md:ml-64">
      <SidebarAdmin
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex flex-col flex-1">
        <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      </div>
    </div>
  );
}
