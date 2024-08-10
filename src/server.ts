import express from 'express';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { CORS_RESTRICTED_ORIGIN, LOCAL_SERVER_PORT } from './config/app.config';
import dbConnect from './config/db.config';
import { Route } from './api/routers';
import { requestLimiter } from './config/rateLimiter.config';
import logger from './config/logger.config';
import HTTPLogger from './config/HTTPLogger.config';

// constants
const app = express();
dotenv.config();

// middlewares-configuration
app.use(cors({ credentials: true, origin: CORS_RESTRICTED_ORIGIN }));
app.use(express.json());
app.use(compression());
app.use(HTTPLogger);
app.use(express.json({ limit: '200kb', type: 'application/json' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(requestLimiter);

// Routing Configuration
app.use('/api/v1', Route);

// Server and Database Connection
dbConnect()
  .then(() => {
    app.listen(LOCAL_SERVER_PORT, () => {
      logger.info(`The Backend Server is running @${LOCAL_SERVER_PORT}`);
    });
  })
  .catch((error: Error) => {
    logger.error('Failed to connect to the database:', error.message);
  });

// ============================== (Start the Server using Cluster, only for Big scale Application) ===================
// const server = () => {
//   dbConnect()
//     .then(() => {
//       app.listen(LOCAL_SERVER_PORT, () => {
//         console.log('The Backend Server is running @PORT', LOCAL_SERVER_PORT);
//       });
//     })
//     .catch((error: Error) => {
//       console.error('Failed to connect to the database:', error.message);
//     });
// };
// start server using cluster
// startCluster(server);
