import { Request, Response } from "express";

export function getAll(req:Request,res:Response){
    res.send([])
}

export function getCustomer(req:Request,res:Response){
    const id = req.params["id"]
    res.send([id])
}
type D = {D:string}
export function createCustomer(req:Request<{},{},D>,res:Response){
    const body = req.body;
    console.log(body);
    console.log(body["D"]);
    
    res.send("d")
}