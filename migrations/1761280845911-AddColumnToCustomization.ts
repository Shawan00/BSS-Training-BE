import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToCustomization1761280845911 implements MigrationInterface {
    name = 'AddColumnToCustomization1761280845911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customization\` ADD \`inputBorderColor\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customization\` DROP COLUMN \`inputBorderColor\``);
    }

}
