import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  status: {
    type: Boolean,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  total: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  cart_products: [
    {
      cart_id: {
        type: Schema.Types.ObjectId,
        ref: "cart",
      },
      products_id: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      quantity: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("cart", cartSchema);
