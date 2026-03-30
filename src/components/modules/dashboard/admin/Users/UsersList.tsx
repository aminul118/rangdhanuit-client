import { getAllUsers } from "@/services/User/allUsers";
import UserTable from "@/components/modules/dashboard/admin/Users/UserTable";
import TableWrapper from "@/components/common/wrapper/TableWrapper";
import CreateUserModal from "@/components/modules/dashboard/admin/Users/CreateUserModal";

export async function UsersList({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const res = await getAllUsers(searchParams);
  const users = res?.data || [];
  const meta = res?.meta;

  return (
    <TableWrapper
      title="User Management"
      description="Manage your system users, roles, and account status from this central glass dashboard."
      meta={meta}
      action={<CreateUserModal />}
    >
      <UserTable users={users} />
    </TableWrapper>
  );
}
