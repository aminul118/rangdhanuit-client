import { Metadata } from "next";
import { TSearchParamsPromise } from "@/types";
import { UsersList } from "@/components/modules/dashboard/admin/Users/UsersList";
import { AdminPageWrapper } from "@/components/common/layouts/AdminPageWrapper";

export const metadata: Metadata = {
  title: "User Management | Rangdhanu IT",
};

const UsersAdminPage = async ({
  searchParams,
}: {
  searchParams: TSearchParamsPromise;
}) => {
  const params = (await searchParams) as Record<string, string>;

  return (
    <AdminPageWrapper>
      <UsersList searchParams={params} />
    </AdminPageWrapper>
  );
};

export default UsersAdminPage;
