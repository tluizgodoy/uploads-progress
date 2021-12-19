import File from '../models/file';

export class DeleteFileService {
  async execute(id: string) {
    try {
      await File.findByIdAndDelete(id);
    } catch (err) {
      return err;
    }
  }
}
