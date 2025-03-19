import { Request, Response } from "express";
import Product from "../schemas/product.schema";

export async function getAll(req: Request, res: Response) {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getProduct(req: Request, res: Response) {
  try {
    const id = req.params["id"];
    const products = await Product.find({_id:id});
    res.status(200).json({ products });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
