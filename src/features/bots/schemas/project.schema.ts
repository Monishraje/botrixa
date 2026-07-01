import { z } from "zod";
import { ProjectStatus } from "@prisma/client";

export const CreateProjectSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters").max(50),
  description: z.string().max(255).optional().nullable(),
});

export const UpdateProjectSchema = CreateProjectSchema.extend({
  status: z.nativeEnum(ProjectStatus).optional(),
});

export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>;
