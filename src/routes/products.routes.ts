import { Router } from "express";
import { createProduct, deleteProduct, getAll, getProduct, updateProduct } from "../handlers/products.handler";
import { body, header } from "express-validator";
const router = Router();

router.get("/",getAll);
router.get("/one",
    header('id').notEmpty(),
    getProduct);
router.post("/new",
    body('title').notEmpty(),
    body('price').notEmpty().isInt({min:0}),
    createProduct);
router.put("/update",
    header('id').notEmpty(),
    body('stock').if(body('stock').notEmpty()).isInt({min:0}),
    body('').notEmpty(),
    updateProduct);
router.delete("/delete",
    header('id').notEmpty(),
    deleteProduct);

export default router;