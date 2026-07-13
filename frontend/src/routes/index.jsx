import { Routes, Route } from "react-router-dom";

import DashboardPage from "../pages/DashboardPage";
import PrintPage from "../pages/PrintPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/print/:companyId" element={<PrintPage />} />
    </Routes>
  );
}

export default AppRoutes;
