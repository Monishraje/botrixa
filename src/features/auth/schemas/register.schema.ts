import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().trim().toLowerCase().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
