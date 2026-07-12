import mongoose from "mongoose";
import Item from "../models/item.model.js";
import Company from "../models/company.model.js";
import ApiError from "../utils/ApiError.js";
import HTTP_STATUS from "../constants/httpStatus.js";

class ItemService {
    async create(payload) {
        const { companyId, itemName, type } = payload;

        if (!mongoose.Types.ObjectId.isValid(companyId)) {
            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Invalid company id"
            );
        }

        const company = await Company.findById(companyId);

        if (!company) {
            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Company not found"
            );
        }

        const exists = await Item.findOne({
            companyId,
            itemName,
        }).collation({
            locale: "en",
            strength: 2,
        });

        if (exists) {
            throw new ApiError(
                HTTP_STATUS.CONFLICT,
                "Medicine already exists in this company"
            );
        }

        try {
            return await Item.create({
                companyId,
                itemName,
                type,
            });
        } catch (error) {
            if (error.code === 11000) {
                throw new ApiError(
                    HTTP_STATUS.CONFLICT,
                    "Medicine already exists in this company"
                );
            }

            throw error;
        }
    }

    async findByCompany(companyId) {
        if (!mongoose.Types.ObjectId.isValid(companyId)) {
            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Invalid company id"
            );
        }

        const company = await Company.findById(companyId);

        if (!company) {
            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Company not found"
            );
        }

        return await Item.find({ companyId }).sort({
            itemName: 1,
        });
    }

    async delete(itemId) {
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            throw new ApiError(
                HTTP_STATUS.BAD_REQUEST,
                "Invalid item id"
            );
        }

        const item = await Item.findById(itemId);

        if (!item) {
            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Medicine not found"
            );
        }

        await item.deleteOne();

        return item;
    }
}

export default new ItemService();