import { MigrationInterface, QueryRunner } from "typeorm";

export class Iteration21709925953150 implements MigrationInterface {
    name = 'Iteration21709925953150'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "weather_data" ("id" SERIAL NOT NULL, "datetime" TIMESTAMP NOT NULL, "temp" numeric(6,2) NOT NULL, "dew_point" numeric(6,2) NOT NULL, "s_airpressure" numeric(6,2) NOT NULL, "sea_airpressure" numeric(6,2) NOT NULL, "visibility" numeric(6,2) NOT NULL, "windspeed" numeric(6,2) NOT NULL, "precipitation" numeric(6,2) NOT NULL, "snow_amount" numeric(6,2) NOT NULL, "freezing" boolean NOT NULL DEFAULT false, "rain" boolean NOT NULL DEFAULT false, "snow" boolean NOT NULL DEFAULT false, "hail" boolean NOT NULL DEFAULT false, "thunder" boolean NOT NULL DEFAULT false, "tornado" boolean NOT NULL DEFAULT false, "clouds" numeric(6,2) NOT NULL, "wind_direction" integer NOT NULL, "weatherstationName" character varying, CONSTRAINT "PK_6ee17d274a88f8036d2aa8ea9d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "weather_data" ADD CONSTRAINT "FK_77be1a09af1d93b7cda3a41586e" FOREIGN KEY ("weatherstationName") REFERENCES "weatherstation"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "weather_data" DROP CONSTRAINT "FK_77be1a09af1d93b7cda3a41586e"`);
        await queryRunner.query(`DROP TABLE "weather_data"`);
    }

}
