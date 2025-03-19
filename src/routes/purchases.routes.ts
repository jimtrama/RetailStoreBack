import { Router } from "express";
import { createPurchase, getAll,  } from "../handlers/purchase.handler";
const router = Router();

router.get("/",getAll);
router.post("/new",createPurchase);

export default router;