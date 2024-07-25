import { Injectable } from "@nestjs/common";
import { Banner } from "./entities/banner.entity";
import {
  assertFound,
  AssetService,
  ChannelService,
  CustomFieldRelationService,
  ID,
  RequestContext,
  TransactionalConnection,
  TranslatableSaver,
  Translated,
  TranslatorService,
} from "@vendure/core";
import { BannerTranslations } from "./entities/BannerTranslations.entity";
import { BulkOperationBase } from "typeorm";
@Injectable()
export class BannerService {
  constructor(
    private connection: TransactionalConnection,
    private translatableSaver: TranslatableSaver,
    private translator: TranslatorService,
    private channelService: ChannelService,
    private customFieldRelationService: CustomFieldRelationService,
    private assetService: AssetService
  ) {}

  async getBanners(ctx: RequestContext, page: number) {
    try {
      const skip = +((page - 1) * 12);
      const banners = await this.connection
        .getRepository(ctx, Banner)
        .find({ skip: skip, take: 12 });

      console.log(banners);

      return banners.map((banner) => this.translator.translate(banner, ctx));
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getBanner(
    ctx: RequestContext,
    id: number
  ): Promise<Banner | undefined> {
    const banner = await this.connection
      .getRepository(ctx, Banner)
      .findOne({ where: { id: id } });
    if (banner) {
      return this.translator.translate(banner, ctx);
    }
  }

  async addBanner(bannerInput: Banner, ctx: RequestContext) {
    const bannersOnTheSamePage = await this.connection
      .getRepository(ctx, Banner)
      .find({ where: { page: bannerInput.page } });

    bannersOnTheSamePage.forEach((banner) => {
      if (banner?.position === bannerInput.position)
        throw Error("there is a banner in the same position in this page ");
    });
    console.log(bannerInput);
    const addedBanner = await this.translatableSaver.create({
      ctx,
      input: bannerInput,
      entityType: Banner,
      translationType: BannerTranslations,
      beforeSave: async (banner) => {
        //
      },
    });

    const bannerWithAsset = await assertFound(
      this.getBanner(ctx, +addedBanner.id)
    );
    console.log(bannerWithAsset);

    return this.translator.translate(bannerWithAsset, ctx);
  }
}
