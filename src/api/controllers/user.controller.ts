import { StatusCodes } from 'http-status-codes';
import { APIAsyncHandler } from '../../utils/APIAsyncHandler';
import { UserModel } from '../../schemas';
import { ApiError } from '../../utils/ErrorHandler';
import { uploadOnCloudinary } from '../../utils/cloudinary';
import { ApiResponse } from '../../utils/APIResponse';
import { generateHashedPassword } from '../../utils/generateHashedPassword';

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
