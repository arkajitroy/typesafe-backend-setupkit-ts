import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';

// Middleware for Zod validation
export const RouterMiddleware = (schema: ZodSchema<unknown>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Validate request body
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // Send validation errors as response
      return res.status(400).json({
        errors: result.error.format(),
      });
    }

    // Attach validated data to the request object
    req.body = result.data;

    // Proceed to the next middleware or route handler
    next();
  };
};
