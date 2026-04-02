import Sidebar from "@/components/layouts/Dashboard/Sidebar/Sidebar";
import AdminHeader from "@/components/layouts/Dashboard/Header/Header";
import { DashboardContainer } from "@/components/ui/Container";
import { IChildrenProps } from "@/types";

const AdminLayout = ({ children }: IChildrenProps) => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto custom-scrollbar pt-6 md:pt-8 bg-muted/10 backdrop-blur-3xl">
          <DashboardContainer className="pb-16">{children}</DashboardContainer>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
