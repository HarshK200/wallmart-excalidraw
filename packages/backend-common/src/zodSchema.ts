import z from "zod";

export const userSignupSchema = z.object({
  username: z.string().min(1).max(20),
  email: z.string().email(),
  password: z.string().min(8),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const createRoomSchema = z.object({
  ownerId: z.string(),
  slug: z.string(),
});
