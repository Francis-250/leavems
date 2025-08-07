import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";
import Loading from "./Components/Loading";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import Leave from "./pages/Leave";
import Employee from "./pages/admin/Employee";
import LeaveAdmin from "./pages/admin/Leave";

const App = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route
          path="/login"
          element={!isSignedIn ? <Login /> : <Navigate to="/admin" replace />}
        />
        <Route
          path="/"
          element={
            isSignedIn ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/leaves"
          element={isSignedIn ? <Leave /> : <Navigate to="/login" replace />}
        />
        {/* admin */}
{/*         <Route
          path="/admin"
          element={
            isSignedIn ? <AdminDashboard /> : <Navigate to="/login" replace />
          }
        /> */}
        <Route
          path="/admin/leave"
          element={
            isSignedIn ? <LeaveAdmin /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/admin/employees"
          element={isSignedIn ? <Employee /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </div>
  );
};

export default App;
