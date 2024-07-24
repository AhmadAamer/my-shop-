import { Asset, VendureEntity } from "@vendure/core";
import {
  Column,
  DeepPartial,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InputType, Field } from "@nestjs/graphql";

@InputType()
@Entity()
export class Banner extends VendureEntity {
  constructor(input?: DeepPartial<Banner>) {
    super(input);
  }
  @PrimaryGeneratedColumn({})
  @Field()
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;

  @Column({ type: "int", unique: true, nullable: true })
  @Field()
  position: number;

  @ManyToOne(() => Asset, { eager: true })
  @JoinColumn()
  imageAr: number;

  @ManyToOne(() => Asset, { eager: true })
  @JoinColumn()
  imageEn: number;

  @Column({ nullable: true })
  @Field()
  urlAr?: string;

  @Column({ nullable: true })
  @Field()
  urlEn?: string;
}
