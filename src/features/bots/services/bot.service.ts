import { prisma } from "@/lib/prisma";
import { Prisma, BotTemplate, BotLanguage } from "@prisma/client";
import { generateUniqueBotSlug, slugify } from "../utils/slug";

export class BotService {
  static async createBot(
    userId: string,
    data: {
      projectId: string;
      name: string;
      description?: string | null;
      template: BotTemplate;
      language: BotLanguage;
      prefix: string;
    }
  ) {
    // Validate project ownership first
    const project = await prisma.project.findFirst({
      where: { id: data.projectId, userId, deletedAt: null },
    });
    if (!project) throw new Error("Project not found or unauthorized");

    const baseSlug = slugify(data.name);
    const slug = await generateUniqueBotSlug(baseSlug, data.projectId);

    return prisma.bot.create({
      data: {
        projectId: data.projectId,
        slug,
        name: data.name,
        description: data.description,
        template: data.template,
        language: data.language,
        prefix: data.prefix,
      },
    });
  }

  static async getBots(
    userId: string,
    params: { page?: number; limit?: number; search?: string; sort?: "asc" | "desc"; projectId?: string }
  ) {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.BotWhereInput = {
      project: { userId },
      deletedAt: null,
      ...(params.projectId && { projectId: params.projectId }),
      ...(params.search && {
        name: { contains: params.search, mode: "insensitive" },
      }),
    };

    const [items, total] = await prisma.$transaction([
      prisma.bot.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: params.sort || "desc" },
        include: { project: { select: { name: true } } },
      }),
      prisma.bot.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      items,
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }

  static async getBotById(userId: string, id: string) {
    return prisma.bot.findFirst({
      where: { id, project: { userId }, deletedAt: null },
      include: {
        project: true,
        envVars: true,
        deployments: { orderBy: { createdAt: "desc" }, take: 5 },
      },
    });
  }

  static async updateBot(
    userId: string,
    id: string,
    data: { name?: string; description?: string | null; prefix?: string; language?: BotLanguage; template?: BotTemplate }
  ) {
    const bot = await prisma.bot.findFirst({
      where: { id, project: { userId }, deletedAt: null },
    });
    if (!bot) throw new Error("Bot not found or unauthorized");

    return prisma.bot.update({
      where: { id },
      data,
    });
  }

  static async softDeleteBot(userId: string, id: string) {
    const bot = await prisma.bot.findFirst({
      where: { id, project: { userId }, deletedAt: null },
    });
    if (!bot) throw new Error("Bot not found or unauthorized");

    return prisma.bot.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  static async duplicateBot(userId: string, id: string) {
    return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const originalBot = await tx.bot.findFirst({
        where: { id, project: { userId }, deletedAt: null },
      });
      if (!originalBot) throw new Error("Bot not found or unauthorized");

      const baseSlug = slugify(`${originalBot.name} copy`);
      const slug = await generateUniqueBotSlug(baseSlug, originalBot.projectId);

      return tx.bot.create({
        data: {
          projectId: originalBot.projectId,
          slug,
          name: `${originalBot.name} (Copy)`,
          description: originalBot.description,
          template: originalBot.template,
          language: originalBot.language,
          prefix: originalBot.prefix,
        },
      });
    });
  }
}
