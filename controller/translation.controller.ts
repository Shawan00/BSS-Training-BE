import { Request, Response } from "express";
import { Translation } from "../models/translation";
import { AppDataSource } from "../config/connect.config";
import { Shop } from "../models/shop";

export const getAllTranslations = async (req: Request, res: Response) => {
  try {
    const shop: Shop = res.locals.shop;

    const translations = await AppDataSource.getRepository(Translation)
      .createQueryBuilder("translation")
      .where("translation.shopifyDomain = :shopifyDomain", { shopifyDomain: shop.shopifyDomain })
      .getMany();

    return res.status(200).json({
      message: "Translations retrieved successfully",
      data: translations
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to get translations", error });
  }
};

export const createTranslation = async (req: Request, res: Response) => {
  try {
    const shop: Shop = res.locals.shop;
    const { locale, translate } = req.body;

    if (!locale || !translate.placeholderText || !translate.buttonText) {
      return res.status(400).json({
        message: "Locale, placeholderText and buttonText are required"
      });
    }

    const existingTranslation = await AppDataSource.getRepository(Translation).findOneBy({
      shop: { shopifyDomain: shop.shopifyDomain },
      locale: locale
    });
    if (existingTranslation) {
      return res.status(409).json({ message: "Locale already exists" });
    }

    const translation = AppDataSource.getRepository(Translation).create({
      shop: shop,
      locale,
      translate
    });

    await AppDataSource.getRepository(Translation).save(translation);

    return res.status(201).json({
      message: "Translation created successfully",
      data: translation
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create translation", error });
  }
};

export const updateTranslation = async (req: Request, res: Response) => {
  try {
    const shop: Shop = res.locals.shop;
    const { locale, translate } = req.body;

    if (!locale || !translate.placeholderText || !translate.buttonText) {
      return res.status(400).json({
        message: "Locale, placeholderText and buttonText are required"
      });
    }

    const translation = await AppDataSource.getRepository(Translation).findOneBy({
      shop: { shopifyDomain: shop.shopifyDomain },
      locale: locale
    })
    if (!translation) {
      return res.status(404).json({ message: "Translation not found" });
    }
    console.log(translate)
    await AppDataSource.getRepository(Translation).update(translation.id, {
      translate: translate
    });

    return res.status(200).json({
      message: "Translation updated successfully"
    });

  } catch (error) {
    return res.status(500).json({ message: "Failed to update translation", error });
  }
};

// Xóa translation
export const deleteTranslation = async (req: Request, res: Response) => {
  try {
    const shop: Shop = res.locals.shop;
    const { locale } = req.params;

    await AppDataSource.getRepository(Translation).delete({
      shop: { shopifyDomain: shop.shopifyDomain },
      locale: locale
    })

    return res.status(200).json({
      message: "Translation deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({ message: "Failed to delete translation", error });
  }
};