import { Request, Response } from "express";
import { AppDataSource } from "../config/connect.config";
import { Shop } from "../models/shop";

const upsertCustomization = async (req: Request, res: Response) => {
  try {
    const { shopifyDomain } = req.params;
    const {
      inputWidth,
      inputHeight,
      inputBorder,
      inputBorderRadius,
      inputBackgroundColor,
      buttonVariant,
      buttonWidth,
      buttonHeight,
      buttonBorder,
      buttonBorderRadius,
      buttonBackgroundColor,
      buttonTextColor,
      direction,
      css,
    } = req.body;

    const shop = await AppDataSource.getRepository(Shop).findOneBy({
      shopifyDomain: shopifyDomain as string
    })
    if (!shop) return res.status(404).json({ message: "Shop not found" });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error })
  }
}