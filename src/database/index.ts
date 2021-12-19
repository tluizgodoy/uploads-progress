import mongoose from 'mongoose';
import config from '../utils/environment';

const databaseUri = config.get('DATABASE_URI');

(async () => {
  await mongoose.connect(databaseUri);
})();
