import mongoose from "mongoose";

const schema = new mongoose.Schema({
  _id: String,
  email: String,
  username: String,
  password: String,
});

const UserModel = mongoose.model("user", schema);

export default UserModel;
