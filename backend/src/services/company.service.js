import Company from "../models/company.model.js";
import ApiError from "../utils/ApiError.js";
import HTTP_STATUS from "../constants/httpStatus.js";
import MESSAGES from "../constants/messages.js";

class CompanyService {
    async create(companyName) {
        const exists = await Company.findOne({
            companyName,
        }).collation({
            locale: "en",
            strength: 2,
        });

        if (exists) {
            throw new ApiError(
                HTTP_STATUS.CONFLICT,
                "Company already exists"
            );
        }

        return await Company.create({
            companyName,
        });
    }

    async findAll() {
        return await Company.find().sort({
            companyName: 1,
        });
    }

    async delete(id) {
        const company = await Company.findById(id);

        if (!company) {
            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Company not found"
            );
        }

        await company.deleteOne();

        return company;
    }
}

export default new CompanyService();