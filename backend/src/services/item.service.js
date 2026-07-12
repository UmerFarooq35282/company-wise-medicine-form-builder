import Item from "../models/item.model.js";
import Company from "../models/company.model.js";

import ApiError from "../utils/ApiError.js";

import HTTP_STATUS from "../constants/httpStatus.js";



class ItemService {



    async create(payload) {


        const {
            companyId,
            itemName,
            type
        } = payload;



        const company =
            await Company.findById(
                companyId
            );



        if (!company) {

            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Company not found"

            );

        }



        try {


            return await Item.create({

                companyId,

                itemName,

                type

            });


        }

        catch (error) {


            if (error.code === 11000) {


                throw new ApiError(

                    HTTP_STATUS.CONFLICT,

                    "Medicine already exists in this company"

                );


            }


            throw error;


        }


    }




    async findByCompany(companyId) {


        return await Item.find({

            companyId

        })

            .sort({

                itemName: 1

            });


    }





    async findByOrganization(
        organizationId
    ) {



        const companies =
            await Company.find({

                organizationId

            })
                .select("_id");



        const companyIds =
            companies.map(
                company => company._id
            );



        return await Item.find({

            companyId: {
                $in: companyIds
            }

        })

            .populate(
                "companyId",
                "companyName"
            )

            .sort({

                itemName: 1

            });


    }





    async delete(id) {


        const item =
            await Item.findById(id);



        if (!item) {


            throw new ApiError(

                HTTP_STATUS.NOT_FOUND,

                "Medicine not found"

            );


        }



        await item.deleteOne();


        return item;


    }




}


export default new ItemService();