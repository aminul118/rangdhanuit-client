import AddQuotationForm from "@/app/(dashboard)/admin/quotations/_componnets/AddQuotationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Quotation | Rangdhanu IT",
  description:
    "Create professional service quotations with automated calculations.",
};

const CreateQuotationPage = () => {
  return (
    <div className="p-4 md:p-8">
      <AddQuotationForm />
    </div>
  );
};

export default CreateQuotationPage;
