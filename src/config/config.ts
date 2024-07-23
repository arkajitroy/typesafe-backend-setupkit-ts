import { generateJWTTokenExpiryTime } from '../utils/JWT';

// CONSTANTS
export const LOCAL_IP = '127.0.0.1';
export const LOCAL_SERVER_PORT = 4000;
export const LOCAL_MONGO_PORT = 27017;

// DATABASE CONNECTIONS
export const MONGODB_LOCAL_URI = `mongodb://${LOCAL_IP}:${LOCAL_MONGO_PORT}`;
export const DATABASE_NAME = 'nodejs-archive';

// CLOUDINARY CONNECTION DETAILS
export const CLOUDINARY_CLOUD_NAME = 'dsziy2idq';
export const CLOUDINARY_API_KEY = '827268933232514';
export const CLOUDINARY_API_SECRET = 'KTnn37SxQjuCmXLU8mYeC4cIrmU';

// JWT-AUTHENTICATIONS
export const JWT_ACCESS_TOKEN_SECRET_KEY = '843b3d3a120cdc5e38be93315a8cd1d402546177ee4e1fbdaf6c7edc5f';
export const JWT_TOKEN_EXPIRY = generateJWTTokenExpiryTime(30, 'd');
export const JWT_REFRESH_TOKEN_SECRET_KEY = 'sdf54qwezxcf54sd65f4sdiojgonv5fs5df4s6d45f5s41bvxvxcxtyuyjgh';

// APP-URL
export const LOCAL_APP_URL = `http://${LOCAL_IP}:${LOCAL_SERVER_PORT}`;
