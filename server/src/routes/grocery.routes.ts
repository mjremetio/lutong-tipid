import { Router } from "express";
import { handleGetGroceryList } from "../controllers/grocery.controller";

const router = Router();

router.get("/:planId", handleGetGroceryList);

export default router;
