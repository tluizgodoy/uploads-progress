import File from '../models/file';

export default class CreateFileService {
  async execute(file) {
    const newFile = new File({ filename: file.filename, url: file.url });
    await newFile.save();
    return newFile;
  }
}
