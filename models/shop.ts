import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({unique: true, type: "varchar", length: 50})
  shopifyDomain!: string;

  @Column({type: "varchar", length: 50})
  shopOwner!: string;

  @CreateDateColumn({type: "datetime"})
  createdAt!: Date;

  @UpdateDateColumn({type: "datetime"})
  updatedAt!: Date;
}
