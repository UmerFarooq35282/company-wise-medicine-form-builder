import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: [true, "Company name is required"],
            trim: true,
            maxlength: [100, "Company name cannot exceed 100 characters"],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Case-insensitive unique index
companySchema.index(
    { companyName: 1 },
    {
        unique: true,
        collation: {
            locale: "en",
            strength: 2,
        },
    }
);

const Company = mongoose.model("Company", companySchema);

export default Company;