import { Request, Response } from "express";
import Customer from "../schemas/customer.schema";
import Purchase from "../schemas/purchase.schema";

export async function getAll(req: Request, res: Response) {
  try {
    const customers = await Customer.find();
    res.status(200).json({ customers });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function getCustomer(req: Request, res: Response) {
  try {
    const email = req.headers["email"];
    const id = req.headers["id"];
    if (!email && !id) {
      res.status(300).json({ message: `email or id must be present` });
      return;
    }
    let customer;
    if (!!id) {
      customer = await Customer.findById(id);
    } else {
      customer = (await Customer.find({ email }))[0];
      if(!customer){
        res.status(300).json({ message: `user not found` });
      return;
      }
    }

    res.status(200).json(customer);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function createCustomer(req: Request, res: Response) {
  try {
    const customer = await Customer.create(req.body);
    res.status(200).json(customer);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateCustomer(req: Request, res: Response) {
  try {
    const email = req.body["email"];
    const values = req.body["values"];

    if (!email || !values) {
      res.status(300).json({ message: `email and values must be present` });
      return;
    }

    if (Object.keys(values)?.includes("email")) {
      res.status(300).json({ message: `sorry email shoudn't be updated` });
      return;
    }

    const customer = await Customer.findOneAndUpdate({ email }, values);
    if (!customer) {
      res.status(300).json({ message: `user with email ${email} not found` });
      return;
    }
    res.status(200).json(customer);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteCustomer(req: Request, res: Response) {
  try {
    const email = req.body["email"];
    if (!email) {
      res.status(300).json({ message: `email must be present` });
      return;
    }
    const customer = await Customer.findOneAndDelete({ email });
    if (!customer) {
      res.status(300).json({ message: `user with email ${email} not found` });
      return;
    }
    res.status(200).json(customer);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

//Delete Customer and his relative Purchases
export async function deepDeleteCustomer(req: Request, res: Response) {
  try {
    const email = req.body["email"];
    if (!email) {
      res.status(300).json({ message: `email must be present` });
      return;
    }
    const customer = await Customer.findOne({ email });
    if (!customer) {
      res.status(300).json({ message: `user with email ${email} not found` });
      return;
    }
    let r;
    do {
      r = await Purchase.findOneAndDelete({ email });
    } while (!!r);

    const deletedC = await Customer.findOneAndDelete({ email });
    res.status(200).json(deletedC);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
