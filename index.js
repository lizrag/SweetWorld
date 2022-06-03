import express from "express";
import productRoutes from "./routers/product.routes.js";

const app = express();
const PORT = 8080;

app.use('/api/', productRoutes);

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
});