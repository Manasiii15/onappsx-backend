import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGODB_STRING}/${process.env.MONGODB_COLLECTION_NAME}`
    );
    console.log("Database connention Succefully");
  } catch (error) {
    console.log("Database Connection Error: ", error);
  }
};

export default connectDB;
