import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

export const connectDB = async() => {
  try{
    await mongoose.connect(process.env.MONGO_URL);
    
    console.log("MongoDB connected successfully");
  } catch(error){
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

