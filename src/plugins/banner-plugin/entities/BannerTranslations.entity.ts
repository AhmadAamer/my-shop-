import { Asset, LanguageCode, Translation, VendureEntity } from "@vendure/core";
import { Banner } from "./banner.entity";
import {
  Column,
  DeepPartial,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { InputType, Field } from "@nestjs/graphql";

@Entity()
@InputType()
export class BannerTranslations
  extends VendureEntity
  implements Translation<Banner>
{
  constructor(input?: DeepPartial<BannerTranslations>) {
    super(input);
  }

  @Column()
  languageCode!: LanguageCode;

  @ManyToOne(() => Asset, { eager: true })
  @JoinColumn()
  image: Asset;

  @Column({ nullable: true })
  title?: string;

  @Field()
  @ManyToOne((type) => Banner, {
    onDelete: "CASCADE",
  })
  base: Banner;
}
