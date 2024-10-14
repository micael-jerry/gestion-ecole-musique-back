import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

/**
 * A middleware function for NestJS GraphQL that modifies the return value of a field resolver.
 * It appends a base URL and the 'uploads' directory to the file path, if the file path exists.
 *
 * @param ctx - The context object containing information about the current request and the GraphQL schema.
 * @param next - The next function in the middleware chain. It should be called to execute the next middleware or the field resolver.
 *
 * @returns A Promise that resolves to the modified file path or null if the original file path was null.
 *
 */
export const pathFinderMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const filePath: string | null = await next();
  return filePath ? `${process.env.BASE_URL}/uploads/${filePath}` : null;
};
