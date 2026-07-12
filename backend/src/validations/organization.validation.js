import Joi from "joi";

export const createOrganizationSchema = Joi.object({
    organizationName: Joi.string()
        .trim()
        .min(2)
        .max(120)
        .required()
        .messages({
            "string.empty": "Organization name is required",
            "string.min": "Organization name must contain at least 2 characters",
            "string.max": "Organization name cannot exceed 120 characters",
            "any.required": "Organization name is required",
        }),
});