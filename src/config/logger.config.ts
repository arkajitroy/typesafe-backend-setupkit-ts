import winston, { format, transports } from 'winston';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  verbose: 'cyan',
  debug: 'blue',
  silly: 'grey',
};

const logger = winston.createLogger({
  levels,
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
      filename: 'logs/combined.log',
      level: 'info', // Log levels for production
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: 'logs/errors.log',
      level: 'error', // Only log errors
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

// assigned colorize to logger levels
winston.addColors(logColors);

export default logger;
