import { StatusCodes } from 'http-status-codes';
import { APIAsyncHandler } from '../../utils/APIAsyncHandler';
import { UserModel } from '../../schemas';
import { ApiError } from '../../utils/ErrorHandler';
import { uploadOnCloudinary } from '../../utils/cloudinary';
import { ApiResponse } from '../../utils/APIResponse';
import { generateHashedPassword, isPasswordCorrect } from '../../utils/AuthUtilities';
import { generateAccessAndRefreshTokens } from '../../utils/JWT';
import { cookieOptions } from '../../config/cookies.config';
import { UpdateQuery } from 'mongoose';
import { IUser } from '../../@types/models/IUser';
import { IAuthRequest } from '../../@types/others/TExpress';
import jwt from 'jsonwebtoken';
import { JWT_REFRESH_TOKEN_SECRET_KEY } from '../../config/config';
import { TJWTDecodedToken } from '../../@types/others/TJwt';

export const registerUser = APIAsyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  // Access avatar and cover image path safely
  const avatarLocalPath = files.avatar?.[0]?.path ?? '';
  const coverImageLocalPath = files.coverImage?.[0]?.path ?? '';

  if (!avatarLocalPath) throw new ApiError(StatusCodes.BAD_REQUEST, 'Avatar file is required');

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) throw new ApiError(StatusCodes.BAD_REQUEST, 'Avatar file is required');

  const newUserPayload = {
    username: username.toLowerCase(),
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || '',
    email,
    password: await generateHashedPassword(password),
  };

  const user = await new UserModel(newUserPayload).save();

  const newUserInstance = await UserModel.findById(user._id).select('-password -refreshToken');

  if (!newUserInstance) throw new ApiError(StatusCodes.CONFLICT, 'Something went wrong while creation!');

  return res
    .status(StatusCodes.CREATED)
    .json(new ApiResponse(StatusCodes.OK, newUserInstance, 'Successfully user has been registered!'));
});

export const loginUser = APIAsyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  const userInstance = await UserModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!userInstance) throw new ApiResponse(StatusCodes.NOT_FOUND, 'N/A', 'User does not exisit!');

  // checking the password is correct or not
  const isPasswordValid = await isPasswordCorrect(userInstance.password, password);
  if (!isPasswordValid) throw new ApiResponse(StatusCodes.UNAUTHORIZED, 'Invalid User Credentials!');

  // Generate Access and Refresh Token
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(userInstance._id);

  // Fetch the user without sensitive data
  const loggedInUserInstance = await UserModel.findById(userInstance._id).select('-password -refreshToken');

  return res
    .status(StatusCodes.OK)
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        {
          user: loggedInUserInstance,
          accessToken,
          refreshToken,
        },
        'User Logged in successfully!',
      ),
    );
});

export const logoutUser = APIAsyncHandler(async (req, res) => {
  const { user } = req as unknown as IAuthRequest;

  const logoutMutationPayload: UpdateQuery<IUser> = {
    $unset: { refreshToken: 1 },
  };

  // updating the user status
  await UserModel.findByIdAndUpdate(user._id, logoutMutationPayload, { new: true });

  return res
    .status(StatusCodes.OK)
    .clearCookie('accessToken', cookieOptions)
    .clearCookie('refreshToken', cookieOptions)
    .json(new ApiResponse(StatusCodes.OK, {}, 'User has been Logged Out!'));
});

export const changeCurrentPassword = APIAsyncHandler(async (req, res) => {
  const { user } = req as unknown as IAuthRequest;
  const { oldPassword, newPassword } = req.body;

  // initially fetching the stored user instance
  const userInstance = await UserModel.findById(user?._id);

  if (!userInstance) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!');

  const validPassword = await isPasswordCorrect(userInstance.password, oldPassword);
  if (!validPassword) throw new ApiError(StatusCodes.NOT_FOUND, 'Invalid Password!');

  // setting new password
  userInstance.password = await generateHashedPassword(newPassword);
  await userInstance.save({ validateBeforeSave: false });

  return res.status(StatusCodes.OK).json(new ApiResponse(StatusCodes.OK, {}, 'Password Changed Successfully!'));
});

export const getCurrentUser = APIAsyncHandler(async (req, res) => {
  const { user } = req as unknown as IAuthRequest;
  return res
    .status(StatusCodes.OK)
    .json(new ApiResponse(StatusCodes.OK, { user }, 'Successfully Fetched Current User!'));
});

export const refreshAccessToken = APIAsyncHandler(async (_req, res, next) => {
  const req = _req as unknown as IAuthRequest;
  const incommingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incommingRefreshToken) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized Request');

  try {
    const decodedToken = jwt.verify(incommingRefreshToken, JWT_REFRESH_TOKEN_SECRET_KEY) as TJWTDecodedToken;
    const userInstance = await UserModel.findById(decodedToken._id);

    if (!userInstance) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid Refresh Token');

    if (incommingRefreshToken !== userInstance?.refreshToken) {
      throw new ApiError(401, 'Refresh token is expired or used');
    }

    const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshTokens(userInstance._id);

    return res
      .status(StatusCodes.OK)
      .cookie('accessToken', accessToken, cookieOptions)
      .cookie('refreshToken', newRefreshToken, cookieOptions)
      .json(new ApiResponse(StatusCodes.OK, { accessToken, refreshToken: newRefreshToken }, 'Access Token refreshed!'));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(new ApiError(401, error?.message || 'Invalid refresh token'));
  }
});

// export const updateAccountDetails = APIAsyncHandler(async (req, res) => {
//   const { fullName, email } = req.body;
// });
