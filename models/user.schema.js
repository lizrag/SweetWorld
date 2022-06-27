import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  /*
  role_id: {
    type: Schema.Types.ObjectId,
    ref: "user_roles",
  },*/
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  user_roles: [
    {
      role: {
        type: String,
        required: true,
      },
      created_at: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  carts: [
    {
      product_id: {
        type: Schema.Types.ObjectId,
        ref: "Products",
      },
      total: {
        type: Number,
        required: false,
      },
      created_at: {
        type: Date,
        default: Date.now(),
      },
      status: {
        type: Boolean,
        required: true,
        default: 1,
      },
      products: [
        {
          products_id: {
            type: Schema.Types.ObjectId,
            ref: "Products",
          },
          quantity: {
            type: Number,
          },
        }
      ],
    }
  ],
});

export default mongoose.model("Users", userSchema);

