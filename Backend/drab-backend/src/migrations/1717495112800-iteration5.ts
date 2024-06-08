import { MigrationInterface, QueryRunner } from "typeorm";

export class Iteration51717495112800 implements MigrationInterface {
    name = 'Iteration51717495112800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" ADD "countryCode" character varying`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_6e3511eb80cf065568e2a4ffaa2" FOREIGN KEY ("countryCode") REFERENCES "country"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_6e3511eb80cf065568e2a4ffaa2"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP COLUMN "countryCode"`);
    }

}
