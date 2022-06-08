import express from "express";
import productRoutes from "./routers/productRouter.js";
import cartRoutes from "./routers/cartRouter.js";

const app = express();
const PORT = 8080;

app.use('api/', productRoutes);
app.use('api/', cartRoutes);

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
});