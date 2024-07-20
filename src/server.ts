import express from 'express';
import cors from 'cors';
import compression from 'compression';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { LOCAL_SERVER_PORT } from './config/config';
import dbConnect from './config/db.config';
import { Route } from './api/routers';

// Constants
const app = express();
dotenv.config();

// middlewares-configuration
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(compression());
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Routing Configuration
app.use('/api/v1', Route);
app.use('/uploads', express.static('uploads'));

// Server and Database Connection
dbConnect()
  .then(() => {
    app.listen(LOCAL_SERVER_PORT, () => {
      console.log('The Backend Server is running @PORT', LOCAL_SERVER_PORT);
    });
  })
  .catch((error: Error) => {
    console.error('Failed to connect to the database:', error.message);
  });
