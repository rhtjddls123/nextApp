import { MongoClient } from 'mongodb';

const url =
  'mongodb+srv://admin:kotjddls1@cluster0.1pxgydp.mongodb.net/?retryWrites=true&w=majority';
const options = { useNewUrlParser: true };
let connectDB: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url).connect();
}

export { connectDB };
