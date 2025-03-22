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
    const id = req.headers["id"];
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

export async function updateProduct(req: Request, res: Response) {
  try {
    const id = req.body["id"];
    const values = req.body["values"];

    if (!id || !values) {
      res.status(300).json({ message: `id and values must be present` });
      return;
    }

    if (Object.keys(values)?.includes("_id")) {
      res.status(300).json({ message: `sorry id shoudn't be updated` });
      return;
    }

    const product = await Product.findOneAndUpdate({ _id:id }, values);
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
    const id = req.body["id"];
    if (!id) {
      res.status(300).json({ message: `id must be present` });
      return;
    }
    const product = await Product.findOneAndDelete({ _id:id });
    if (!product) {
      res.status(300).json({ message: `product with id ${id} not found` });
      return;
    }
    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}