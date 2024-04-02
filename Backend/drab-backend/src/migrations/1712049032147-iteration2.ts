import { MigrationInterface, QueryRunner } from "typeorm";

export class Iteration21712049032147 implements MigrationInterface {
    name = 'Iteration21712049032147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_77be1a09af1d93b7cda3a41586" ON "weather_data" ("weatherstationName") `);
        await queryRunner.query(`CREATE INDEX "IDX_82bf43fa2f67c36f8d3e388a0c" ON "weather_data" ("datetime") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_82bf43fa2f67c36f8d3e388a0c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_77be1a09af1d93b7cda3a41586"`);
    }

}
