// =========================================== (MAIN SERVER FILE) ============================================

import { createServer } from 'http';
import { AppServer } from './app';
import dbConnect from './config/db.config';
import logger from './config/logger.config';
import { LOCAL_SERVER_PORT } from './config/app.config';
import useSocketIo from './config/socket.config';

// initialization and configurations
const HTTPServer = createServer(AppServer);
const socketServer = useSocketIo(HTTPServer);

// server connections
dbConnect()
  .then(() => {
    HTTPServer.listen(() => {
      logger.info(`The Backend Server is running @${LOCAL_SERVER_PORT}`);
    });

    socketServer.on('connection', (socket) => {
      logger.debug(`New client is connected: id - ${socket.id}`);

      // Example: Handling a custom event 'message'
      socket.on('message', (data) => {
        console.log(`Message received: ${data}`);
        // Broadcasting to all clients except sender
        socket.broadcast.emit('message', data);
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        logger.info(`Client disconnected: ${socket.id}`);
      });
    });
  })
  .catch((error) => logger.error('Failed to connect database', error));
