import Company from "../models/company.model.js";
import Organization from "../models/organization.model.js";

import ApiError from "../utils/ApiError.js";

import HTTP_STATUS from "../constants/httpStatus.js";


class CompanyService {


    async create(payload) {

        const {
            organizationId,
            companyName
        } = payload;


        const organization =
            await Organization.findById(
                organizationId
            );


        if (!organization) {

            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Organization not found"
            );

        }



        try {

            return await Company.create({
                organizationId,
                companyName
            });


        } catch (error) {


            if (error.code === 11000) {

                throw new ApiError(
                    HTTP_STATUS.CONFLICT,
                    "Company already exists in this organization"
                );

            }


            throw error;

        }

    }



    async findAll() {

        return await Company
            .find()
            .populate(
                "organizationId",
                "organizationName"
            )
            .sort({
                companyName: 1
            });

    }




    async findByOrganization(
        organizationId
    ) {


        return await Company
            .find({
                organizationId
            })
            .sort({
                companyName: 1
            });

    }


    async findById(id) {
        const company = await Company.findById(id);

        if (!company) {
            throw new ApiError(
                HTTP_STATUS.NOT_FOUND,
                "Company not found"
            );
        }

        return company;
    }



    async delete(id) {


        const company =
            await Company.findById(id);



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