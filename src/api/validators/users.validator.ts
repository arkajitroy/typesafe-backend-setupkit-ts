import { z } from 'zod';
import { passwordFieldValidation } from './fieldValidations';

export const registerUser = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  fullName: z.string().min(3).max(100),
  password: passwordFieldValidation,
});

export const loginUser = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: passwordFieldValidation,
});

export const resetPassword = z.object({
  oldPassword: passwordFieldValidation,
  newPassword: passwordFieldValidation,
});

export const updateProfile = z.object({
  fullName: z.string().min(3).max(100),
  email: z.string().email(),
});
