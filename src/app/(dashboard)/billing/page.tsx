import { Metadata } from "next";
import { EmptyState } from "@/features/dashboard/components/empty-state";
import { CreditCard } from "lucide-react";

export const metadata: Metadata = {
  title: "Billing - Botrixa",
};

export default function BillingPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed shadow-sm bg-background/50">
      <EmptyState
        icon={CreditCard}
        title="Billing Overview"
        description="You are currently on the Free Plan. Upgrade to access premium features."
        actionLabel="Upgrade Plan"
      />
    </div>
  );
}
