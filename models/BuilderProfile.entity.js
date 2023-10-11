import mongoose from "mongoose";

const schema = new mongoose.Schema({
  _id: String,
  avatar: String,
  title: String,
  subtitle: String,
  description: String,
  userId: String,
  themeStyle:String,
  bgImage:String,
  carouselToggle:String,
  carouselImgs:Array,
  links: Object,

});

const BuilderProfileModel = mongoose.model("builderProfile", schema);

export default BuilderProfileModel;
