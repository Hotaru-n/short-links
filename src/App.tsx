import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { DashboardTable } from "./pages/Dashboard";
import { RequireAuth } from "./guards/RequireAuth";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="login" replace />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route
          path="dashboard"
          element={
            <RequireAuth>
              <DashboardTable />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
