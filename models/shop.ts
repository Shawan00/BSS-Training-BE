import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Shop {
  @PrimaryColumn({unique: true, type: "varchar", length: 100})
  shopifyDomain!: string;

  @Column({type: "varchar", length: 50})
  shopOwner!: string;

  @CreateDateColumn({type: "datetime"})
  createdAt!: Date;

  @UpdateDateColumn({type: "datetime"})
  updatedAt!: Date;
}
