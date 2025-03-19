import express  from "express";
import customersRoutes from './routes/customers/customers';
const app = express();
const port = 3000;

app.use(express.json()) 
app.use("/customers",customersRoutes)

app.get("/",(req,res)=>{
    res.send("Hey")
})

app.listen(3000,()=>{
    console.log(`Running on port ${port}`);
})