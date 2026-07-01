"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { getBotsAction, deleteBotAction, duplicateBotAction } from "@/features/bots/actions/bots.actions";
import { DataTable } from "@/components/shared/data-table";
import { Bot } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Trash, Settings } from "lucide-react";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Input } from "@/components/ui/input";



type BotWithProject = Bot & { project?: { name: string } };

export function BotsListClient() {
  const router = useRouter();
  const [data, setData] = useState<BotWithProject[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [isLoading, startTransition] = useTransition();

  const fetchBots = (p: number, s: string) => {
    startTransition(async () => {
      const res = await getBotsAction({ page: p, limit: 10, search: s, sort: "desc" });
      if (res.success && res.data) {
        setData(res.data.items);
        setTotalPages(res.data.totalPages);
      }
    });
  };

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      setPage(1);
      fetchBots(1, search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // When page changes explicitly
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchBots(newPage, search);
  };

  const handleDelete = async (id: string) => {
    const res = await deleteBotAction(id);
    if (res.success) fetchBots(page, search);
  };

  const handleDuplicate = async (id: string) => {
    const res = await duplicateBotAction(id);
    if (res.success) fetchBots(page, search);
  };

  const columns = [
    {
      header: "Name",
      accessorKey: "name" as keyof BotWithProject,
      cell: (row: BotWithProject) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.name}</span>
          <span className="text-xs text-muted-foreground">{row.slug}</span>
        </div>
      ),
    },
    {
      header: "Project",
      cell: (row: BotWithProject) => row.project?.name || "Unknown",
    },
    {
      header: "Status",
      cell: (row: BotWithProject) => (
        <Badge variant={row.status === "ONLINE" ? "default" : "secondary"}>
          {row.status.toLowerCase()}
        </Badge>
      ),
    },
    {
      header: "Template",
      cell: (row: BotWithProject) => row.template,
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (row: BotWithProject) => (
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" size="icon" onClick={() => router.push(`/bots/${row.id}`)}>
            <Settings className="h-4 w-4" />
          </Button>
          <ConfirmDialog
            title="Duplicate Bot"
            description="Are you sure you want to duplicate this bot configuration?"
            onConfirm={() => handleDuplicate(row.id)}
            confirmText="Duplicate"
            trigger={
              <Button variant="ghost" size="icon">
                <Copy className="h-4 w-4" />
              </Button>
            }
          />
          <ConfirmDialog
            title="Delete Bot"
            description="Are you sure? This will soft-delete the bot. You can restore it later."
            destructive
            onConfirm={() => handleDelete(row.id)}
            confirmText="Delete"
            trigger={
              <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                <Trash className="h-4 w-4" />
              </Button>
            }
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex max-w-sm">
        <Input 
          placeholder="Search bots..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
      </div>
      <DataTable 
        columns={columns} 
        data={data} 
        page={page} 
        totalPages={totalPages} 
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
    </div>
  );
}
