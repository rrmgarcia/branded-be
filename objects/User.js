import UserModel from "../models/User.entity.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class User {
  constructor() {
    this.secret = process.env.JWT_SECRET;
  }

  async login(username, password) {
    const user = await UserModel.findOne({ username });
    if (!user) {
      throw new Error("Username not found");
    } else {
      const result = await bcrypt.compare(password, user.password);

      if (result) {
        const parsedUser = JSON.parse(JSON.stringify(user));
        delete parsedUser.password;
        return {
          token: jwt.sign(parsedUser, this.secret, {
            expiresIn: "3d",
          }),
          userId: user._id,
        };
      } else {
        return "";
      }
    }
  }

  async createUser(user) {
    const { email, username, password } = user;
    if (!email || !username || !password) {
      throw new Error("All fields are required");
    }

    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      throw new Error("Username or email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      ...user,
      _id: uuidv4(),
      password: hash,
    });
    const savedUser = newUser.save();
    return savedUser;
  }

  updateUserById(id, updatedUser) {
    return UserModel.findByIdAndUpdate({ _id: id }, updatedUser, {
      new: true,
    });
  }
}

export default User;
