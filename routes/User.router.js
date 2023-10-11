import { Router } from "express";
import User from "../objects/User.js";

const router = Router();

//Creating User Account
router.post("/register", async (req, res) => {
  const user = new User();
  const body = req.body;
  try {
    const savedUser = await user.createUser(body);
    const userId = savedUser._id;

    res.status(201).json({ user: savedUser, userId: userId });
  } catch (error) {
    res.status(500).send("An error occurred during user registration.");
  }
});

//Updating User Account
router.put("/:id", async (req, res) => {
  const user = new User();
  const userId = req.params.id;
  const updatedUserData = req.body;

  try {
    const updatedUser = await user.updateUserById(userId, updatedUserData);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).send("An error occurred while updating user data");
  }
});
export default router;
