import { Request, Response } from "express";
import { AppDataSource } from "../config/connect.config";
import { Customization } from "../models/customization";
import { Shop } from "../models/shop";

export const getCustomization = async (req: Request, res: Response) => {
  try {
    const shop = res.locals.shop
    const customization = await AppDataSource.getRepository(Customization).findOne({
      where: {
        shopifyDomain: shop.shopifyDomain,
      },
    })
    
    if (!customization) {
      return res.status(404).json({ message: "Customization not found" })
    }
    return res.status(200).json({
      message: "Customization fetched successfully",
      data: customization,
    })

  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch customization", error: error })
  }
}

export const upsertCustomization = async (req: Request, res: Response) => {
  try {
    const {
      inputWidth,
      inputHeight,
      inputBorder,
      inputBorderRadius,
      inputBackgroundColor,
      buttonVariant,
      borderWidth,
      borderColor,
      buttonWidth,
      buttonHeight,
      buttonBorder,
      buttonBackgroundColor,
      buttonTextColor,
      direction,
      css,
    } = req.body;
    const shop: Shop = res.locals.shop;

    await AppDataSource.getRepository(Customization).upsert({
      shopifyDomain: shop.shopifyDomain,
      inputWidth,
      inputHeight,
      inputBorder,
      inputBorderRadius,
      inputBackgroundColor,
      buttonVariant,
      borderWidth,
      borderColor,
      buttonWidth,
      buttonHeight,
      buttonBorder,
      buttonBackgroundColor,
      buttonTextColor,
      direction,
      css,
    }, ['shopifyDomain'])

    return res.status(200).json({
      message: "Customization upsert successfully",
    })

  } catch (error) {
    return res.status(500).json({ message: "Failed to upsert customization", error: error })
  }
}