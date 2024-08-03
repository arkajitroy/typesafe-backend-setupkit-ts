/* eslint-disable @typescript-eslint/no-explicit-any */

import { IUser } from '../models';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      files?: {
        [fieldname: string]: Express.Multer.File[];
      };
    }
  }
}
