import config from '../utils/environment';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CreateFileService from '../services/createFileService';

export default class CreateFileController {
  async handle(request: Request, response: Response) {
    const service = new CreateFileService();
    const { file } = request;
    if (config.get('SAVE_LOCAL')) {
      file.url = `${request.get('Host')}/static/${file.filename}`;
    } else {
      file.url = file.path;
    }
    const newFile = await service.execute(file);
    return response.status(StatusCodes.CREATED).json(newFile);
  }
}
