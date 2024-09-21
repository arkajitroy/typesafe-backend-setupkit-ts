import cors from 'cors';
import { CORS_RESTRICTED_ORIGIN } from './app.config';

export const corsConfig = cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
  origin: CORS_RESTRICTED_ORIGIN,
  credentials: true,
});
