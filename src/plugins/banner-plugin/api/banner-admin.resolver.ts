import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Allow, Ctx, Permission, RequestContext } from "@vendure/core";
import { BannerService } from "../banner.service";
import { Banner } from "../entities/banner.entity";
import { BannerTranslations } from "../entities/BannerTranslations.entity";
import { BannerPermission } from "../constants";

@Resolver()
export class BannerAdminResolver {
  constructor(private bannerService: BannerService) {}

  @Query()
  async banners(@Ctx() ctx: RequestContext, @Args("page") page: number) {
    return await this.bannerService.getBanners(ctx, page);
  }

  @Query()
  async banner(@Args("bannerId") bannerId: number, @Ctx() ctx: RequestContext) {
    return await this.bannerService.getBanner(ctx, bannerId);
  }

  // @Allow(BannerPermission.Create)
  @Mutation()
  async addBanner(@Ctx() ctx: RequestContext, @Args("input") input: Banner) {
    return this.bannerService.addBanner({ ...input }, ctx);
  }

  @Mutation()
  // @Allow(BannerPermission.Update)
  async updateBanner(
    @Ctx() ctx: RequestContext,
    @Args("id") id: number,
    @Args("updateInput") updateInput: Banner
  ) {
    return this.bannerService.updateBanner(ctx, id, updateInput);
  }
}
