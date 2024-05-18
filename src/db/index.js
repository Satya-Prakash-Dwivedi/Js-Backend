import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) // mongoose gives an return object,so we can store it in variable also. so we can hold the response.
    console.log(`\n MongoDB Connected !! DB HOST : ${connectionInstance.connection.host}`) // after console.log, learn what it contains
  } catch (error) {
    console.log("MongoDB connection failed", error);
    process.exit(1); // preiosuly we used throw err, but node provide this process.exit(n) method , study it seperately.

  }
}

export default connectDB;