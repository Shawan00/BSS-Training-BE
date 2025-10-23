import { Router } from "express";
import { 
  getAllTranslations, 
  createTranslation, 
  updateTranslation, 
  deleteTranslation 
} from "../controller/translation.controller";
import { authAccessToken } from "../middleware/auth.middleware";

const route: Router = Router();

route.use(authAccessToken);

route.get("/translations", getAllTranslations);

route.post("/translations", createTranslation);

route.put("/translations", updateTranslation);

route.delete("/translations/:locale", deleteTranslation);

export default route;

