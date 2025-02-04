import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

export default connect;
