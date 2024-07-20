import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface TExpressRequest extends Request {
  user?: string | JwtPayload; // Define the 'user' property here
  query: Record<string, string | undefined>;
}
