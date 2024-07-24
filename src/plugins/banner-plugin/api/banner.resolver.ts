import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import {
  Allow,
  AssetService,
  Ctx,
  Permission,
  RequestContext,
  Transaction,
} from "@vendure/core";
import { BannerService } from "../banner.service";
import { Banner } from "../entities/banner.entity";

@Resolver()
export class BannerResolver {
  constructor(
    private bannerService: BannerService,
    private assetService: AssetService
  ) {}

  @Query()
  async banners(@Ctx() ctx: RequestContext, @Args("page") page: number) {
    return await this.bannerService.getBanners(ctx, page);
  }
  @Query()
  async banner(@Args("bannerId") bannerId: number, @Ctx() ctx: RequestContext) {
    return await this.bannerService.getBanner(bannerId, ctx);
  }

  @Mutation()
  async addBanner(@Args("input") input: Banner, @Ctx() ctx: RequestContext) {
    return this.bannerService.addBanner({ ...input }, ctx);
  }
}
