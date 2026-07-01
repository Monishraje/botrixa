import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BotService } from "@/features/bots/services/bot.service";
import { BotEditForm } from "@/features/bots/components/bot-edit-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export async function generateMetadata() {
  return { title: "Edit Bot | Botrixa" };
}

export default async function EditBotPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const resolvedParams = await params;
  const bot = await BotService.getBotById(session.user.id, resolvedParams.id);

  if (!bot) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Bot not found or you don&apos;t have access.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          href={`/bots/${resolvedParams.id}`}
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage configuration for {bot.name}</p>
        </div>
      </div>

      <BotEditForm bot={bot} />
    </div>
  );
}
