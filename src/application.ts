import { constants } from 'fs';
import { access, mkdir } from 'fs/promises';
import 'dotenv/config';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import config from './utils/environment';
import routes from './routes';

type CustomFile = Express.Multer.File & { url?: string };

declare module 'express' {
  export interface Request {
    file: CustomFile;
  }
}

const application = express();

application.use(express.json());
application.use(express.urlencoded({ extended: true }));
application.use(compression());
application.use(helmet());
application.use(cors());
config.get('IS_DEV') && application.use(morgan('dev'));

(async () => {
  if (config.get('SAVE_LOCAL')) {
    try {
      await access(config.get('UPLOADS_DIR'), constants.W_OK);
    } catch (err) {
      try {
        await mkdir(config.get('UPLOADS_DIR'));
      } catch (err) {
        console.warn(err);
      }
    }
    application.use('/static', express.static(config.get('UPLOADS_DIR')));
  }
})();

application.use(routes);

export default application;
