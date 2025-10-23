import { AppDataSource } from "../config/connect.config"
import { Shop } from "../models/shop"
import { Request, Response } from "express";

export const getShop = async (req: Request, res: Response) => {
  try {
    const shop = await AppDataSource.getRepository(Shop).findOneBy({
      shopifyDomain: req.params.shopifyDomain as string
    })

    if (!shop) return res.status(404).json({ message: "Shop not found" })
    return res.status(200).json({ message: "Shop found", data: shop })

  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error })
  }
}

export const createShop = async (req: Request, res: Response) => {
  try {
    const {shopifyDomain, shopOwner} = req.body;

    if (!shopifyDomain || !shopOwner) return res.status(400).json({ message: "Shopify domain and shop owner are required" });

    const existingShop = await AppDataSource.getRepository(Shop).findOneBy({
      shopifyDomain
    })
    if (existingShop) return res.status(409).json({ message: "Shopify domain already exists" });

    const shop = AppDataSource.getRepository(Shop).create({
      shopifyDomain,
      shopOwner
    })
    await AppDataSource.getRepository(Shop).save(shop);
    return res.status(201).json({ message: "Shop created successfully", data: shop })
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error })
  }
}