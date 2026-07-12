import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
    {
        organizationName: {
            type: String,
            required: [true, "Organization name is required"],
            trim: true,
            maxlength: [120, "Organization name cannot exceed 120 characters"],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

organizationSchema.index(
    { organizationName: 1 },
    {
        unique: true,
        collation: {
            locale: "en",
            strength: 2,
        },
    }
);

const Organization = mongoose.model("Organization", organizationSchema);

export default Organization;