import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { unlinkSync } from 'fs';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '../config/app.config';

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath: string): Promise<UploadApiResponse | null> => {
  if (!localFilePath) return null;

  try {
    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });

    // Remove the locally saved temporary file
    unlinkSync(localFilePath);

    return response;
  } catch (error) {
    // Remove the locally saved temporary file in case of an error
    unlinkSync(localFilePath);

    return null;
  }
};

export { uploadOnCloudinary };
