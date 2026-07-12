import ApiError from "./ApiError.js";
import HTTP_STATUS from "../constants/httpStatus.js";

const validate = (schema, payload) => {
    const { error, value } = schema.validate(payload, {
        abortEarly: false,
        stripUnknown: true,
    });

    if (error) {
        throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            error.details.map((item) => item.message).join(", ")
        );
    }

    return value;
};

export default validate;