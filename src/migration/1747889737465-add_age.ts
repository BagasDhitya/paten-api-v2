import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAge1747889737465 implements MigrationInterface {
    name = 'AddAge1747889737465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "age" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "age"`);
    }

}
