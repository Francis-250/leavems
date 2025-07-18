import { useState } from "react";
import Navbar from "../../Components/ui/Navbar";
import SidebarAdmin from "../../Components/ui/SidebarAdmin";
import LeaveTable from "../../Components/admin/LeaveTable";

export default function Leave() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col flex-1 overflow md:ml-64">
      <SidebarAdmin
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex flex-col flex-1">
        <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="my-5 px-3">
          <LeaveTable />
        </div>
      </div>
    </div>
  );
}
