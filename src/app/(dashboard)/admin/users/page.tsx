import { getAllUsers } from "@/services/User/allUsers";
import { Metadata } from "next";
import UserTable from "@/components/modules/dashboard/admin/UserAdmin/UserTable";
import TableWrapper from "@/components/common/wrapper/TableWrapper";
import CreateUserModal from "@/components/modules/dashboard/admin/UserAdmin/CreateUserModal";

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
        action={<CreateUserModal />}
      >
        <UserTable users={users} />
      </TableWrapper>
    </div>
  );
};

export default UsersAdminPage;
