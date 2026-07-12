import asyncHandler from "../middlewares/asyncHandler.js";
import companyService from "../services/company.service.js";
import validate from "../utils/validate.js";
import { createCompanySchema } from "../validations/company.validation.js";
import ApiResponse from "../utils/ApiResponse.js";
import HTTP_STATUS from "../constants/httpStatus.js";
import MESSAGES from "../constants/messages.js";

export const createCompany = asyncHandler(async (req, res) => {
    const payload = validate(createCompanySchema, req.body);

    const company = await companyService.create(payload.companyName);

    return res.status(HTTP_STATUS.CREATED).json(
        new ApiResponse({
            message: MESSAGES.COMPANY_CREATED,
            data: company,
        })
    );
});

export const getCompanies = asyncHandler(async (req, res) => {
    const companies = await companyService.findAll();

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse({
            message: "Companies fetched successfully",
            data: companies,
        })
    );
});

export const deleteCompany = asyncHandler(async (req, res) => {
    await companyService.delete(req.params.id);

    return res.status(HTTP_STATUS.OK).json(
        new ApiResponse({
            message: MESSAGES.COMPANY_DELETED,
        })
    );
});