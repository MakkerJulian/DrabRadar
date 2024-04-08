import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLastCallDate1712565427861 implements MigrationInterface {
  name = 'AddLastCallDate1712565427861';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contract" ADD "lastCallDate" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contract" DROP COLUMN "lastCallDate"`,
    );
  }
}
