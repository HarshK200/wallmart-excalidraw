import z from "zod";

export const userSchema = z.object({
  username: z.string().min(1).max(20),
  email: z.string().email(),
  password: z.string().min(8),
});
