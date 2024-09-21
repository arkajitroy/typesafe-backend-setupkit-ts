import express from 'express';
import { UserRouter } from './users.routes';
import { ServerRouter } from './server.routes';

export const Route = express.Router();

// Routes with connected subroutes
Route.use('/users', UserRouter);
Route.use('/server', ServerRouter);
