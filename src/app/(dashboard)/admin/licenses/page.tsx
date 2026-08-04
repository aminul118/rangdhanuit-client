import { Metadata } from "next";
import { TSearchParamsPromise } from "@/types";
import { AdminPageWrapper } from "@/components/common/layouts/AdminPageWrapper";
import { getLicenses } from "@/services/License/license";
import LicensesList from "./_components/LicensesList";

export const metadata: Metadata = {
  title: "Client Licenses | Admin Dashboard",
  description: "Manage client website licensing and monthly subscription fees.",
};

const AdminLicensesPage = async ({
  searchParams,
}: {
  searchParams: TSearchParamsPromise;
}) => {
  const params = (await searchParams) as Record<string, string>;
  const res = await getLicenses(params);
  const licenses = res?.data || [];
  const meta = res?.meta;

  return (
    <AdminPageWrapper>
      <LicensesList licenses={licenses} meta={meta} />
    </AdminPageWrapper>
  );
};

export default AdminLicensesPage;
