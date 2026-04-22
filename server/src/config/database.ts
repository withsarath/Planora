import mongoose from "mongoose";

export const connectDb = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDb is connected Succussfully: ${connection}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
