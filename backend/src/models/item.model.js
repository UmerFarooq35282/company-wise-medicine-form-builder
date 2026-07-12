import mongoose from "mongoose";
import MEDICINE_TYPES from "../constants/medicineTypes.js";


const itemSchema = new mongoose.Schema(

    {

        companyId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Company",

            required: [
                true,
                "Company is required"
            ],

            index: true
        },


        itemName: {

            type: String,

            required: [
                true,
                "Medicine name is required"
            ],

            trim: true,

            maxlength: [
                200,
                "Medicine name cannot exceed 200 characters"
            ]

        },


        type: {

            type: String,

            enum: Object.values(
                MEDICINE_TYPES
            ),

            required: [
                true,
                "Medicine type is required"
            ]

        }


    },


    {

        timestamps: true,

        versionKey: false

    }

);



// Same medicine name can exist in different companies
// But duplicate inside same company not allowed

itemSchema.index(

    {

        companyId: 1,

        itemName: 1

    },


    {

        unique: true,

        collation: {

            locale: "en",

            strength: 2

        }

    }

);



const Item = mongoose.model(
    "Item",
    itemSchema
);


export default Item;