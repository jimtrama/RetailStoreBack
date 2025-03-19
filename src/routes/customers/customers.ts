import { Router } from "express";
import { createCustomer, getAll, getCustomer } from "../../handlers/customers/customers";
const router = Router();

router.get("/",getAll);
router.get("/:id",getCustomer);
router.post("/new",createCustomer);

export default router;