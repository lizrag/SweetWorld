import express from "express";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";

const app = express();
const PORT = 8080;

app.use("api/", productRoutes);
app.use("api/", cartRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
