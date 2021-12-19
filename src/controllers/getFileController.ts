import { Request, Response } from 'express';
import { GetFileService } from '../services/getFileService';

export default class GetFileController {
  async handle(request: Request, response: Response) {
    const service = new GetFileService();
    const file = await service.execute(request.params.id);
    return response.json(file);
  }
}
