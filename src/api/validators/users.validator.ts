import { z } from 'zod';

export const registerUser = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  fullName: z.string().min(3).max(100),
  password: z.string().min(8).max(30),
});
