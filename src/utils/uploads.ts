import { extname, join } from 'path';
import multer, { Options } from 'multer';
import config from './environment';
import { v4 as uuid } from 'uuid';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const uploadsDir = config.get('UPLOADS_DIR');

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
});

const multerStorage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, uploadsDir);
  },
  filename: (request, file, callback) => {
    const uniqueSuffix = uuid();
    callback(
      null,
      file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
    );
  },
});

const multerOptions: Options = {
  storage: config.get('SAVE_LOCAL') ? multerStorage : cloudinaryStorage,
};

const upload = multer(multerOptions);

export default upload;
