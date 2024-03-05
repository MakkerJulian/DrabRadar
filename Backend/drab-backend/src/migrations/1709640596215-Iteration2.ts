import { MigrationInterface, QueryRunner } from 'typeorm';

export class Iteration21709640596215 implements MigrationInterface {
  name = 'Iteration21709640596215';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "phone" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "phone"`);
    await queryRunner.query(`ALTER TABLE "customer" ADD "phone" integer`);
  }
}
