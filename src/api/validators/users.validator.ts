import { z } from 'zod';
import { passwordFieldValidation } from './fieldValidations';

export const registerUser = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  fullName: z.string().min(3).max(100),
  password: z.string().min(8).max(30),
});

export const loginUser = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8).max(30),
});

export const resetPassword = z.object({
  oldPassword: z.string().min(8).max(30),
  newPassword: z.string().min(8).max(30),
});

export const updateProfile = z.object({
  fullName: z.string().min(3).max(100),
  email: z.string().email(),
});
