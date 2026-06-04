import { Metadata } from "next";
import { TSearchParamsPromise } from "@/types";
import { UsersList } from "@/app/(dashboard)/admin/users/_components/UsersList";
import { AdminPageWrapper } from "@/components/common/layouts/AdminPageWrapper";

export const metadata: Metadata = {
  title: "User Management | Rangdhanu IT",
};

const UsersAdminPage = async (props: {
  searchParams: Promise<TSearchParamsPromise>;
}) => {
  const searchParams = await props.searchParams;
  const params = (await searchParams) as Record<string, string>;

  return (
    <AdminPageWrapper>
      <UsersList searchParams={params} />
    </AdminPageWrapper>
  );
};

export default UsersAdminPage;
