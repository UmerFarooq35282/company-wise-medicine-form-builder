import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
    {
        organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: [true, "Organization is required"],
            index: true,
        },

        companyName: {
            type: String,
            required: [true, "Company name is required"],
            trim: true,
            maxlength: [
                100,
                "Company name cannot exceed 100 characters",
            ],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);


companySchema.index(
    {
        organizationId: 1,
        companyName: 1,
    },
    {
        unique: true,
        collation: {
            locale: "en",
            strength: 2,
        },
    }
);


const Company = mongoose.model(
    "Company",
    companySchema
);


export default Company;