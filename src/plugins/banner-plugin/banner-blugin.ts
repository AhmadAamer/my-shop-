import { VendurePlugin, PluginCommonModule } from "@vendure/core";
import { Banner } from "./entities/banner.entity";
import { BannerService } from "./banner.service";
import { BannerAdminResolver } from "./api/banner-admin.resolver";
import { BannerShopResolver } from "./api/resolvers/banner-shop.resolver";
import { shopApiExtensions } from "./api/extensions/api-extensions";
import { BannerTranslations } from "./entities/BannerTranslations.entity";
import { adminApiExtensions } from "./api/extensions/admin-extensions";
@VendurePlugin({
  imports: [PluginCommonModule],
  entities: [Banner, BannerTranslations],
  providers: [BannerService],
  configuration: (config) => {
    config.customFields.Asset.push({
      name: "translation",
      type: "relation",
      list: false,
      entity: BannerTranslations,
      internal: true,
    });
    return config;
  },
  shopApiExtensions: {
    resolvers: [BannerShopResolver],
    schema: shopApiExtensions,
  },
  adminApiExtensions: {
    resolvers: [BannerAdminResolver],
    schema: adminApiExtensions,
  },
})
export class BannerPlugin {}
