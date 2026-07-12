import HTTP_STATUS from "../constants/httpStatus.js";

import MESSAGES from "../constants/messages.js";

const errorHandler = (err, req, res, next) => {

    const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;

    res.status(statusCode).json({

        success: false,

        message: err.message || MESSAGES.SERVER_ERROR,

        stack:

            process.env.NODE_ENV === "development"

                ? err.stack

                : undefined

    });

};

export default errorHandler;