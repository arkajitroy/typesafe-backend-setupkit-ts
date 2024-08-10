/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import path from 'path';
import { Writable } from 'stream';
import { logLevels, logColors } from '../constants/logger.constants';
import winston from 'winston';

// Configure log colors
winston.addColors(logColors);

const logDirectory = path.resolve(__dirname, '../logs');
try {
  console.log('Checking if log directory exists [APPLICATION]');
  if (!fs.existsSync(logDirectory)) {
    // console.log('Log directory does not exist. Creating...');
    fs.mkdirSync(logDirectory, { recursive: true });
  } else {
    // console.log('Log directory already exists.');
  }
} catch (err) {
  console.error('Error while checking/creating log directory:', err);
}

// Generate the log file name based on the current date
const getLogFileName = () => {
  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  return path.join(logDirectory, `application-${date}.log`);
};

// Function to create a write stream to the log file
const createLogStream = () => {
  const logFileName = getLogFileName();
  return fs.createWriteStream(logFileName, { flags: 'a' }); // 'a' for append mode
};

// Create the write stream for the current day
let logStream = createLogStream();

// Check if the log file needs to be rotated (new day)
const checkLogRotation = () => {
  const currentLogFileName = getLogFileName();
  if (logStream.path !== currentLogFileName) {
    logStream.end(); // Close the current stream
    logStream = createLogStream(); // Open a new stream
  }
};

// Custom Writable stream class
class CustomLogStream extends Writable {
  _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void) {
    try {
      checkLogRotation();
      logStream.write(chunk, encoding, callback);
    } catch (err: any) {
      callback(err);
    }
  }
}

// Custom transport for winston that uses the custom writable stream
const customFileTransport = new winston.transports.Stream({
  stream: new CustomLogStream(),
});

// Create the Winston logger
const logger = winston.createLogger({
  levels: logLevels,
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, stack }) => {
      const log = `${timestamp} [${level}]: ${stack || message}`;
      return process.env.NODE_ENV !== 'production' ? winston.format.colorize().colorize(level, log) : log;
    }),
  ),
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
    }),
    customFileTransport, // Use the custom file transport
  ],
  exitOnError: false, // Prevent the logger from exiting after logging an error
});

export default logger;
