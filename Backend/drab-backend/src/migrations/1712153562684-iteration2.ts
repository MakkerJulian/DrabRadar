import { MigrationInterface, QueryRunner } from "typeorm";

export class Iteration21712153562684 implements MigrationInterface {
    name = 'Iteration21712153562684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "storing" ALTER COLUMN "timestamp" SET DEFAULT NOW()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "storing" ALTER COLUMN "timestamp" DROP DEFAULT`);
    }

}
