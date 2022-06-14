import Products from "../models/product.schema.js";

class ProductController {
  constructor() {
    this.products = [];
  }

  getProducts = async (req, res) => {
    try {
      const arrayProducts = await Products.find();
      res.json(arrayProducts);
    } catch (error) {
      res.json({success:false,message:error})
    }
  };

  getProductById = async (req, res) => {
    const idProduct = req.params.id;
    try {
      const productId = await Products.findOne(idProduct);
      res.json(productId);
    } catch (error) {
      res.json({success:false,message:error})
    }
  };

  getProductsByKeyword = async (req, res) => {
    const keyword = req.body.keyword;
    try{
      let productByKeyword = await Products.find({description:{$regex:`.*${keyword}`}});
      res.json(productByKeyword);
    }catch(error){
      res.json({success:false,message:error})
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
      res.json({success:false,message:error})
    }
    return res.json(productData);
  };

  deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
      let productDelete = await Products.findByIdAndDelete({ _id: id });
      if (!productDelete) {
        console.log(404, "ID not found");
      } else {
        console.log(productDelete);
      }
    } catch (error) {
      res.json({success:false,message:error})
    }
    return res.send("Product was deleted sucessfully");
  };
}
export default new ProductController();
