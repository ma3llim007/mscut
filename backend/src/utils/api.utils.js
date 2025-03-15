// Api Error
class ApiError extends Error {
    constructor(statusCode, message = "Something Went Wrong", errors = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = Array.isArray(errors) ? errors : [errors];

        if (stack) {
            this.stack = stack;
        } else if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    toJSON() {
        const { statusCode, data, success, errors, message } = this;
        return {
            statusCode,
            data,
            success,
            errors,
            message,
        };
    }
}

// Api Response
class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = Boolean(statusCode < 400);
    }
}

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next).catch((error) => next(error)));
    };
};

export { ApiError, ApiResponse, asyncHandler };
