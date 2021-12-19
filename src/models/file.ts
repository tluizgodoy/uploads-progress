import { model, Schema } from 'mongoose';

const fileSchema = new Schema({
  filename: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model('file', fileSchema);
