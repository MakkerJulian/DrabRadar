import { MigrationInterface, QueryRunner } from "typeorm";

export class Iteration21709719434125 implements MigrationInterface {
    name = 'Iteration21709719434125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "weatherstation" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "weatherstation" ADD "longitude" numeric(6,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "weatherstation" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "weatherstation" ADD "latitude" numeric(6,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "weatherstation" DROP COLUMN "elevation"`);
        await queryRunner.query(`ALTER TABLE "weatherstation" ADD "elevation" numeric(6,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" DROP COLUMN "temp"`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" ADD "temp" numeric(6,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" DROP COLUMN "dew_point"`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" ADD "dew_point" numeric(6,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" DROP COLUMN "s_airpressure"`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" ADD "s_airpressure" numeric(6,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" DROP COLUMN "sea_airpressure"`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" ADD "sea_airpressure" numeric(6,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" DROP COLUMN "visibility"`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" ADD "visibility" numeric(6,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" DROP COLUMN "windspeed"`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" ADD "windspeed" numeric(6,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" DROP COLUMN "precipitation"`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" ADD "precipitation" numeric(6,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" DROP COLUMN "snow_amount"`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" ADD "snow_amount" numeric(6,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" DROP COLUMN "clouds"`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" ADD "clouds" numeric(6,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nearest_location" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "nearest_location" ADD "longitude" numeric(6,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nearest_location" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "nearest_location" ADD "latitude" numeric(6,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nearest_location" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "nearest_location" ADD "latitude" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nearest_location" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "nearest_location" ADD "longitude" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" DROP COLUMN "clouds"`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" ADD "clouds" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" DROP COLUMN "snow_amount"`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" ADD "snow_amount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" DROP COLUMN "precipitation"`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" ADD "precipitation" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" DROP COLUMN "windspeed"`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" ADD "windspeed" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" DROP COLUMN "visibility"`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" ADD "visibility" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" DROP COLUMN "sea_airpressure"`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" ADD "sea_airpressure" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" DROP COLUMN "s_airpressure"`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" ADD "s_airpressure" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" DROP COLUMN "dew_point"`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" ADD "dew_point" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" DROP COLUMN "temp"`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" ADD "temp" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "weatherstation" DROP COLUMN "elevation"`);
        await queryRunner.query(`ALTER TABLE "weatherstation" ADD "elevation" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "weatherstation" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "weatherstation" ADD "latitude" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "weatherstation" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "weatherstation" ADD "longitude" integer NOT NULL`);
    }

}
