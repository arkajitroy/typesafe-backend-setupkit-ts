import cors, { CorsOptions } from 'cors';
import { CORS_ALLOWED_ORIGIN } from './app.config';

export const corsConfig: CorsOptions = {
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
  origin: (origin, callback) => {
    const allowedOrigins = CORS_ALLOWED_ORIGIN;
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

export const corsMiddleware = cors(corsConfig);
