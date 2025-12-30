import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', background: '#111', color: '#fff' }}>
        <h2>Admin Panel</h2>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
