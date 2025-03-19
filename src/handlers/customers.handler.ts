import { Request, Response } from "express";
import Customer from "../schemas/customer.schema";

export function getAll(req: Request, res: Response) {
  res.send([]);
}

export function getCustomer(req: Request, res: Response) {
  const id = req.params["id"];
  res.send([id]);
}

export async function createCustomer(req: Request, res: Response) {
  try {
    const customer = await Customer.create(req.body);
    res.status(200).json(customer);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
