import mongoose from "mongoose";
import MEDICINE_TYPES from "../constants/medicineTypes.js";

const itemSchema = new mongoose.Schema(
    {
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: true,
            index: true,
        },

        itemName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
        },

        type: {
            type: String,
            enum: Object.values(MEDICINE_TYPES),
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

itemSchema.index(
    {
        companyId: 1,
        itemName: 1,
    },
    {
        unique: true,
        collation: {
            locale: "en",
            strength: 2,
        },
    }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;