import { Request, Response } from "express";
import Purchase from "../schemas/purchase.schema";

export async function getAll(req: Request, res: Response) {
  try {
    const purchases = await Purchase.find();
    res.status(200).json({purchases});
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function createPurchase(req: Request, res: Response) {
  try {
    const purchase = await Purchase.create(req.body);
    res.status(200).json(purchase);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
