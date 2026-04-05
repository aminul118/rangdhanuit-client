import { Metadata } from "next";
import { TSearchParamsPromise } from "@/types";
import { PartnersList } from "@/components/modules/dashboard/admin/Partner/PartnersList";
import { AdminPageWrapper } from "@/components/common/layouts/AdminPageWrapper";
import { getPartners } from "@/services/Partner/partner";

export const metadata: Metadata = {
  title: "Partner Management | Admin Dashboard",
  description: "Manage your business partners and collaborations.",
};

const AdminPartnersPage = async ({
  searchParams,
}: {
  searchParams: TSearchParamsPromise;
}) => {
  const params = (await searchParams) as Record<string, string>;
  const res = await getPartners(params);
  const partners = res?.data || [];
  const meta = res?.meta;

  return (
    <AdminPageWrapper
      skeletonColumns={[
        { width: "w-12" }, // SI
        { width: "w-24" }, // Logo
        { width: "w-full" }, // Name
        { width: "w-48" }, // Link
        { width: "w-32" }, // Created At
        { width: "w-10" }, // Actions
      ]}
    >
      <PartnersList partners={partners} meta={meta} />
    </AdminPageWrapper>
  );
};

export default AdminPartnersPage;
