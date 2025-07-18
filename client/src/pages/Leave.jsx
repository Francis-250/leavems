import { useState } from "react";
import Navbar from "../Components/ui/Navbar";
import Sidebar from "../Components/ui/Sidebar";
import LeaveApplyForm from "../Components/leave/LeaveApplyForm";
import LeaveCard from "../Components/leave/LeaveCard";

export default function Leave() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="flex min-h-screen flex-col flex-1 overflow md:ml-64">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-col flex-1">
        <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="my-5 px-3">
          <LeaveCard setShowAddModal={setShowAddModal} />
          {showAddModal && (
            <LeaveApplyForm
              setShowAddModal={setShowAddModal}
              showAddModal={showAddModal}
            />
          )}
        </div>
      </div>
    </div>
  );
}
