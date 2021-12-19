import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { DeleteFileService } from '../services/deleteFileService';

export default class DeleteFileController {
  async handle(request: Request, response: Response) {
    const service = new DeleteFileService();
    const result = await service.execute(request.params.id);
    if (result instanceof Error) {
      return response.json({ error: result.message });
    }
    return response.sendStatus(StatusCodes.NO_CONTENT);
  }
}
