import { AdminMessagesContent } from "@/components/modules/dashboard/Messaging/AdminMessagesContent";

import { Metadata } from "next";
import { AdminPageWrapper } from "@/components/common/layouts/AdminPageWrapper";

export const metadata: Metadata = {
  title: "Admin Messages | Rangdhanu IT",
  description: "Manage client conversations and support requests.",
};

export default function AdminMessagesPage() {
  return (
    <AdminPageWrapper
      padding="p-0" // Messaging has internal padding
    >
      <AdminMessagesContent />
    </AdminPageWrapper>
  );
}
