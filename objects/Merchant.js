import MerchantModel from "../models/Merchant.entity.js";

class Merchant {
  constructor() {
    this.secret = process.env.JWT_SECRET;
  }
  getMerchantByUserId(userId) {
    console.log("BE userId", userId);
    return MerchantModel.findOne({ userId });
  }

  async createOrUpdateMerchant(merchantData) {
    console.log("BE objects:", merchantData);
    try {
      const productObjects = merchantData.products.map((product) => ({
        link: product.link,
        name: product.name,
        category: product.category,
        image: product.image,
      }));

      const filter = { userId: merchantData.userId }; // Define the filter based on userId

      const update = {
        userId: merchantData.userId,
        avatar: merchantData.avatar,
        title: merchantData.title,
        subtitle: merchantData.subtitle,
        links: merchantData.links,
        description: merchantData.description,
        themeStyle: merchantData.themeStyle,
        bgImage: merchantData.bgImage,
        carouselImgs: merchantData.carouselImgs,
        carouselToggle: merchantData.carouselToggle,
        product: productObjects,
      };

      // Use findOneAndUpdate with upsert option set to true
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };

      const updatedMerchant = await MerchantModel.findOneAndUpdate(
        filter,
        update,
        options
      );

      return updatedMerchant;
    } catch (error) {
      console.error("Error creating/updating merchant:", error);
      throw error;
    }
  }

  findMerchantByTitle(title) {
    return MerchantModel.findOne({ title: title });
  }
  async findAllMerchants() {
    try {
      // Assuming you have a 'merchants' collection/table
      const merchants = await this.database
        .collection("merchants")
        .find({})
        .toArray();
      return merchants;
    } catch (error) {
      throw error;
    }
  }
}

export default Merchant;
