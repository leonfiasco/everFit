import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.sr8ifqi.mongodb.net/`
  );
};

export default connectDB;
