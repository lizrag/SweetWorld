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
  roles: [
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
});

export default mongoose.model("Users", userSchema);

