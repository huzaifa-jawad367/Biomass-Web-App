import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

let cached = global.mongoose || { conn: null, promise: null };

export default async function dbConnect() {
  try{
    await mongoose.connect(MONGODB_URI, {});
    console.log('Database connected successfully');
  }catch(error) {
    console.log("error while connecting to database",error);
}
  // if (cached.conn) {
  //   return cached.conn;
  // }

  // if (!cached.promise) {
  //   const options = {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   };

  //   cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => mongoose);
  // }

  // cached.conn = await cached.promise;
  // return cached.conn;
}
