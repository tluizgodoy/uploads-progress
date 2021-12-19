import File from '../models/file';

export class GetAllFilesServices {
  async execute() {
    const files = await File.find();
    return files;
  }
}
