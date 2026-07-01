import { auth } from "@/lib/auth";
import { MobileSidebar } from "./mobile-sidebar";
import { UserMenu } from "./user-menu";
import { SearchBar } from "./search-bar";
import { Notifications } from "./notifications";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
      <MobileSidebar />
      <div className="w-full flex-1">
        <SearchBar />
      </div>
      <div className="flex items-center gap-4">
        <Notifications />
        {session?.user && <UserMenu user={session.user} />}
      </div>
    </header>
  );
}
