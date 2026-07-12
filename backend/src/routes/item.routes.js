import { Router } from "express";

import {
    createItem,
    deleteItem,
    getItemsByCompany,
} from "../controllers/item.controller.js";

const router = Router();

router.post("/", createItem);

router.get("/:companyId", getItemsByCompany);

router.delete("/:id", deleteItem);

export default router;