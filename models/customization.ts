import { Column, Entity, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Shop } from "./shop";

export enum InputBorderType {
  DOTTED = "dotted",
  DASHED = "dashed",
  SOLID = "solid",
  DOUBLE = "double",
  GROOVE = "groove",
  RIDGE = "ridge",
  INSET = "inset",
  OUTSET = "outset",
  NONE = "none",
  HIDDEN = "hidden",
}

export enum ButtonVariant {
  PLAIN = "plain",
  PRIMARY = "primary",
  SECONDARY = "secondary",
  TERTIARY = "tertiary",
  MONOCHROME_PLAIN = "monochromePlain",
}

export enum Direction {
  VERTICAL = "vertical",
  HORIZONTAL = "horizontal",
}

@Entity()
export class Customization {
  @PrimaryColumn()
  shopId!: number;

  @OneToOne(() => Shop)
  @JoinColumn({ name: "shopId" })
  shop!: Shop;

  @Column({ type: "varchar", nullable: true })
  inputWidth?: string;

  @Column({ type: "varchar", nullable: true })
  inputHeight?: string;

  @Column({ type: "enum", enum: InputBorderType, default: InputBorderType.SOLID })
  inputBorder!: InputBorderType;

  @Column({ type: "varchar", nullable: true })
  inputBorderRadius?: string;

  @Column({ type: "varchar", nullable: true })
  inputBackgroundColor?: string;

  @Column({ type: "enum", enum: ButtonVariant, default: ButtonVariant.PRIMARY })
  buttonVariant!: ButtonVariant;

  @Column({ type: "varchar", nullable: true })
  borderWidth?: string;

  @Column({ type: "varchar", nullable: true })
  borderColor?: string;

  @Column({ type: "varchar", nullable: true })
  buttonWidth?: string;

  @Column({ type: "varchar", nullable: true })
  buttonHeight?: string;

  @Column({ type: "enum", enum: InputBorderType, default: InputBorderType.SOLID })
  buttonBorder!: InputBorderType;

  @Column({ type: "varchar", nullable: true })
  buttonBackgroundColor?: string;

  @Column({ type: "varchar", nullable: true })
  buttonTextColor?: string;

  @Column({ type: "enum", enum: Direction, default: Direction.VERTICAL })
  direction!: Direction;

  @Column({ type: "longtext", nullable: true })
  css?: string;
}
