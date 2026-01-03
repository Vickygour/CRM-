import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/Header/Header.jsx";
import Login from "./Components/CompanyIntro/Login.jsx";
import SuperAdminDashboard from "./Components/CompanyIntro/SuperAdminDashboard.jsx";
import DashboardLayout from "./DashboardLayout .jsx";
import TeamManagement from "./Components/CompanyIntro/TeamManagement.jsx";
import Reports from "./Reports.jsx";
import CreateStaff from "./CreateStaff.jsx";
import AllCustomers from "./Components/CompanyIntro/AllCustomers.jsx";
import CreateCustomer from "./Components/CompanyIntro/CreateCustomer.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<SuperAdminDashboard />} />
            <Route path="TeamManagement" element={<TeamManagement />} />
            <Route path="Reports" element={<Reports />} />
            <Route path="create-staff" element={<CreateStaff />} />
            <Route path="/admin/edit-staff/:id" element={<CreateStaff />} />
            <Route path="customers" element={<AllCustomers />} />
            <Route path="create-customer" element={<CreateCustomer />} />
            <Route
              path="/admin/edit-customer/:id" element={<CreateCustomer />}
            />
          </Route>
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </>
  );
}

export default App;
