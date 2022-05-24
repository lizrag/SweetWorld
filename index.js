import express from "express";
import productRoutes from "./routers/productRouter.js";

const app = express();
const PORT = 8080;

app.use('/', productRoutes);

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
});