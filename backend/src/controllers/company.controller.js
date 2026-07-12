import asyncHandler from "../middlewares/asyncHandler.js";

import companyService from "../services/company.service.js";

import validateRequest from "../validations/validateRequest.js";

import { createCompanySchema } from "../validations/company.validation.js";

import sendResponse from "../utils/sendResponse.js";

import HTTP_STATUS from "../constants/httpStatus.js";

import MESSAGES from "../constants/messages.js";

export const createCompany = asyncHandler(async (req, res) => {
    const payload = validateRequest(createCompanySchema, req.body);

    const company = await companyService.create(payload.companyName);

    return sendResponse(res, {
        statusCode: HTTP_STATUS.CREATED,
        message: MESSAGES.COMPANY_CREATED,
        data: company,
    });
});

export const getCompanies = asyncHandler(async (req, res) => {
    const companies = await companyService.findAll();

    return sendResponse(res, {
        message: "Companies fetched successfully",
        data: companies,
    });
});

export const deleteCompany = asyncHandler(async (req, res) => {
    await companyService.delete(req.params.id);

    return sendResponse(res, {
        message: MESSAGES.COMPANY_DELETED,
    });
});