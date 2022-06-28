import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  status: {
    type: Schema.Types.Boolean,
    default: true,
  },
  total: {
    type: Schema.Types.Number,
    required: false,
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

export default mongoose.model("Carts", cartSchema);
