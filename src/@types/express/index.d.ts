import { IUser } from '@types/models/IUser';

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Extend the Express.Request with a custom user field
      files?: {
        [fieldname: string]: Express.Multer.File[];
      };
    }
  }
}
export {};
