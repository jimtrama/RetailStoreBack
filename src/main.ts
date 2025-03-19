import express from "express";
import customersRoutes from "./routes/customers.routes";
import productsRoutes from "./routes/products.routes";
import mongoose from "mongoose";
const app = express();
const port = 3000;
const uri = "mongodb+srv://admin:@main.40cm2.mongodb.net/?retryWrites=true&w=majority&appName=main";

app.use(express.json());
app.use("/customers", customersRoutes);
app.use("/products", productsRoutes);

mongoose.connect(uri).then(() => {
  console.log("Connected to db !");
  app.listen(port, () => {
    console.log(`Running on port ${port}`);
  });
});
