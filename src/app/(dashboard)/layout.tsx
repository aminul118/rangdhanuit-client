import Sidebar from "@/components/layouts/Admin/Sidebar/Sidebar";
import AdminHeader from "@/components/layouts/Admin/Header/Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
