import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Shop } from "./shop";

@Entity()
export class Translation {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Shop)
  @JoinColumn({ name: "shop_id" })
  shop!: Shop;

  @Column({ type: "varchar", length: 10 })
  locale!: string;

  @Column({ type: "json" })
  translate!: {
    placeholderText: string;
    buttonText: string;
  };
}
