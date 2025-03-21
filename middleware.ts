import { ErrorRequestHandler, RequestHandler } from "express-serve-static-core";
import z from "zod";


const validateBody =  (schema : z.ZodSchema) : RequestHandler => {
    return (request, _, next) => {
        request.body = schema.parse(request.body);
        next();
    };
};

const errorHandler = (error, _, response, next) : RequestHandler => {
    if (error.name == ) {
        return response.status(400).send({message: 'The receipt is invalid.'});
    }

    next(error);
};

export {
    validateBody
}