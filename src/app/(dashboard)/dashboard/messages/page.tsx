import { Suspense } from "react";
import { UserMessagesContent } from "@/components/modules/dashboard/Messaging/UserMessagesContent";
import { MessagingSkeleton } from "@/components/modules/dashboard/Messaging/MessagingSkeleton";
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
