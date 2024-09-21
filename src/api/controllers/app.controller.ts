import { StatusCodes } from 'http-status-codes';
import { healthCheckHandler } from '../../utils/healthCheckHandler';
import { ApiResponse } from '../../utils/APIResponse';
import { APIAsyncHandler } from '../../utils/APIAsyncHandler';

export const applicationRunning = APIAsyncHandler(async (_req, res) => {
  console.log('DEBUG');
  return res.status(StatusCodes.OK).json(new ApiResponse<string>(StatusCodes.OK, '', 'Server is Running!'));
});

export const applicationHealth = APIAsyncHandler(async (_req, res) => {
  const healthData = {
    application: healthCheckHandler.getApplicationHealth(),
    system: healthCheckHandler.getSystemHealth(),
    timestamp: Date.now(),
  };

  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse<typeof healthData>(StatusCodes.OK, healthData, 'Backend Application Status!'));
});
