"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { BotService } from "../services/bot.service";
import { CreateBotSchema } from "../schemas/bot.schema";
import { ApiResponse, PaginatedResponse, PaginationParams } from "../types";
import { Bot } from "@prisma/client";

export async function createBotAction(data: unknown): Promise<ApiResponse<Bot>> {
  try {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    const parsed = CreateBotSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: "Invalid input", issues: parsed.error.issues.map(i => i.message) };
    }

    const bot = await BotService.createBot(session.user.id, parsed.data);
    revalidatePath("/bots");
    revalidatePath(`/projects/${bot.projectId}`);
    return { success: true, data: bot };
  } catch (error: unknown) {
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "Failed to create bot" };
  }
}

export async function getBotsAction(params: PaginationParams & { projectId?: string }): Promise<ApiResponse<PaginatedResponse<Bot>>> {
  try {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    const data = await BotService.getBots(session.user.id, params);
    return { success: true, data };
  } catch (error: unknown) {
    return { success: false, error: "Failed to fetch bots" };
  }
}

export async function deleteBotAction(id: string): Promise<ApiResponse<boolean>> {
  try {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    await BotService.softDeleteBot(session.user.id, id);
    revalidatePath("/bots");
    return { success: true, data: true, message: "Bot deleted successfully" };
  } catch (error: unknown) {
    return { success: false, error: "Failed to delete bot" };
  }
}

export async function duplicateBotAction(id: string): Promise<ApiResponse<Bot>> {
  try {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    const duplicated = await BotService.duplicateBot(session.user.id, id);
    revalidatePath("/bots");
    return { success: true, data: duplicated, message: "Bot duplicated successfully" };
  } catch (error: unknown) {
    return { success: false, error: "Failed to duplicate bot" };
  }
}
