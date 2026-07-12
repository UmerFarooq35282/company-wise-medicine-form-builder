import mongoose from "mongoose";
import ApiError from "./ApiError.js";
import HTTP_STATUS from "../constants/httpStatus.js";

export const validateObjectId = (id, resource = "Resource") => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            `Invalid ${resource} id`
        );
    }
};