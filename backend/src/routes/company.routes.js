import { Router } from "express";

import {
    createCompany,
    deleteCompany,
    getCompanies,
} from "../controllers/company.controller.js";

const router = Router();

router.post("/", createCompany);

router.get("/", getCompanies);

router.delete("/:id", deleteCompany);

export default router;