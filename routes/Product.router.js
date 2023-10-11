import { Router } from "express";
import Products from "../objects/Products.js";
import axios from "axios";
import * as cheerio from "cheerio";

const router = Router();

router.get("/", async (req, res) => {
  const product = new Products();
  const products = await product.findAllProducts();
  res.json(products);
});

router.post("/", async (req, res) => {
  try {
    const product = new Products();
    const productData = req.body;
    // console.log("be product object:",productData)

    const savedProduct = await product.createProduct(req, productData);

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating Product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const productsModel = new Products();

router.put("/:userId", async (req, res) => {
  const userId = req.params.userId; // Extract userId from URL parameter
  const updatedProductDetails = req.body; // Extract updated product details from request body
  console.log("check", updatedProductDetails);
  try {
    // Call the updateProductDetails function on the Products model to update product details
    const updatedProduct = await productsModel.updateProductDetails(
      userId,
      updatedProductDetails
    );

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product details:", error);
    res.status(500).send("Error updating product details");
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const product = new Products();
    const userProducts = await product.findProductsByUserId(userId);

    if (!userProducts) {
      return res
        .status(404)
        .json({ message: "No products found for this user." });
    }

    res.json(userProducts);
  } catch (error) {
    console.error("Error fetching user products:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.delete("/:productId", async (req, res) => {
  const productId = req.params.productId;
  const product = new Products();
  console.log("BE route", productId);
  try {
    await product.deleteProductByProductId(productId);

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Error deleting product" });
  }
});
// SCRAPE FUNCTION
router.get("/scrape/:url", async (req, res) => {
  const url = req.params.url;
  try {
    const response = await axios.get(url);
    const htmlContent = response.data;
    const $ = cheerio.load(htmlContent);

    let srcList =
      $("div.gallery-preview-panel img").first().attr("src") ||
      $("div#imgTagWrapperId").find("img.a-dynamic-image").first().attr("src");

    const title =
      $("div.pdp-mod-product-badge-wrapper h1").text() ||
      $("#productTitle").text();

    const responseData = {
      title: title || "Title Not Found",
      imageSrcList: srcList || "Image Not Found",
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error fetching website:", error);
    res.status(500).json({ error: "Error fetching website" });
  }
});

export default router;
