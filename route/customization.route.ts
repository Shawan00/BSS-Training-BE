import { Router } from "express";
import { authAccessToken } from "../middleware/auth.middleware";
import { upsertCustomization } from "../controller/customization.controller";

const route: Router = Router();

route.put("/customization", authAccessToken, upsertCustomization)

export default route