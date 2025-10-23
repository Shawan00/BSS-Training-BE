import express, { Express, Request, Response } from "express";
import { AppDataSource } from "./config/connect.config";
import bodyParser from "body-parser";
import shopRoute from "./route/shop.route";
import customizationRoute from "./route/customization.route";
import translationRoute from "./route/translation.route";

const app: Express = express();

AppDataSource.initialize().then(() => {
  console.log("Connected to database");

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(shopRoute);
  app.use(customizationRoute);
  app.use(translationRoute);

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  })

}).catch((error) => {
  console.log("Error connecting to database", error);
  process.exit(1);
})