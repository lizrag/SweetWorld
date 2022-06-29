import mongoose from "mongoose";
import Products from "./product.schema.js";
import Carts from "./cart.schema.js";

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  status: {
    type: Schema.Types.Boolean,
    default: true,
  },
  total: {
    type: Schema.Types.Number,
    default: 0,
  },
  created_at: {
    type: Schema.Types.Date,
    default: Date.now(),
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  products: [
    {
      product_id: {
        type: Schema.Types.ObjectId,
        ref: "Products",
      },
      quantity: {
        type: Schema.Types.Number,
      },
    },
  ],
});

cartSchema.methods.getTotal = async function () {
  let total = 0;

  if (this.products.length == 0) {
    await Carts.findByIdAndUpdate(this._id, {
      total: 0,
    });
  } else {
    this.products.forEach(async (product) => {
      const { price } = await Products.findById(product.product_id);
      total += price * product.quantity;

      await Carts.findByIdAndUpdate(this._id, {
        total,
      });
    });
  }
};

export default mongoose.model("Carts", cartSchema);
