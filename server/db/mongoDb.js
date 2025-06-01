import mongoose from "mongoose";

const mongoDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongoUri);
    console.log(`MonogoDb connected at ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default mongoDb;
