/* eslint-disable @typescript-eslint/no-explicit-any */

import { Multer } from 'multer';
declare namespace Express {
  export interface Request {
    user?: any;
    files?: {
      [fieldname: string]: Multer.File[];
    };
  }
}
