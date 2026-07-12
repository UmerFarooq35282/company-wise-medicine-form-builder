import asyncHandler from "../middlewares/asyncHandler.js";
import organizationService from "../services/organization.service.js";
import validateRequest from "../validations/validateRequest.js";
import { createOrganizationSchema } from "../validations/organization.validation.js";
import sendResponse from "../utils/sendResponse.js";
import HTTP_STATUS from "../constants/httpStatus.js";

export const createOrganization = asyncHandler(async (req, res) => {
    const payload = validateRequest(createOrganizationSchema, req.body);

    const organization = await organizationService.create(
        payload.organizationName
    );

    return sendResponse(res, {
        statusCode: HTTP_STATUS.CREATED,
        message: "Organization created successfully",
        data: organization,
    });
});

export const getOrganizations = asyncHandler(async (req, res) => {
    const organizations = await organizationService.findAll();

    return sendResponse(res, {
        message: "Organizations fetched successfully",
        data: organizations,
    });
});

export const deleteOrganization = asyncHandler(async (req, res) => {
    await organizationService.delete(req.params.id);

    return sendResponse(res, {
        message: "Organization deleted successfully",
    });
});