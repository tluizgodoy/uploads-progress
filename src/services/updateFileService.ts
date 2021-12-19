import File from '../models/file';

export class UpdateFileService {
  async execute(id, data) {
    const file = await File.findById(id);
    if (!file) {
      return new Error('ERROR!!!');
    }
    file.filename = data.filename;
    await file.save();
    return file;
  }
}
