import { Request } from 'express';
import { IUser } from '../models/IUser';

export interface IAuthRequest extends Request {
  user: IUser;
}
