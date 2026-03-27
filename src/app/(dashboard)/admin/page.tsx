import dynamic from "next/dynamic";
import getVerifiedUser from "@/services/User/verified-user";
import { getStatistics } from "@/services/User/allUsers";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Admin Dashboard | Rangdhanu IT',
};

// Loading component
const DashboardLoading = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Dynamic import for admin dashboard
const AdminDashboard = dynamic(() => import("@/components/modules/dashboard/AdminDashboardWrapper"), {
  loading: DashboardLoading,
  ssr: true,
});

const AdminPage = async () => {
  const user = await getVerifiedUser();
  const role = user?.role?.toUpperCase();

  // Strict check: Only Admins/Super Admins allowed
  if (role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
    redirect('/dashboard');
  }

  const res = await getStatistics();
  const stats = res?.data || {
    totalUsers: 0,
    activeUsers: 0,
    blockedUsers: 0,
    verifiedUsers: 0,
    adminUsers: 0,
  };

  return <AdminDashboard stats={stats} />;
};

export default AdminPage;
