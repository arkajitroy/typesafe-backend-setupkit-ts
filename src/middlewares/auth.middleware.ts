/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { APIAsyncHandler } from '../utils/APIAsyncHandler';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ApiError } from '../utils/ErrorHandler';
import { UserModel } from '../schemas';

export const verifyJWT = APIAsyncHandler(async (req: Request, _: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError(401, 'Unauthorized request');
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;

    const user = await UserModel.findById(decodedToken?._id).select('-password -refreshToken');

    if (!user) {
      throw new ApiError(401, 'Invalid Access Token');
    }

    req.user = user;
    next();
  } catch (error: any) {
    throw new ApiError(401, error?.message || 'Invalid access token');
  }
});