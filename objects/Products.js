import ProductModel from "../models/Products.entity.js";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class Products {
  constructor() {
    this.secret = process.env.JWT_SECRET;
  }

  async findProductsByUserId(userId) {
    try {
      return await ProductModel.findOne({ userId });
    } catch (error) {
      console.error("Error finding all Products:", error);
      throw error;
    }
  }

  async createProduct(req, productData) {
    console.log("BE object:", productData);

    try {
      const newProduct = new ProductModel({
        _id: uuidv4(),
        userId: productData.userId,
        productDetails: productData.productDetails, // Assign the productDetails array directly
      });

      console.log("BE object newProduct:", newProduct);

      const savedProduct = await newProduct.save();
      console.log("BE object savedProduct:", savedProduct);
      return savedProduct;
    } catch (error) {
      console.error("Error creating Product:", error);
      throw error;
    }
  }
  async deleteProductByProductId(productId) {
    console.log("BE object", { productId });
    try {
      const result = await ProductModel.updateOne(
        { "productDetails.productId": productId },
        { $pull: { productDetails: { productId: productId } } }
      );

      console.log("MongoDB update result:", result);

      if (result.nModified === 1) {
        console.log(
          `Product with productId ${productId} deleted successfully.`
        );
      } else {
        console.log(`Product with productId ${productId} not found.`);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  async updateProductDetails(userId, updatedProductDetails) {
    console.log("BE products", updatedProductDetails);
    try {
      // Find the product document by userId
      const product = await ProductModel.findOne({ userId });

      if (!product) {
        throw new Error("Product document not found for the user.");
      }

      product.productDetails.push(updatedProductDetails);

      // Save the updated product document
      const savedProduct = await product.save();
      return savedProduct;
    } catch (error) {
      console.error("Error updating product details:", error);
      throw error;
    }
  }
}

export default Products;
