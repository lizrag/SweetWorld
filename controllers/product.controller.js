import Products from "../models/product.schema.js";

class ProductController {
  constructor() {
    this.products = [];
  }

  getProducts = async (req, res) => {
    try {
      const keyword = req.query.keyword;
      if (keyword) {
        const productsFilteredArray = await this.getProductsByKeyword(keyword);
        return res.json(productsFilteredArray);
      }

      const arrayProducts = await Products.find();
      return res.json(arrayProducts);
    } catch (error) {
      return res.json({ success: false, message: error });
    }
  };

  getProductsByKeyword = async (keyword) => {
    const arrayProducts = await Products.find({
      name: { $regex: `.*${keyword}` },
    });
    return arrayProducts;
  };

  getProductById = async (req, res) => {
    const productId = req.params.product_id;
    try {
      const product = await Products.findById(productId);
      return res.json(product);
    } catch (error) {
      return res.json({ success: false, message: error });
    }
  };

  createProduct = async (req, res) => {
    let productData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
    };
    try {
      await Products.create(productData);
    } catch (error) {
      return res.json({ success: false, message: error });
    }
    return res.json(productData);
  };

  updateProduct = async (req,res) =>{
    try{
      const productId = req.params.product_id;
      const updates = req.body;
      const product = await Products.findByIdAndUpdate(productId,updates);
      res.send(product);
    }catch(error){
      return res.json({ success: false, message: error });
    }
  };


  deleteProduct = async (req, res) => {
    const productId = req.params.product_id;
    try {
      const product = await Products.findById(productId);
      await product.remove();
      return res.send({success:true});
    } catch (error) {
      return res.json({ success: false, message: error });
    }
  };
};

export default new ProductController();
