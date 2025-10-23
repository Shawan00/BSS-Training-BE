import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Shop } from "../models/shop";
import { Translation } from "../models/translation";
import { Customization } from "../models/customization";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "bss_training",
  entities: [Shop, Translation, Customization],
  migrations: ["migrations/*.ts"],
  synchronize: false,
  logging: false,
  timezone: "+07:00",
});