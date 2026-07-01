import { z } from "zod";
import { BotTemplate, BotLanguage } from "@prisma/client";

export const CreateBotSchema = z.object({
  projectId: z.string().cuid("Invalid Project ID"),
  name: z.string().min(3, "Bot name must be at least 3 characters").max(50),
  description: z.string().max(255).optional().nullable(),
  template: z.nativeEnum(BotTemplate).default(BotTemplate.CUSTOM),
  language: z.nativeEnum(BotLanguage).default(BotLanguage.ENGLISH),
  prefix: z.string().min(1, "Prefix is required").max(5).default("!"),
});

export const UpdateBotSchema = CreateBotSchema.omit({ projectId: true }).partial();

export type CreateBotInput = z.infer<typeof CreateBotSchema>;
export type UpdateBotInput = z.infer<typeof UpdateBotSchema>;
