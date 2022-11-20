import mongoose from 'mongoose';

const connectDB = async () => {
  const {
    MONGO_DB_USERNAME: userName,
    MONGO_DB_PASSWORD: password,
    MONGO_DB_NAME: dbName
  } = process.env;
  const uri = `mongodb+srv://${userName}:${password}@cluster-inviteyou.kid5qox.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(uri);
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.log('Fail to connect MongoDB');
    console.log(error);
  }
};

export default connectDB;