import { Request, Response } from 'express';
import { GetAllFilesServices } from '../services/getAllFilesService';

export default class GetAllFilesController {
  async handle(request: Request, response: Response) {
    const service = new GetAllFilesServices();
    const files = await service.execute();
    return response.json(files);
  }
}
