import { Router } from "express";
import {
  createCustomer,
  deleteCustomer,
  deepDeleteCustomer,
  getAll,
  getCustomer,
  updateCustomer,
} from "../handlers/customers.handler";
import { body, header } from "express-validator";

export function isIdorEmailChain() {
  return header("")
    .custom((value) => {
      const email = value["email"];
      const id = value["id"];
      if (!email && !id) {
        return null;
      }

      return value;
    })
    .withMessage("Email or Id is required");
}
export function checkEmail() {
  return header("email").if(header("email").notEmpty()).isEmail();
}

const router = Router();
router.get("/", getAll);

router.get("/one", isIdorEmailChain(), checkEmail(), getCustomer);

router.post(
  "/new",
  body("lastName").notEmpty().isLength({ max: 50 }),
  body("firstName").notEmpty().isLength({ max: 50 }),
  body("email").notEmpty().isEmail().isLength({ max: 50 }),
  body("password").notEmpty().isLength({ min: 8, max: 50 }),
  checkEmail(),
  createCustomer
);

router.put(
  "/update",
  isIdorEmailChain(),
  checkEmail(),
  body("email").isEmpty().withMessage("You can't update the email"),
  updateCustomer
);

router.delete("/delete", isIdorEmailChain(), checkEmail(), deleteCustomer);

router.delete(
  "/deep-delete",
  isIdorEmailChain(),
  checkEmail(),
  deepDeleteCustomer
);

export default router;
