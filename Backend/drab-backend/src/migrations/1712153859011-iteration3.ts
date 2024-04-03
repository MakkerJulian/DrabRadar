import { MigrationInterface, QueryRunner } from "typeorm";

export class Iteration31712153859011 implements MigrationInterface {
    name = 'Iteration31712153859011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "weather_data" ALTER COLUMN "datetime" SET DEFAULT NOW()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "weather_data" ALTER COLUMN "datetime" DROP DEFAULT`);
    }

}
