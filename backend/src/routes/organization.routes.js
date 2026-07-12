import { Router } from "express";

import {
    createOrganization,
    getOrganizations,
    deleteOrganization,
} from "../controllers/organization.controller.js";

const router = Router();

router.post("/", createOrganization);

router.get("/", getOrganizations);

router.delete("/:id", deleteOrganization);

export default router;