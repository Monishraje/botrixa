"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { loginSchema, registerSchema, LoginInput, RegisterInput } from "../schemas";

// In the future, integrate Redis/Upstash here
async function rateLimitCheck() {
  return true;
}

export async function loginAction(values: LoginInput) {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { email, password } = validatedFields.data;

  await rateLimitCheck();

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: "Logged in successfully." };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw error;
  }
}

export async function registerAction(values: RegisterInput) {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { email, password, name } = validatedFields.data;

  await rateLimitCheck();

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "Email already in use." };
  }

  // Minimum 12 salt rounds
  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      name: name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "Account created successfully." };
}
