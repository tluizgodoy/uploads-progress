import { Router } from 'express';
import upload from './utils/uploads';
import CreateFileController from './controllers/createFileController';
import DeleteFileController from './controllers/deleteFileController';
import GetAllFilesController from './controllers/getAllFilesController';
import GetFileController from './controllers/getFileController';
import UpdateFileController from './controllers/updateFileController';

const routes = Router();

routes
  .route('/upload')
  .get(new GetAllFilesController().handle)
  .post(upload.single('file'), new CreateFileController().handle);

routes
  .route('/upload/:id')
  .get(new GetFileController().handle)
  .put(new UpdateFileController().handle)
  .delete(new DeleteFileController().handle);

export default routes;
