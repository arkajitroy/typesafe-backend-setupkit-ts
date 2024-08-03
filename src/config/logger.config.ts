import fs from 'fs';
import path from 'path';
import winston, { format, transports } from 'winston';
import { logColors, logLevels } from '../constants/logger.constants';

// Ensure the log directory exists
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  levels: logLevels,
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json(), // Default to JSON format
  ),
  transports: [
    // Console transport for development environment
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ level, message, timestamp }) => {
          return `${timestamp} ${level}: ${message}`;
        }),
      ),
      level: 'silly', // Log all levels
    }),
    // File transport for production environment
    new transports.File({
      filename: path.resolve(logDir, 'combined.log'),
      level: 'info', // Log levels for production
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: path.resolve(logDir, 'errors.log'),
      level: 'error', // Only log errors
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

// Assigned colors to logger levels
winston.addColors(logColors);

export default logger;
