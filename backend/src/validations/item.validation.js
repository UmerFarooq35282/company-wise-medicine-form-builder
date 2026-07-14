import Joi from "joi";

import { MEDICINE_TYPES } from "../constants/medicineTypes.js";


export const createItemSchema = Joi.object({
    companyId:
        Joi.string()
            .required()
            .messages({
                "any.required":
                    "Company is required"
            }),
    itemName:
        Joi.string()
            .trim()
            .min(2)
            .max(200)
            .required()
            .messages({

                "string.empty":
                    "Medicine name is required"

            }),
    type:

        Joi.string()
            .valid(...MEDICINE_TYPES)
            .required()

});