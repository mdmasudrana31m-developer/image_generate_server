import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Database connected Succesfulyy");
    })
    .catch((err) => {
      console.log("Database connection failed", err);
    });
};
