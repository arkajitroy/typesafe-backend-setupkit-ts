import express from 'express';
import compression from 'compression';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { Route } from './api/routers';
import { requestLimiter } from './config/rateLimiter.config';
import HTTPLogger from './config/HTTPLogger.config';
import { corsConfig } from './config/cors.config';
import { helmetConfig } from './config/helmet.config';

// constants
const app = express();
dotenv.config();

// middlewares-configuration
app.use(corsConfig);
app.use(helmetConfig);
app.use(express.json());
app.use(compression());
app.use(HTTPLogger);
app.use(express.json({ limit: '200kb', type: 'application/json' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(requestLimiter);

// Routing Configuration
app.use('/api/v1', Route);

export const AppServer = () => app;
