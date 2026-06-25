import UserAccountSidebar from "@/components/layouts/Dashboard/Sidebar/UserAccountSidebar";
import { IChildrenProps } from "@/types";

const UserDashboardLayout = ({ children }: IChildrenProps) => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12 relative overflow-hidden">
      {/* Decorative Background for the page */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Sidebar Area */}
          <aside className="w-full lg:w-[280px] xl:w-[300px] shrink-0 sticky top-[100px] h-[calc(100vh-120px)] hidden lg:block">
            <UserAccountSidebar />
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 w-full min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
