import { MigrationInterface, QueryRunner } from 'typeorm';

export class Iteration31709644367929 implements MigrationInterface {
  name = 'Iteration31709644367929';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT "FK_abf97d7c93eb255c0f18dee2a55"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" RENAME COLUMN "clientId" TO "customerId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT "FK_e4543f99d629cf2c04fe9332e30" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT "FK_e4543f99d629cf2c04fe9332e30"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" RENAME COLUMN "customerId" TO "clientId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT "FK_abf97d7c93eb255c0f18dee2a55" FOREIGN KEY ("clientId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
