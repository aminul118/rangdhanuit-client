import { getAllUsers } from "@/services/User/allUsers";
import { Metadata } from "next";
import UserTable from "@/components/modules/dashboard/admin/UserAdmin/UserTable";
import CreateUserModal from "@/components/modules/dashboard/admin/UserAdmin/CreateUserModal";
import { Users, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "User Management | Rangdhanu IT",
};

const UsersAdminPage = async () => {
  const res = await getAllUsers();
  const users = res?.data || [];

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto py-12 px-8 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-indigo-500 mb-1">
              <Users size={20} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">
                Management
              </span>
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
              Registered Users
              <Sparkles className="text-indigo-400" size={32} />
            </h1>
            <p className="text-muted-foreground max-w-lg text-lg">
              Manage all inhabitants of your digital empire. Elevate, restrict,
              or welcome new members.
            </p>
          </div>

          <CreateUserModal />
        </div>

        <div className="rounded-[2.5rem] overflow-hidden border border-white/5 bg-background/40 backdrop-blur-xl shadow-2xl">
          <UserTable users={users} />
        </div>
      </div>
    </div>
  );
};

export default UsersAdminPage;
