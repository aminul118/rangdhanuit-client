import { Metadata } from 'next';
import AddServiceForm from "@/components/modules/dashboard/admin/Service/AddServiceForm";

export const metadata: Metadata = {
  title: 'Launch Service | Admin Dashboard',
  description: 'Propose and publish a new core capability of our tech agency.',
};

const AddServicePage = () => {
  return <AddServiceForm />;
};

export default AddServicePage;
