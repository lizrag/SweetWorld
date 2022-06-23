import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import authMiddleware from "./middlewares/auth.middleware.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", cartRoutes);
app.use("/api", authMiddleware, productRoutes);
app.use("/api", authMiddleware,userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

const uri = `mongodb+srv://${process.env.user}:${process.env.password}@cluster0.xqzud.mongodb.net/${process.env.db}?retryWrites=true&w=majority`;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongodb connected"))
  .catch((e) => console.log("error", e));
