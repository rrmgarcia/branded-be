import { Router } from "express";
import BuilderProfile from "../objects/BuilderProfile.js";

const router = Router();

//Creating Builder Profile
router.post("/", async (req, res) => {
  const builderProfile = new BuilderProfile();
  const body = req.body;

  try {
    const savedBuilderProfile = await builderProfile.createBuilderProfile(body);
    res.json(savedBuilderProfile);
  } catch (error) {
    res.status(500).send("An error occurred while creating builder profile");
  }
});

//Getting Builder Profile
router.get("/:id", async (req, res) => {
  const builderProfile = new BuilderProfile();
  const builderProfileId = req.params.id;

  try {
    const currentBuilderProfile = await builderProfile.findBuilderProfileById(
      builderProfileId
    );
    res.json(currentBuilderProfile);
  } catch (error) {
    res.status(500).send("An error occurred while getting builder profile");
  }
});

//Deleting Builder Profile
router.delete("/:id", async (req, res) => {
  const builderProfile = new BuilderProfile();
  const builderProfileId = req.params.id;

  try {
    const deletedBuilderProfile = await builderProfile.deleteBuilderProfileById(
      builderProfileId
    );
    res.json(deletedBuilderProfile);
  } catch (error) {
    res.status(500).send("An error occurred while deleting builder profile");
  }
});
//Editing Builder Profile
router.put("/:id", async (req, res) => {
  const builderProfile = new BuilderProfile();
  const userId = req.params.id;
  const updatedBuilderProfileData = req.body;
  try {
    const updatedBuilderProfile = await builderProfile.updateBuilderProfileById(
      userId,
      updatedBuilderProfileData
    );
    res.json(updatedBuilderProfile);
  } catch (error) {
    res.status(500).send("An error occurred while updating builder profile");
  }
});


export default router;
