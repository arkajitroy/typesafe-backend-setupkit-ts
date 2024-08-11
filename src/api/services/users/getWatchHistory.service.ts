import { Types } from 'mongoose';
import { UserModel } from '../../../schemas';

export const getWatchHistoryService = async (userId: Types.ObjectId) => {
  const userWatchHistory = UserModel.aggregate([
    {
      $match: { _id: new Types.ObjectId(userId) },
    },
    {
      $lookup: {
        from: 'videos',
        localField: 'watchHistory',
        foreignField: '_id',
        as: 'watchHistoryInstances',

        pipeline: [
          {
            $lookup: {
              from: 'users',
              localField: 'owner',
              foreignField: '_id',
              as: 'ownerInstance',

              pipeline: [
                {
                  $project: {
                    fullName: 1,
                    username: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              owner: {
                $first: '$ownerInstance',
              },
            },
          },
        ],
      },
    },
  ]);

  return userWatchHistory;
};
