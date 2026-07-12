import Organization from "../models/organization.model.js";
import ApiError from "../utils/ApiError.js";
import HTTP_STATUS from "../constants/httpStatus.js";

class OrganizationService {
    async create(organizationName) {
        try {
            return await Organization.create({
                organizationName,
            });
        } catch (error) {
            if (error.code === 11000) {
                throw new ApiError(
                    HTTP_STATUS.CONFLICT,
                    "Organization already exists"
                );
            }

            throw error;
        }
    }

    async findAll() {
        return await Organization.find().sort({
            organizationName: 1,
        });
    }

    async delete(id) {
        const organization = await Organization.findById(id);

        if (!organization) {
            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Organization not found"
            );
        }

        await organization.deleteOne();

        return organization;
    }
}

export default new OrganizationService();