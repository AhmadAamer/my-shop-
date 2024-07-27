import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Allow, Ctx, Permission, RequestContext } from "@vendure/core";
import { BannerService } from "../../banner.service";
import { Banner } from "../../entities/banner.entity";

@Resolver()
export class BannerShopResolver {
  constructor(private bannerService: BannerService) {}

  @Query()
  async banners(@Ctx() ctx: RequestContext, @Args("page") page: number) {
    return await this.bannerService.getBanners(ctx, page);
  }

  @Query()
  async banner(@Args("bannerId") bannerId: number, @Ctx() ctx: RequestContext) {
    return await this.bannerService.getBanner(ctx, bannerId);
  }
}
