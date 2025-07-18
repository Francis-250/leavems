import { useState } from "react";
import Navbar from "../../Components/ui/Navbar";
import SidebarAdmin from "../../Components/ui/SidebarAdmin";
import { metrics } from "../../utils/data";
import Status from "../../Components/ui/Status";

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
        <div className="my-8 px-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {metrics.map((metric, index) => (
              <Status key={index} title={metric.title} value={metric.value} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
