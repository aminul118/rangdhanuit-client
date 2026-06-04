import AddQuotationForm from "@/app/(dashboard)/admin/quotations/_componnets/AddQuotationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Generate Quotation | Rangdhanu IT",
  description: "Create professional software development proposals.",
};

const CreateQuotationPage = () => {
  return (
    <div className="p-4 md:p-8">
      <AddQuotationForm />
    </div>
  );
};

export default CreateQuotationPage;
