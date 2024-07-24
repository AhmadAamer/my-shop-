import { VendurePlugin, PluginCommonModule } from "@vendure/core";
import { Banner } from "./entities/banner.entity";
import { BannerService } from "./banner.service";
import { BannerResolver } from "./api/banner.resolver";
import { shopApiExtensions } from "./api/api-extensions";
@VendurePlugin({
  imports: [PluginCommonModule],
  entities: [Banner],
  providers: [BannerService],
  configuration: (config) => {
    config.customFields.Asset.push({
      name: "Banner",
      type: "relation",
      list: false,
      entity: Banner,
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
