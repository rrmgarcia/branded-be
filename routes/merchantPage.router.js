import { Router } from "express";
import Merchant from "../objects/Merchant.js";

const router = Router();

router.get("/:title", async (req, res) => {
  try {
    const title = req.params.title;

    const merchant = new Merchant();
    const foundMerchant = await merchant.findMerchantByTitle(title);

    if (!foundMerchant) {
      return res.status(404).json({ error: "Merchant not found" });
    }

    res.status(200).json(foundMerchant);
  } catch (error) {
    console.error("Error finding merchant by title:", error);
    res.status(500).json({ error: "Internal server error" });
  }

  router.get("/", async (req, res) => {
    try {
      const merchant = new Merchant();
      const merchants = await merchant.findAllMerchants();

      if (merchants.length === 0) {
        // Check if merchants is an empty array
        return res.status(404).json({ message: "No merchants found" });
      }

      res.status(200).json(merchants);
    } catch (error) {
      console.error("Error retrieving merchants:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
});

export default router;
