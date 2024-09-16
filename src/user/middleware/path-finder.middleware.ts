import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

export const pathFinderMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const filePath: string | null = await next();
  return filePath ? `${process.env.BASE_URL}/uploads/${filePath}` : null;
};
