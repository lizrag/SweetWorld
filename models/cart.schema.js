import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  status: {
    type: Boolean,
    required: true,
    default: 1
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  total: {
    type: Number,
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  cart_products: [
    {
      cart_id: {
        type: Schema.Types.ObjectId,
        ref: "Carts",
      },
      products_id: {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
      quantity: {
        type: Number,
      },
    },
  ],
});

export default  mongoose.model("Carts", cartSchema);

