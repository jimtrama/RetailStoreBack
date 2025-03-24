import { Request, Response } from "express";
import Customer from "../schemas/customer.schema";
import Purchase from "../schemas/purchase.schema";
import { validationResult } from "express-validator";
import crypto from 'crypto';

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
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(300).json({ errors: result.array() });
      return;
    }
    const email = req.headers["email"];
    const id = req.headers["id"];
    let customer;
    if (!!id) {
      customer = await Customer.findById(id);
    } else {
      customer = (await Customer.find({ email }))[0];
      if (!customer) {
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
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(300).json({ errors: result.array() });
      return;
    }
    const shasum = crypto.createHash('sha1')
    shasum.update(req.body["password"])
    req.body["password"] = shasum.digest('hex')
    const customer = await Customer.create(req.body);
    res.status(200).json(customer);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateCustomer(req: Request, res: Response) {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(300).json({ errors: result.array() });
      return;
    }

    const values = req.body;
    const email = req.headers["email"];
    const id = req.headers["id"];

    let customer;
    if (!!id) {
      customer = await Customer.findOneAndUpdate({_id:id},values);
    }else if(!!email){
      customer = await Customer.findOne({ email });
    }
    
    if (!customer) {
      res.status(300).json({ message: `user not found` });
      return;
    }

    res.status(200).json(customer);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteCustomer(req: Request, res: Response) {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(300).json({ errors: result.array() });
      return;
    }
    const email = req.headers["email"];
    const id = req.headers["id"];
    if (!!id) {
      const customer = await Customer.findByIdAndDelete(id);
      if (!!customer) {
        res.status(200).json(customer);
        return;
      }
    }
    if (!!email) {
      const customer = await Customer.findOneAndDelete({ email });
      if (!!customer) {
        res.status(200).json(customer);
        return;
      }
    }
    res.status(300).json({ message: `user with email ${email} not found` });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

//Delete Customer and his relative Purchases
export async function deepDeleteCustomer(req: Request, res: Response) {
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
      customer = await Customer.findById(id);
    }else if(!!email){
      customer = await Customer.findOne({ email });
    }
    
    if (!customer) {
      res.status(300).json({ message: `user not found` });
      return;
    }

    let purchase;
    do {
      purchase = await Purchase.findOneAndDelete({ email:customer.email });
    } while (!!purchase);

    const deletedC = await Customer.findOneAndDelete({ email:customer.email });
    res.status(200).json(deletedC);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
