import { getAllUsers } from "@/services/User/allUsers";
import { Metadata } from "next";
import UserTable from "@/components/modules/dashboard/admin/UserAdmin/UserTable";
import TableWrapper from "@/components/common/wrapper/TableWrapper";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

export const metadata: Metadata = {
  title: "User Management | Rangdhanu IT",
};

const UsersAdminPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) => {
  const params = await searchParams;
  const res = await getAllUsers(params);
  const users = res?.data?.result || [];
  const meta = res?.data?.meta;

  return (
    <div className="relative min-h-[calc(100vh-80px)] p-6">
      <TableWrapper
        title="User Management"
        description="Manage your system users, roles, and account status from this central glass dashboard."
        meta={meta}
        action={
          <Button className="bg-primary hover:opacity-90 transition-all rounded-2xl h-11 px-6 font-bold shadow-[0_0_20px_-5px_rgba(var(--primary),0.5)]">
            <UserPlus className="mr-2" size={20} />
            Add User
          </Button>
        }
      >
        <UserTable users={users} />
      </TableWrapper>
    </div>
  );
};

export default UsersAdminPage;
