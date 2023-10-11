import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userId:String,
  avatar: String,
  title: String,
  subtitle: String,
  description: String,
  themeStyle:String,
  bgImage:String,
  carouselImgs:Array,
  carouselToggle:String,
  links: Object,
  product: [
    {
      name: String,
      productId: String,
      link: String,
      category: String,
      image: String,
    },
  ],
});

const MerchantModel = mongoose.model("merchants", schema);

export default MerchantModel;
