import { getChannelByUsername } from './users/getChannelProfile.service';
import { getWatchHistoryService } from './users/getWatchHistory.service';

export const service = {
  users: {
    getChannelByUsername,
    getWatchHistoryService,
  },
};
