import { Types } from 'mongoose';
import { TObjectId } from '../others/TObjectId';

export interface ISubscriptionSchema {
  subscriber: Types.ObjectId;
  channel: Types.ObjectId;
}

export interface ISubscription extends ISubscriptionSchema, TObjectId {}
