import { Router } from "express";


import {

    createItem,

    getItemsByCompany,

    getItemsByOrganization,

    deleteItem

}

    from "../controllers/item.controller.js";



const router = Router();



router.post(
    "/",
    createItem
);



router.get(
    "/company/:companyId",
    getItemsByCompany
);



router.get(
    "/organization/:organizationId",
    getItemsByOrganization
);



router.delete(
    "/:id",
    deleteItem
);



export default router;