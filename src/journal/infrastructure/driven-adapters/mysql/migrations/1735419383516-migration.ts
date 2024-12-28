import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1735419383516 implements MigrationInterface {
    name = 'Migration1735419383516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`entries\` (\`id\` varchar(255) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`create_at\` TIMESTAMP  DEFAULT CURRENT_TIMESTAMP, \`update_at\` TIMESTAMP  DEFAULT CURRENT_TIMESTAMP , UNIQUE INDEX \`IDX_23d4e7e9b58d9939f113832915\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_23d4e7e9b58d9939f113832915\` ON \`entries\``);
        await queryRunner.query(`DROP TABLE \`entries\``);
    }

}
