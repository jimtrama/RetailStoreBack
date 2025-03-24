import { Router } from "express";
import {
  createPurchase,
  getAll,
  getPurchase,
  getPurchaseEta,
  getPurchasesofCustomer,
} from "../handlers/purchase.handler";
import { body, header } from "express-validator";
import { checkEmail, isIdorEmailChain } from "./customers.routes";
const router = Router();

router.get("/", getAll);
router.get("/one", 
  header("id").notEmpty(),
  getPurchase);
router.post("/new",
  body("email").notEmpty().isEmail(),
  body("products")
    .notEmpty()
    .custom((products) => {
      if (products.length == 0) {
        return null;
      }
      for(let product of products ){
        if(!Object.keys(product).includes("id") || !Object.keys(product).includes("count") || typeof product.count != typeof 5 ){
            return null;
        }
      }
      return products;
    }),
  createPurchase
);
router.get("/of-customer", 
  isIdorEmailChain(),
  checkEmail(),
  getPurchasesofCustomer);
router.get("/one/eta",
  header("id").notEmpty(),
  getPurchaseEta);

export default router;