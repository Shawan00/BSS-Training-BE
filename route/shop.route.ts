import { Router } from "express";
import { createShop, getShop } from "../controller/shop.controller";

const route: Router = Router();

route.get("/shop/:shopifyDomain", getShop);
route.post("/shop", createShop);

export default route;