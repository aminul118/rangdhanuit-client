import { Suspense } from "react";
import { Metadata } from "next";
import { TSearchParamsPromise } from "@/types";
import { UsersList } from "@/components/modules/dashboard/admin/Users/UsersList";
import { TableSkeleton } from "@/components/common/loader/TableSkeleton";

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
    <div className="relative min-h-[calc(100vh-80px)] p-6">
      <Suspense fallback={<TableSkeleton />}>
        <UsersList searchParams={params} />
      </Suspense>
    </div>
  );
};

export default UsersAdminPage;
