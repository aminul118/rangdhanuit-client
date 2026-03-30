import dynamic from "next/dynamic";
import getVerifiedUser from "@/services/User/verified-user";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "User Dashboard | Rangdhanu IT",
};

// Loading component
const DashboardLoading = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Dynamic import for user dashboard
const UserDashboard = dynamic(
  () => import("@/components/common/wrapper/UserDashboardWrapper"),
  {
    loading: DashboardLoading,
    ssr: true,
  },
);

const DashboardPage = async () => {
  const user = await getVerifiedUser();
  const role = user?.role?.toUpperCase();

  // Strict check: Admins should go to /admin
  if (role === "ADMIN" || role === "SUPER_ADMIN") {
    redirect("/admin");
  }

  return <UserDashboard />;
};

export default DashboardPage;
