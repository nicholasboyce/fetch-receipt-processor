import { RequestHandler } from 'express-serve-static-core';
import z from 'zod';

const validateRouteParams = (schema: z.Schema): RequestHandler => {
  return (request, response, next) => {
    const paramsResult = schema.safeParse(request.params);

    if (paramsResult.success) {
      request.params = paramsResult.data;
      next();
    } else {
      response.status(404).json({ message: 'No receipt found for that ID.' });
    }
  };
};

const validateBody = (schema: z.Schema): RequestHandler => {
  return (request, response, next) => {
    const bodyResult = schema.safeParse(request.body);

    if (bodyResult.success) {
      request.body = bodyResult.data;
      next();
    } else {
      response.status(400).json({ message: 'The receipt is invalid.' });
    }
  };
};

export { validateBody, validateRouteParams };
