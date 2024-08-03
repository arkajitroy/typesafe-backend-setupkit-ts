import mongoose from 'mongoose';
import { TObjectId } from '../others/TObjectId';

// Interface for the User schema
export interface IUserSchema {
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  coverImage?: string;
  watchHistory: mongoose.Types.ObjectId[];
  password: string;
  refreshToken?: string;
}

export interface IUser extends IUserSchema, TObjectId {}
