import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  _id: String,
  userId: String,
  productDetails: [
    {
      productId: String,
      name: String,
      link: String,
      image: String,
      category: String,
      

      
    },
  ],
});

const ProductModel = mongoose.model("products", ProductSchema);

export default ProductModel;
