import { Sidebar } from "@/features/dashboard/components/sidebar";
import { Navbar } from "@/features/dashboard/components/navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[256px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Navbar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/20">
          {children}
        </main>
      </div>
    </div>
  );
}
