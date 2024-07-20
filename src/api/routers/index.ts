import express from 'express';
import { UserRouter } from './users.routes';

export const Route = express.Router();

// Routes with connected subroutes
Route.use('/users', UserRouter);
