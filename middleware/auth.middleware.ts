import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../helpers/jwtToken.helper";
import { AppDataSource } from "../config/connect.config";
import { Shop } from "../models/shop";

export const authAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers["authorization"];

  if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
    return (res.status(401).json({ message: "You are not logged in" }));
  }

  const accessToken = bearerToken.split(" ")[1];
  const tokenDecoded = verifyToken(accessToken, "access");

  if (!tokenDecoded) {
    return (res.status(401).json({ message: "You are not logged in" }));
  }

  const existingShop = await AppDataSource.getRepository(Shop).findOneBy({
    shopifyDomain: tokenDecoded.shopifyDomain
  })
  if (!existingShop) {
    return res.status(401).json({ message: "Shop not found" });
  }

  res.locals.shop = existingShop;
  next();
}