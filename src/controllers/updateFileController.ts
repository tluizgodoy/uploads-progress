import { Request, Response } from 'express';
import { UpdateFileService } from '../services/updateFileService';

export default class UpdateFileController {
  async handle(request: Request, response: Response) {
    const service = new UpdateFileService();
    const result = await service.execute(request.params.id, request.body);
    if (result instanceof Error) {
      return response.json({ error: result.message });
    }
    return response.json(result);
  }
}
