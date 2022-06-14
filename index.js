import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", userRoutes);
app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const user = 'sweetworld';
const password=  'oSgppqKX2wLmz9qB';
const db = 'sweetworld';

const uri = `mongodb+srv://${user}:${password}@cluster0.xqzud.mongodb.net/${db}?retryWrites=true&w=majority`;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongodb connected'))
  .catch((e) => console.log('error', e));


