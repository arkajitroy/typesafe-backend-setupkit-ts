import multer from 'multer';
import fs from 'fs';
import path from 'path';

const tempDir = path.join(__dirname, '../../public/temp');

const diskStorage = multer.diskStorage({
  destination: (req, file, callbackHandler) => {
    // Check if the directory exists, if not, create it
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    callbackHandler(null, tempDir);
  },
  filename: (req, file, callbackHandler) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    callbackHandler(null, `${file.fieldname}-${uniqueSuffix}`);
  },
});

// Create the Multer upload instance with the configured storage
const uploadMiddleware = multer({ storage: diskStorage });

export { uploadMiddleware };
