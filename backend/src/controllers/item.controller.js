import asyncHandler from "../middlewares/asyncHandler.js";
import itemService from "../services/item.service.js";
import validateRequest from "../validations/validateRequest.js";
import { createItemSchema } from "../validations/item.validation.js";
import sendResponse from "../utils/sendResponse.js";
import HTTP_STATUS from "../constants/httpStatus.js";

export const createItem = asyncHandler(async (req, res) => {
    const payload = validateRequest(createItemSchema, req.body);

    const item = await itemService.create(payload);

    return sendResponse(res, {
        statusCode: HTTP_STATUS.CREATED,
        message: "Medicine added successfully",
        data: item,
    });
});

export const getItemsByCompany = asyncHandler(async (req, res) => {
    const items = await itemService.findByCompany(req.params.companyId);

    return sendResponse(res, {
        message: "Medicines fetched successfully",
        data: items,
    });
});

export const deleteItem = asyncHandler(async (req, res) => {
    await itemService.delete(req.params.id);

    return sendResponse(res, {
        message: "Medicine deleted successfully",
    });
});