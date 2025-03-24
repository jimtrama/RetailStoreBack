import { Request, Response } from "express";
import Purchase from "../schemas/purchase.schema";
import Product from "../schemas/product.schema";
import Customer from "../schemas/customer.schema";
import { validationResult } from "express-validator";

export async function getAll(req: Request, res: Response) {
  try {
    const purchases = await Purchase.find();
    res.status(200).json({ purchases });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getPurchase(req: Request, res: Response) {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(300).json({ errors: result.array() });
      return;
    }
    const id = req.headers["id"];
    const purchases = await Purchase.find({ _id: id });
    if (purchases.length == 0) {
      res.status(300).json({ message: "Purchase not found" });
      return;
    }
    res.status(200).json({ purchases });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getPurchaseEta(req: Request, res: Response) {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(300).json({ errors: result.array() });
      return;
    }
    const id = req.headers["id"];
    const purchases = await Purchase.find({ _id: id });
    if (purchases.length == 0) {
      res.status(300).json({ message: "Purchase not found" });
      return;
    }
    const eta = purchases[0].eta;
    res.status(200).json({ eta });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getPurchasesofCustomer(req: Request, res: Response) {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(300).json({ errors: result.array() });
      return;
    }

    const email = req.headers["email"];
    const id = req.headers["id"];

    let customer;
    if (!!id) {
      customer = await Customer.findOne({ _id: id });
    } else if (!!email) {
      customer = await Customer.findOne({ email });
    }
    if (!customer) {
      res
        .status(300)
        .json({ message: `user with email ${email} doesn't exist` });
      return;
    }

    const purchases = await Purchase.find({ email:customer.email });
    res.status(200).json({ purchases });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function createPurchase(req: Request, res: Response) {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(300).json({ errors: result.array() });
      return;
    }

    const purchace: any = {};
    const products = <{ count: number; id: string }[]>req.body["products"];
    const email = <string>req.body["email"];

    let sum = 0;
    //Checking id's validity and stock availiablity
    let productsOfLAterRef: any = {};
    for (let productToBeBought of products) {
      let product = await Product.findById(productToBeBought.id);
      if (!product) {
        res.status(300).json({
          message: `product with id: ${productToBeBought.id} doesn't exist`,
        });
        return;
      }
      if (product.stock < productToBeBought.count) {
        res.status(300).json({
          message: `product with id: ${productToBeBought.id} not enough in stock `,
          requested: productToBeBought.count,
          availiable: product.stock,
        });
        return;
      }
      productsOfLAterRef[productToBeBought.id] = product;
      sum += product.price * productToBeBought.count;
    }

    let customer = await Customer.find({ email });

    if (customer.length == 0) {
      res
        .status(300)
        .json({ message: `user with email ${email} doesn't exist` });
      return;
    }
    for (let productToBeBought of products) {
      await Product.findOneAndUpdate(
        { _id: productToBeBought.id },
        {
          stock:
            productsOfLAterRef[productToBeBought.id].stock -
            productToBeBought.count,
        }
      );
    }
    await Customer.updateOne({ email }, { points: customer[0].points + sum });

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
