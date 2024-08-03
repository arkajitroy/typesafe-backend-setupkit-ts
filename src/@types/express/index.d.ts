declare namespace Express {
  interface Request {
    user?: import('../models/IUser').IUser;
    files?: {
      [fieldname: string]: Express.Multer.File[];
    };
  }
}
