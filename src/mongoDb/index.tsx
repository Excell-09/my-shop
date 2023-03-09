import mongoose from 'mongoose';

const URL: string | undefined = process.env.MONGO_URL;

const connectMongo = async () => mongoose.connect(URL as string);

export default connectMongo;
