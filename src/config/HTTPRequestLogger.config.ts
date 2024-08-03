import morgan from 'morgan';
import logger from './logger.config';

// Morgan HTTP request logger configuration
const HTTPRequestLogger = morgan('combined', {
  stream: {
    write: (message: string) => logger.info(message.trim()),
  },
  skip: (req, res) => res.statusCode < 400, // Only log requests with status codes >= 400
});

export default HTTPRequestLogger;
