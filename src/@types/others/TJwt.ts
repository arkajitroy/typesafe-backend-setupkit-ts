import { JwtPayload } from 'jsonwebtoken';

export interface TJwtPayload {
  _id: string;
  email: string;
  username: string;
  fullName: string;
}

export interface JWT {
  accessToken: string;
  refreshToken: string;
}

export interface TJWTDecodedToken extends JwtPayload, TJwtPayload {}
