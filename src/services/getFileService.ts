import File from '../models/file';

export class GetFileService {
  async execute(id) {
    const file = await File.findById(id);
    return file;
  }
}
