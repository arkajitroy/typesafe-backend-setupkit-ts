import mongoose from 'mongoose';
import { DATABASE_NAME, MONGODB_LOCAL_URI } from './app.config';

const dbConnect = async (): Promise<typeof mongoose> => {
  const atlasUri = MONGODB_LOCAL_URI;
  const databaseName = DATABASE_NAME;
  const db_uri = `${atlasUri}/${databaseName}`;

  mongoose.set('strictQuery', true);

  const connection = await mongoose.connect(db_uri);
  console.log('Successfully Connected to MongoDB @PORT', MONGODB_LOCAL_URI);
  return connection;
};

export default dbConnect;
