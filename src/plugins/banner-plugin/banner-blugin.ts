import { VendurePlugin, PluginCommonModule } from "@vendure/core";
import { Banner } from "./entities/banner.entity";
import { BannerService } from "./banner.service";
import { BannerResolver } from "./api/banner.resolver";
import { shopApiExtensions } from "./api/api-extensions";
import { BannerTranslations } from "./entities/BannerTranslations.entity";
import { adminApiExtensions } from "./api/admin-extensions";
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
    resolvers: [BannerResolver],
    schema: shopApiExtensions,
  },
})
export class BannerPlugin {}
