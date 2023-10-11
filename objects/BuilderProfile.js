import BuilderProfileModel from "../models/BuilderProfile.entity.js";
import { v4 as uuidv4 } from "uuid";

class BuilderProfile {
  constructor() {}

  async createBuilderProfile(builderProfileData) {
    
    try {
      // console.log(builderProfileData)
      const builderProfile = new BuilderProfileModel({
        _id: uuidv4(),
        avatar: builderProfileData.avatar,
        title: builderProfileData.title,
        subtitle: builderProfileData.subtitle,
        links: builderProfileData.links,
        description: builderProfileData.description,
        userId: builderProfileData.userId,
        themeStyle: builderProfileData.themeStyle,
        bgImage: builderProfileData.bgImage,
        carouselImgs: builderProfileData.carouselImgs,
        carouselToggle:builderProfileData.carouselToggle
      });

      const savedBuilderProfile = await builderProfile.save();
      return savedBuilderProfile;
    } catch (error) {
      throw new Error(error);
    }
  }

  findBuilderProfileById(userId) {
    return BuilderProfileModel.findOne({ userId });
  }

  deleteBuilderProfileById(id) {
    return BuilderProfileModel.findByIdAndRemove(id);
  }

  async updateBuilderProfileById(userId, updatedBuilderProfile) {
    try {
      const updatedProfile = await BuilderProfileModel.findOneAndUpdate(
        { userId: userId },
        updatedBuilderProfile,
        {
          new: true,
        }
      );

      if (!updatedProfile) {
        throw new Error("Profile not found");
      }

      return updatedProfile;
    } catch (err) {
      console.error("Error updating builder profile:", err);
      throw new Error("Failed to update builder profile");
    }
  }
  

  async addProductToBuilderProfile(builderProfileId, productData) {
    try {
      const {
        link,
        name,
        image,
        category,
        themeStyle,
        bgImage,
        carouselImgs,carouselToggle,
      } = productData;

      const builderProfile = await BuilderProfileModel.findById(
        builderProfileId
      );

      if (!builderProfile) {
        throw new Error("Builder profile not found");
      }

      const newProduct = {
        _id: uuidv4(),
        link,
        name,
        category,
        Image: image,
        themeStyle,
        bgImage,
        carouselImgs,
        carouselToggle,
      };

      builderProfile.products.push(newProduct);

      const savedBuilderProfile = await builderProfile.save();

      return savedBuilderProfile;
    } catch (error) {
      console.error("Error adding product to builder profile:", error);
      throw new Error(error) ;
    }
  }
}

export default BuilderProfile;
