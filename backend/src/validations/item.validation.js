import Joi from "joi";

import MEDICINE_TYPES from "../constants/medicineTypes.js";

export const createItemSchema = Joi.object({
    companyId: Joi.string()
        .required(),

    itemName: Joi.string()
        .trim()
        .min(2)
        .max(200)
        .required(),

    type: Joi.string()
        .valid(...Object.values(MEDICINE_TYPES))
        .required(),
});