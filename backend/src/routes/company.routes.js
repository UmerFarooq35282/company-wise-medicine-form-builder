import { Router } from "express";


import {

    createCompany,

    getCompanies,

    getCompaniesByOrganization,

    deleteCompany


}
    from "../controllers/company.controller.js";



const router = Router();



router.post(
    "/",
    createCompany
);



router.get(
    "/",
    getCompanies
);



router.get(
    "/organization/:organizationId",
    getCompaniesByOrganization
);



router.delete(
    "/:id",
    deleteCompany
);



export default router;