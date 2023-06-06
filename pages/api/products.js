import mongoose from "mongoose";
import clientPromise from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { mongooseConnection } from "@/lib/mongoose";

export default async function handle(req,res){
  const {method} = req;
  await mongooseConnection();
  if(method === 'POST'){
    const {title,description,price} = req.body;
    const productDoc = await Product.create({
      title,description,price
    })
    res.json(productDoc)
  }
}