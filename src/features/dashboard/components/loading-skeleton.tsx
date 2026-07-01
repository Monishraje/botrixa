import { Skeleton } from "@/components/ui/skeleton";
import { DashboardCard } from "./dashboard-card";
import { CardContent, CardHeader } from "@/components/ui/card";

export function LoadingSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-in fade-in-50 duration-500">
      {[...Array(4)].map((_, i) => (
        <DashboardCard key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-12 mb-2" />
            <Skeleton className="h-3 w-24" />
          </CardContent>
        </DashboardCard>
      ))}
      <DashboardCard className="col-span-full lg:col-span-4 h-[400px]">
        <CardHeader>
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </DashboardCard>
    </div>
  );
}
