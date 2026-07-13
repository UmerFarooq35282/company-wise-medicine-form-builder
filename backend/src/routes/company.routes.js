import { Router } from "express";


import {

    createCompany,

    getCompanies,

    getCompaniesByOrganization,

    deleteCompany,

    getCompanyById


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

router.get("/:id", getCompanyById);


export default router;