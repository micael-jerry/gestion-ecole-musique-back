import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayloadType } from '../entities/jwt-payload.entity';

/**
 * ActionGuard is a NestJS guard that checks if a user has the necessary permissions to access a specific route.
 * It uses the JwtPayloadType to verify the user's action tags against the required action tags.
 */
@Injectable()
export class ActionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const user: JwtPayloadType = ctx.user;
    const actionsTags = this.getActionTags(context);
    if (this.hasPermission(user, actionsTags)) return true;
    else {
      throw new UnauthorizedException('You do not have the authorization');
    }
  }

  private getActionTags(context: ExecutionContext) {
    const handler = context.getHandler();
    const actionGuardMetadata = this.reflector.get<string[]>(
      'actions',
      handler,
    );
    return actionGuardMetadata;
  }

  /**
   * Checks if the user has the required action tag.
   *
   * @param user - The user's JwtPayloadType.
   * @param actionTag - The required action tag for the route.
   * @returns True if the user has the required action tag, otherwise false.
   */
  private hasPermission(user: JwtPayloadType, actionTag: string[]) {
    for (const userActionTag of user.actionTags) {
      if (actionTag.includes(userActionTag)) return true;
    }
    return false;
  }
}
