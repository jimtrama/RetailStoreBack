import { Router } from "express";
import {
  createCustomer,
  deleteCustomer,
  deepDeleteCustomer,
  getAll,
  getCustomer,
  updateCustomer,
} from "../handlers/customers.handler";
const router = Router();

router.get("/", getAll);
router.get("/one", getCustomer);
router.post("/new", createCustomer);
router.put("/update", updateCustomer);
router.delete("/delete", deleteCustomer);
router.delete("/deep-delete", deepDeleteCustomer);

export default router;