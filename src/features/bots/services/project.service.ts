import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { generateUniqueProjectSlug, slugify } from "../utils/slug";

export class ProjectService {
  static async createProject(userId: string, data: { name: string; description?: string | null }) {
    const baseSlug = slugify(data.name);
    const slug = await generateUniqueProjectSlug(baseSlug, userId);
    
    return prisma.project.create({
      data: {
        userId,
        slug,
        name: data.name,
        description: data.description,
      },
    });
  }

  static async getProjects(
    userId: string,
    params: { page?: number; limit?: number; search?: string; sort?: "asc" | "desc" }
  ) {
    const page = params.page || 1;
    const limit = params.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.ProjectWhereInput = {
      userId,
      deletedAt: null,
      ...(params.search && {
        name: { contains: params.search, mode: "insensitive" },
      }),
    };

    const [items, total] = await prisma.$transaction([
      prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: params.sort || "desc" },
        include: { _count: { select: { bots: { where: { deletedAt: null } } } } },
      }),
      prisma.project.count({ where }),
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

  static async getProjectById(userId: string, id: string) {
    return prisma.project.findFirst({
      where: { id, userId, deletedAt: null },
    });
  }

  static async updateProject(userId: string, id: string, data: { name?: string; description?: string | null }) {
    return prisma.project.update({
      where: { id, userId },
      data,
    });
  }

  static async softDeleteProject(userId: string, id: string) {
    return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const project = await tx.project.update({
        where: { id, userId },
        data: { deletedAt: new Date() },
      });
      
      // Cascade soft delete to bots
      await tx.bot.updateMany({
        where: { projectId: id },
        data: { deletedAt: new Date() },
      });

      return project;
    });
  }
}
