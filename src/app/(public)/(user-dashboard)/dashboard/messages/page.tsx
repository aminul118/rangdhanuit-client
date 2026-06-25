import { Suspense } from "react";
import { UserMessagesContent } from "@/app/(dashboard)/admin/messages/_components/UserMessagesContent";
import { MessagingSkeleton } from "@/app/(dashboard)/admin/messages/_components/MessagingSkeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support Messaging | Rangdhanu IT",
  description: "Chat with our support team and manage your messages.",
};

export default function UserMessagesPage() {
  return (
    <Suspense fallback={<MessagingSkeleton />}>
      <UserMessagesContent />
    </Suspense>
  );
}
