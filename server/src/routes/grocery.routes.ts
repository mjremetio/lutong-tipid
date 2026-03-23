import { Router } from "express";
import { handleGetGroceryList } from "../controllers/grocery.controller.js";

const router = Router();

router.get("/:planId", handleGetGroceryList);

export default router;
