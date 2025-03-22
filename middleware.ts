import { RequestHandler } from "express-serve-static-core";
import z from "zod";


const validateBody = (schema : z.Schema) : RequestHandler => {
    return (request, response, next) => {
        const bodyResult = schema.safeParse(request.body);

        if (bodyResult.success) {
            request.body = bodyResult.data;
            next();
        } else {
            response.status(400).json({ message: 'The receipt is invalid.'});
        }
    };
};

export {
    validateBody
}