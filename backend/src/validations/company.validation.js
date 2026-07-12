import Joi from "joi";

export const createCompanySchema = Joi.object({
    companyName: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
            "string.empty": "Company name is required",
            "string.min": "Company name must contain at least 2 characters",
            "string.max": "Company name cannot exceed 100 characters",
            "any.required": "Company name is required",
        }),
});