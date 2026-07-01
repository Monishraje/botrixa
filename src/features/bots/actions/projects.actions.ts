"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { ProjectService } from "../services/project.service";
import { CreateProjectSchema } from "../schemas/project.schema";
import { ApiResponse, PaginatedResponse, PaginationParams } from "../types";
import { Project } from "@prisma/client";

export async function createProjectAction(data: unknown): Promise<ApiResponse<Project>> {
  try {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    const parsed = CreateProjectSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: "Invalid input", issues: parsed.error.issues.map(i => i.message) };
    }

    const project = await ProjectService.createProject(session.user.id, parsed.data);
    revalidatePath("/projects");
    return { success: true, data: project };
  } catch (error: unknown) {
    if (error instanceof Error) return { success: false, error: error.message };
    return { success: false, error: "Failed to create project" };
  }
}

export async function getProjectsAction(params: PaginationParams): Promise<ApiResponse<PaginatedResponse<Project>>> {
  try {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    const data = await ProjectService.getProjects(session.user.id, params);
    return { success: true, data };
  } catch (error: unknown) {
    return { success: false, error: "Failed to fetch projects" };
  }
}

export async function deleteProjectAction(id: string): Promise<ApiResponse<boolean>> {
  try {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    await ProjectService.softDeleteProject(session.user.id, id);
    revalidatePath("/projects");
    return { success: true, data: true, message: "Project deleted successfully" };
  } catch (error: unknown) {
    return { success: false, error: "Failed to delete project" };
  }
}
