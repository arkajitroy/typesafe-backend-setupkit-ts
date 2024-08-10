import fs from 'fs';
import path from 'path';
import morgan, { StreamOptions } from 'morgan';

// Create a log directory if it doesn't exist
const logDirectory = path.join(__dirname, '..', 'logs');
try {
  console.log('Checking if log directory exists [HTTP]');
  if (!fs.existsSync(logDirectory)) {
    // console.log('Log directory does not exist. Creating...');
    fs.mkdirSync(logDirectory, { recursive: true });
    console.log('Successfully created Log directory at', logDirectory);
  } else {
    // console.log('Log directory already exists.');
  }
} catch (err) {
  console.error('Error while checking/creating log directory:', err);
}

// Create a write stream (in append mode) for logging
const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), {
  flags: 'a',
});

// Define a stream object with a `write` function for morgan
const stream: StreamOptions = {
  write: (message) => accessLogStream.write(message),
};

// Set up morgan to log in 'combined' format and save to access.log
const HTTPLogger = morgan('combined', { stream });

export default HTTPLogger;
