import { RequestContext } from "@vendure/core";
import { ObjectLiteral, Repository } from "typeorm";

export function getRepository<Entity extends ObjectLiteral>(
  this: Entity,
  ctx: RequestContext,
  entity: new () => Entity
): Repository<Entity> {
  return this.connection.getRepository(ctx, entity);
}
