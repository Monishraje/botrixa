import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Notifications() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-10 w-10">
        <Bell className="h-5 w-5 text-muted-foreground" />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
        <span className="sr-only">Toggle notifications</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-sm">
          <div className="flex flex-col space-y-1">
            <span className="font-medium leading-none">Welcome to Botrixa</span>
            <span className="text-muted-foreground text-xs">Your workspace is ready.</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
