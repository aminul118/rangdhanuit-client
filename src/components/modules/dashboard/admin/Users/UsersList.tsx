import { getAllUsers } from "@/services/User/allUsers";
import UserTable from "@/components/modules/dashboard/admin/Users/UserTable";
import CreateUserModal from "@/components/modules/dashboard/admin/Users/CreateUserModal";
import { ManagementListWrapper } from "@/components/common/wrapper/ManagementListWrapper";

export async function UsersList({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const res = await getAllUsers(searchParams);
  const users = res?.data || [];
  const meta = res?.meta;

  return (
    <ManagementListWrapper
      title="User Management"
      description="Manage your system users, roles, and account status from this central glass dashboard."
      meta={meta}
    >
      <div className="flex justify-end mb-6">
        <CreateUserModal />
      </div>
      <UserTable users={users} />
    </ManagementListWrapper>
  );
}
