import multer from 'multer';

const diskStorage = multer.diskStorage({
  destination: (req, file, callbackHandler) => {
    callbackHandler(null, './public/temp');
  },
  filename: (req, file, callbackHandler) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    callbackHandler(null, `${file.fieldname}-${uniqueSuffix}`);
  },
});

// Create the Multer upload instance with the configured storage
const uploadMiddleware = multer({ storage: diskStorage });

export { uploadMiddleware };
