import { Injectable } from "@nestjs/common";
import { Banner } from "./entities/banner.entity";
import { RequestContext, TransactionalConnection } from "@vendure/core";
@Injectable()
export class BannerService {
  constructor(private connection: TransactionalConnection) {}

  async getBanners(ctx: RequestContext, page: number): Promise<Banner[]> {
    try {
      const skip = +((page - 1) * 12);
      const banners = await this.connection
        .getRepository(ctx, Banner)
        .find({ skip: skip, take: 12 });
      return banners;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getBanner(bannerId: number, ctx: RequestContext) {
    console.log(bannerId);

    const banner = await this.connection
      .getRepository(ctx, Banner)
      .findOne({ where: { id: bannerId } });
    console.log(banner);

    return banner;
  }

  async addBanner(bannerInput: Banner, ctx: RequestContext) {
    const { title, description, imageAr, imageEn, urlAr, urlEn } = bannerInput;
    const banner = this.connection.getRepository(ctx, Banner).create({
      title,
      description,
      imageEn,
      imageAr,
      urlAr,
      urlEn,
    });
    return this.connection.getRepository(ctx, Banner).save(banner);
  }
}
