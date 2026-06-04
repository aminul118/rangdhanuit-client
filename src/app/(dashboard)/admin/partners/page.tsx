import { Metadata } from "next";
import { TSearchParamsPromise } from "@/types";
import { PartnersList } from "@/app/(dashboard)/admin/partners/_components/PartnersList";
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
    <AdminPageWrapper>
      <PartnersList partners={partners} meta={meta} />
    </AdminPageWrapper>
  );
};

export default AdminPartnersPage;
