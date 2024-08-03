import jwt from 'jsonwebtoken';
import { JWT, TJwtPayload } from '../@types/others/TJwt';
import { JWT_ACCESS_TOKEN_SECRET_KEY, JWT_REFRESH_TOKEN_SECRET_KEY, JWT_TOKEN_EXPIRY } from '../config/app.config';
import { Types } from 'mongoose';

type TimeUnit = 's' | 'm' | 'h' | 'd';

export function generateJWTTokenExpiryTime(amount: number, unit: TimeUnit): string {
  return `${amount}${unit}`;
}

export const generateAccessAndRefreshTokens = async (userId: Types.ObjectId): Promise<JWT> => {
  const accessTokenSecret = JWT_ACCESS_TOKEN_SECRET_KEY;
  const refreshTokenSecret = JWT_REFRESH_TOKEN_SECRET_KEY;

  if (!accessTokenSecret || !refreshTokenSecret) throw new Error('Token Secrets are not defined in environment');

  const tokenPayload: TJwtPayload = {
    _id: String(userId),
    email: '',
    username: '',
    fullName: '',
  };

  const accessToken = jwt.sign(tokenPayload, accessTokenSecret, {
    expiresIn: JWT_TOKEN_EXPIRY,
  });

  const refreshToken = jwt.sign(tokenPayload, refreshTokenSecret, {
    expiresIn: JWT_TOKEN_EXPIRY,
  });

  return { accessToken, refreshToken };
};
