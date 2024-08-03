/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { APIAsyncHandler } from '../utils/APIAsyncHandler';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ApiError } from '../utils/ErrorHandler';
import { UserModel } from '../schemas';
import { IAuthRequest } from '../@types/others/TExpress';
import { JWT_ACCESS_TOKEN_SECRET_KEY } from '../config/config';

export const verifyToken = APIAsyncHandler(async (req: Request, _: Response, next: NextFunction) => {
  try {
    const _req = req as unknown as IAuthRequest;
    const token = _req.cookies?.accessToken || _req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError(401, 'Unauthorized request');
    }

    const decodedToken = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET_KEY) as JwtPayload;

    const user = await UserModel.findById(decodedToken?._id).select('-password -refreshToken');

    if (!user) {
      throw new ApiError(401, 'Invalid Access Token');
    }

    _req.user = user;
    next();
  } catch (error: any) {
    throw new ApiError(401, error?.message || 'Invalid access token');
  }
});
