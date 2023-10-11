import { Router } from "express";
import Products from "../objects/Products.js";
import BuilderProfile from "../objects/BuilderProfile.js";
import Merchant from "../objects/Merchant.js";
const router = Router();

// Get builder profile and products by userId
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const product = new Products();
    const builderProfile = new BuilderProfile();

    // Retrieve the builder profile by userId
    const userProfile = await builderProfile.findBuilderProfileById(userId);

    // Retrieve the products associated with the same userId
    const userProducts = await product.findProductsByUserId(userId);

    res.json({ userProfile, userProducts });
  } catch (error) {
    console.error("Error fetching builder profile and products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



router.post("/", async (req, res) => {
  try {

    const merchant = new Merchant()
    const merchantData = req.body;

    // Call the createOrUpdateMerchant method to create or update a merchant
    const updatedMerchant = await merchant.createOrUpdateMerchant(merchantData);

    console.log("Saved/Updated merchant data:", updatedMerchant);

    res.status(201).json(updatedMerchant);
  } catch (error) {
    console.error("Error creating/updating merchant:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get('/merchant/:userId', async (req, res) => {
  try {
    
    const userId = req.params.userId;
    const merchant = new Merchant();
    console.log("BE route - Searching for userId:", userId);
    
    
    const newMerchant = await merchant.getMerchantByUserId(userId);
    
    if (!newMerchant) {
      console.log("Merchant not found for userId:", userId);
      return res.status(404).json({ message: 'Merchant not found' });
    }

    res.json(newMerchant);
  } catch (error) {
    console.error('Error getting merchant profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  });

  router.delete("/merchant/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
    
      const merchant = new Merchant();
      
      const deletedMerchant = await merchant.deleteMerchantByuserId(userId);
      if (!deletedMerchant) {
        return res.status(404).json({ message: "Merchant not found" });
      }
      res.json({ message: "Merchant deleted successfully" });
    } catch (error) {
      console.error("Error deleting merchant profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


export default router;



