import multer from 'multer';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', 'uploads/img'));
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
