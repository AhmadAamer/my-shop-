import {
  Asset,
  VendureEntity,
  Translatable,
  LocaleString,
  Translation,
} from "@vendure/core";
import {
  Column,
  DeepPartial,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InputType, Field } from "@nestjs/graphql";
import { BannerTranslations } from "./BannerTranslations.entity";

@Entity()
export class Banner extends VendureEntity implements Translatable {
  constructor(input?: DeepPartial<Banner>) {
    super(input);
  }

  @Column()
  position!: number;

  @Column()
  page!: number;

  @Column({ nullable: true })
  url: string;

  title?: LocaleString;

  image: Asset;

  @OneToMany((type) => BannerTranslations, (translation) => translation.base, {
    eager: true,
  })
  translations: Array<Translation<Banner>>;
}
