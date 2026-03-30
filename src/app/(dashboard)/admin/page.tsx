import dynamic from "next/dynamic";
import getVerifiedUser from "@/services/User/verified-user";
import { getStatistics } from "@/services/User/allUsers";
import { getBlogs } from "@/services/Blog/blogs";
import { getPortfolios } from "@/services/Portfolio/portfolios";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin Dashboard | Rangdhanu IT",
};

// Loading component
const DashboardLoading = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Dynamic import for admin dashboard
const AdminDashboard = dynamic(
  () => import("@/components/common/wrapper/AdminDashboardWrapper"),
  {
    loading: DashboardLoading,
    ssr: true,
  },
);

const AdminPage = async () => {
  const user = await getVerifiedUser();
  const role = user?.role?.toUpperCase();

  // Strict check: Only Admins/Super Admins allowed
  if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
    redirect("/dashboard");
  }

  // Fetch all stats in parallel
  const [userRes, blogRes, portfolioRes] = await Promise.all([
    getStatistics(),
    getBlogs({ limit: "1" }),
    getPortfolios({ limit: "1" }),
  ]);

  const stats = {
    totalUsers: userRes?.data?.totalUsers || 0,
    activeUsers: userRes?.data?.activeUsers || 0,
    blockedUsers: userRes?.data?.blockedUsers || 0,
    verifiedUsers: userRes?.data?.verifiedUsers || 0,
    adminUsers: userRes?.data?.adminUsers || 0,
    totalBlogs: blogRes?.meta?.total || 0,
    totalPortfolios: portfolioRes?.meta?.total || 0,
  };

  return <AdminDashboard stats={stats} />;
};

export default AdminPage;
