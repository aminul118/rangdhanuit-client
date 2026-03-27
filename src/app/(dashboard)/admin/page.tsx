import { getStatistics } from "@/services/User/allUsers";
import AdminDashboardHome from "@/components/modules/dashboard/admin/AdminDashboard/AdminDashboardHome";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Rangdhanu IT",
};

const AdminPage = async () => {
  const res = await getStatistics();
  const stats = res?.data || {
    totalUsers: 0,
    activeUsers: 0,
    blockedUsers: 0,
    verifiedUsers: 0,
    adminUsers: 0,
  };

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

export default AdminPage;
