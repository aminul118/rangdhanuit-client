import { Metadata } from "next";
import generateMetaTags from "@/Seo/generateMetaTags";
import { getClientBillsSummary } from "@/services/License/license";
import ClientBillsList from "./_components/ClientBillsList";

export const metadata: Metadata = generateMetaTags({
  title: "Client Bills | Admin Dashboard",
  description:
    "Manage client website billing, dues, payments, and license extensions.",
});

export const dynamic = "force-dynamic";

const ClientBillsPage = async () => {
  const res = await getClientBillsSummary();
  const summary = res?.data || {
    totalRevenueCollected: 0,
    totalPendingDues: 0,
    activeSubscriptions: 0,
    paymentsPendingApproval: 0,
    licenses: [],
  };

  return <ClientBillsList summary={summary} />;
};

export default ClientBillsPage;
