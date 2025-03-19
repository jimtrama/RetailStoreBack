import { Router } from "express";
import { createProduct, getAll, getProduct } from "../handlers/products.handler";
const router = Router();

router.get("/",getAll);
router.get("/:id",getProduct);
router.post("/new",createProduct);

export default router;