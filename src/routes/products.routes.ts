import { Router } from "express";
import { createProduct, deleteProduct, getAll, getProduct, updateProduct } from "../handlers/products.handler";
const router = Router();

router.get("/",getAll);
router.get("/one",getProduct);
router.post("/new",createProduct);
router.put("/update",updateProduct);
router.delete("/delete",deleteProduct);

export default router;