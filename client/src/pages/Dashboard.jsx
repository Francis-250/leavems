import { useState } from "react";
import Navbar from "../Components/ui/Navbar";
import Sidebar from "../Components/ui/Sidebar";
import Status from "../Components/ui/Status";
import { metrics } from "../utils/data";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col flex-1 overflow md:ml-64">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
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
