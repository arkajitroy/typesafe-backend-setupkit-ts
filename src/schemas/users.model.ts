import { model, Schema } from 'mongoose';
import { IUser, IUserSchema } from '../@types/models/IUser';
import jwt from 'jsonwebtoken';
import { JWT_ACCESS_TOKEN_SECRET_KEY, JWT_TOKEN_EXPIRY } from '../config/config';

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // Cloudinary URL
      required: true,
    },
    coverImage: {
      type: String, // Cloudinary URL
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Video',
      },
    ],
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.generateAccessToken = (): string => {
  const user = this as unknown as IUser;
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
    },
    JWT_ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: JWT_TOKEN_EXPIRY,
    },
  );
};

// Create and export the User model
const UsersModel = model<IUserSchema>('users', userSchema);

export default UsersModel;
