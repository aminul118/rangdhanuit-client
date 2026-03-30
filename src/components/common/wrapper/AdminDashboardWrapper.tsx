"use client";

import AdminDashboardHome from "../../modules/dashboard/admin/Dashboard/AdminDashboardHome";

interface AdminDashboardWrapperProps {
  stats: {
    totalUsers: number;
    activeUsers: number;
    blockedUsers: number;
    verifiedUsers: number;
    adminUsers: number;
  };
}

const AdminDashboardWrapper = ({ stats }: AdminDashboardWrapperProps) => {
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 -ml-40 -mt-40 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-0 -mr-40 -mb-40 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px] -z-10 animate-pulse" />

      <div className="container mx-auto py-12 px-8 relative">
        <AdminDashboardHome stats={stats} />
      </div>
    </div>
  );
};

export default AdminDashboardWrapper;
