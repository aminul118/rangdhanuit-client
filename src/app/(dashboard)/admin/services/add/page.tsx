import { Metadata } from "next";
import AddServiceForm from "@/app/(dashboard)/admin/services/_components/AddServiceForm";

export const metadata: Metadata = {
  title: "Launch Service | Admin Dashboard",
  description: "Propose and publish a new core capability of our tech agency.",
};

const AddServicePage = () => {
  return <AddServiceForm />;
};

export default AddServicePage;
