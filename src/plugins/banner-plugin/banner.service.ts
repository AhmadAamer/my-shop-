import { Injectable } from "@nestjs/common";
import { Banner } from "./entities/banner.entity";
import {
  assertFound,
  RequestContext,
  TransactionalConnection,
  TranslatableSaver,
  TranslatorService,
} from "@vendure/core";
import { BannerTranslations } from "./entities/BannerTranslations.entity";
@Injectable()
export class BannerService {
  constructor(
    private connection: TransactionalConnection,
    private translatableSaver: TranslatableSaver,
    private translator: TranslatorService
  ) {}

  async getBanners(ctx: RequestContext, page: number) {
    try {
      const skip = +((page - 1) * 12);
      const banners = await this.connection
        .getRepository(ctx, Banner)
        .find({ skip: skip, take: 12 });

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

    return this.translator.translate(bannerWithAsset, ctx);
  }

  async updateBanner(
    ctx: RequestContext,
    bannerId: number,
    updateBannerInput: Partial<Banner>
  ) {
    const banner = await this.connection
      .getRepository(ctx, Banner)
      .findOne({ where: { id: bannerId } });

    if (!banner) throw new Error("Not found");

    if (updateBannerInput.position && updateBannerInput.page) {
      console.log("here");

      const exist = await this.connection.getRepository(ctx, Banner).findOne({
        where: {
          page: updateBannerInput.page,
          position: updateBannerInput.position,
        },
      });
      console.log(exist);

      if (exist) {
        console.log(exist);
        return new Error(
          "there is a banner in the same position in this page "
        );
      }
    } else if (updateBannerInput.position && !updateBannerInput.page) {
      const updatedKey = updateBannerInput.page ? "page" : "position";
      const bannerKey = updatedKey === "page" ? "position" : "page";
      const exist = await this.connection.getRepository(ctx, Banner).findOne({
        where: {
          [updatedKey]: updateBannerInput[updatedKey],
          [bannerKey]: banner[bannerKey],
        },
      });
      if (exist) console.log(exist);
      return new Error("there is a banner in the same position in this page ");
    }

    await this.connection
      .getRepository(ctx, Banner)
      .update(bannerId, updateBannerInput);

    const updated = await this.connection
      .getRepository(ctx, Banner)
      .findOne({ where: { id: bannerId } });

    return updated;
  }
}
