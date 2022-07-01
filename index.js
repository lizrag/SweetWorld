import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import authMiddleware from "./middlewares/auth.middleware.js";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerSpec from "./config/swagger.config.js"

dotenv.config();
const app = express();

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerSpec)));
app.use(cors());

app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", authMiddleware,cartRoutes);
app.use("/api", authMiddleware, productRoutes);
app.use("/api", authMiddleware, userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xqzud.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("mongodb connected"))
  .catch((e) => console.log("error", e));
