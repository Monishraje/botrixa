import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search projects, agents..."
        className="w-full appearance-none bg-background pl-8 shadow-none"
      />
    </div>
  );
}
