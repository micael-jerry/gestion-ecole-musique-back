import { SetMetadata } from '@nestjs/common';

/**
 * A decorator function that sets metadata for NestJS resolvers.
 * This metadata is used to associate specific actions with the handler.
 *
 * @param {...string[]} actions - A list of actions associated with the resolver.
 *
 * @returns {Function} - A function that sets the metadata using the `SetMetadata` decorator.
 */
export const Actions = (...actions: string[]) =>
  SetMetadata('actions', actions);
