import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTranslationTable1761194317722 implements MigrationInterface {
    name = 'ChangeTranslationTable1761194317722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`translation\` ADD UNIQUE INDEX \`IDX_9f7a6ccf0384422db17d91dad6\` (\`locale\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`translation\` DROP INDEX \`IDX_9f7a6ccf0384422db17d91dad6\``);
    }

}
