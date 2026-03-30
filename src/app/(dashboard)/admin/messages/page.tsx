import { Suspense } from "react";
import { AdminMessagesContent } from "@/components/modules/dashboard/Messaging/AdminMessagesContent";
import { MessagingSkeleton } from "@/components/modules/dashboard/Messaging/MessagingSkeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Messages | Rangdhanu IT",
  description: "Manage client conversations and support requests.",
};

export default function AdminMessagesPage() {
  return (
    <Suspense fallback={<MessagingSkeleton />}>
      <AdminMessagesContent />
    </Suspense>
  );
}
