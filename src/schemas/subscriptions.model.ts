import { model, Model, Schema } from 'mongoose';
import { ISubscriptionSchema } from '../@types/models/ISubscriptions';

const subscriptionSchema = new Schema<ISubscriptionSchema>(
  {
    subscriber: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    channel: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export const Subscription: Model<ISubscriptionSchema> = model<ISubscriptionSchema>(
  'Subscription',
  subscriptionSchema,
);
