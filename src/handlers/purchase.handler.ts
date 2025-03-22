import { Request, Response } from "express";
import Purchase from "../schemas/purchase.schema";
import Product from "../schemas/product.schema";
import Customer from "../schemas/customer.schema";

export async function getAll(req: Request, res: Response) {
  try {
    const purchases = await Purchase.find();
    res.status(200).json({ purchases });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function createPurchase(req: Request, res: Response) {
  try {
    const purchace: any = {};
    const products = <[]>req.body["products"];
    const email = <string>req.body["email"];

    if (products.length == 0) {
      res.status(300).json({ message: "products array can't be empty" });
      return;
    }

    let sum = 0;
    //Checking id's validity
    for (let id of products) {
      let product = await Product.findById(id);
      if (!product) {
        res
          .status(300)
          .json({ message: `product with id: ${id} doesn't exist` });
        return;
      }
      sum+=product.price;
    }

    if (!email) {
      res.status(300).json({ message: "email is invalid" });
      return;
    }

    let customer = await Customer.find({ email });

    if (customer.length == 0) {
      res
        .status(300)
        .json({ message: `user with email ${email} doesn't exist` });
      return;
    }

    await Customer.updateOne({email},{points:customer[0].points + sum})

    purchace["products"] = products;
    purchace["email"] = email;
    purchace["totalAmount"] = sum;

    const purchase = await Purchase.create(purchace);
    res.status(200).json(purchase);
  } catch (error: any) {
    if (error.message.includes("Cast to ObjectId failed")) {
      res.status(300).json({ message: "At least one product id is invalid" });
      return;
    }
    res.status(500).json({ message: error.message });
  }
}
