import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Botrixa",
};

export default function DashboardPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold tracking-tight">Welcome to Botrixa Dashboard</h1>
    </div>
  );
}
