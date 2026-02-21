import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AddUser from "../pages/AddUser";
import EditUser from "../pages/EditUser";
import ViewUser from "../pages/ViewUser";
import ProtectedRoutes from "./ProtectedRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/dashboard/add"
        element={
          <ProtectedRoutes>
            <AddUser />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/dashboard/edit/:id"
        element={
          <ProtectedRoutes>
            <EditUser />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/dashboard/view/:id"
        element={
          <ProtectedRoutes>
            <ViewUser />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default AppRoutes;