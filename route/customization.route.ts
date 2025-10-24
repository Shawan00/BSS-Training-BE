import { Router } from "express";
import { authAccessToken } from "../middleware/auth.middleware";
import { getCustomization, upsertCustomization } from "../controller/customization.controller";

const route: Router = Router();

route.get("/customization", authAccessToken, getCustomization)
route.put("/customization", authAccessToken, upsertCustomization)

export default route