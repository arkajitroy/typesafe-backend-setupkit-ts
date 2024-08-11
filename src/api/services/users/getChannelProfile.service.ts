import { Types } from 'mongoose';
import { UserModel } from '../../../schemas';

export const getChannelByUsername = async (username: string, userId: Types.ObjectId) => {
  const channelInstance = await UserModel.aggregate([
    {
      $match: { username: username.toLowerCase() },
    },
    {
      $lookup: {
        from: 'subscriptions',
        localField: '_id',
        foreignField: 'channel',
        as: 'subscribers',
      },
    },
    {
      $lookup: {
        from: 'subscriptions',
        localField: '_id',
        foreignField: 'subscriber',
        as: 'subscribedTo',
      },
    },
    {
      $addFields: {
        subscribersCount: { $size: '$subscribers' },
        channelsSubscribedToCount: { $size: '$subscribedTo' },
        isSubscribed: {
          $cond: {
            if: { $in: [userId, '$subscribers.subscriber'] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        fullName: 1,
        username: 1,
        avatar: 1,
        coverImage: 1,
        email: 1,
        subscribersCount: 1,
        channelsSubscribedToCount: 1,
        isSubscribed: 1,
      },
    },
  ]);

  return channelInstance;
};
