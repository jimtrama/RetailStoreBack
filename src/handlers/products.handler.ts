import { Request, Response } from "express";
import Product from "../schemas/product.schema";
import { validationResult } from "express-validator";

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
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(300).json({ errors: result.array() });
      return;
    }
    
    const id = req.headers["id"];
    const products = await Product.find({ _id: id });
    res.status(200).json({ products });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(300).json({ errors: result.array() });
      return;
    }
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(300).json({ errors: result.array() });
      return;
    }
    const id = req.headers["id"];
    const values = req.body;

    if (Object.keys(values)?.includes("_id")) {
      res.status(300).json({ message: `sorry id shoudn't be updated` });
      return;
    }

    const product = await Product.findOneAndUpdate({ _id: id }, values);
    if (!product) {
      res.status(300).json({ message: `product with id ${id} not found` });
      return;
    }
    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(300).json({ errors: result.array() });
      return;
    }
    const id = req.headers["id"];
    const product = await Product.findOneAndDelete({ _id: id });
    if (!product) {
      res.status(300).json({ message: `product with id ${id} not found` });
      return;
    }
    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}