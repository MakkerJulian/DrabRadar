import { MigrationInterface, QueryRunner } from "typeorm";

export class Iteration21709723339629 implements MigrationInterface {
    name = 'Iteration21709723339629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "weatherstation" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "longitude" numeric(6,2) NOT NULL, "latitude" numeric(6,2) NOT NULL, "elevation" numeric(6,2) NOT NULL, CONSTRAINT "PK_25fe1210fec8e8deec0d2570d03" PRIMARY KEY ("id", "name"))`);
        await queryRunner.query(`CREATE TABLE "weatherstation_data" ("id" SERIAL NOT NULL, "datetime" TIMESTAMP NOT NULL, "temp" numeric(6,2) NOT NULL, "dew_point" numeric(6,2) NOT NULL, "s_airpressure" numeric(6,2) NOT NULL, "sea_airpressure" numeric(6,2) NOT NULL, "visibility" numeric(6,2) NOT NULL, "windspeed" numeric(6,2) NOT NULL, "precipitation" numeric(6,2) NOT NULL, "snow_amount" numeric(6,2) NOT NULL, "freezing" boolean NOT NULL DEFAULT false, "rain" boolean NOT NULL DEFAULT false, "snow" boolean NOT NULL DEFAULT false, "hail" boolean NOT NULL DEFAULT false, "thunder" boolean NOT NULL DEFAULT false, "tornado" boolean NOT NULL DEFAULT false, "clouds" numeric(6,2) NOT NULL, "wind_direction" integer NOT NULL, "weatherstationId" integer, "weatherstationName" character varying, CONSTRAINT "PK_bd4033afa8f7eb584300e899e18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscription" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "customerId" integer, CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "country" ("code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8ff4c23dc9a3f3856555bd86186" PRIMARY KEY ("code"))`);
        await queryRunner.query(`CREATE TABLE "geolocation" ("id" SERIAL NOT NULL, "island" character varying, "county" character varying, "place" character varying, "hamlet" character varying, "town" character varying, "municipality" character varying, "state_district" character varying, "administrative" character varying, "state" character varying, "village" character varying, "region" character varying, "province" character varying, "city" character varying, "locality" character varying, "postcode" character varying, "weatherstationId" integer, "weatherstationName" character varying, "countryCode" character varying, CONSTRAINT "PK_36aa5f8d0de597a21a725ee1cc2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "nearest_location" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "admin_region_name1" character varying NOT NULL, "admin_region_name2" character varying, "longitude" numeric(6,2) NOT NULL, "latitude" numeric(6,2) NOT NULL, "weatherstationId" integer, "weatherstationName" character varying, "countryCode" character varying, CONSTRAINT "PK_e5185e48ea7bdae2dbc6d63a306" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contract" ("id" SERIAL NOT NULL, "level" integer NOT NULL, "subscriptionId" integer, CONSTRAINT "PK_17c3a89f58a2997276084e706e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying, "phone" character varying, "password" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contract_weatherstations_weatherstation" ("contractId" integer NOT NULL, "weatherstationId" integer NOT NULL, "weatherstationName" character varying NOT NULL, CONSTRAINT "PK_709df90e18025e200b318418361" PRIMARY KEY ("contractId", "weatherstationId", "weatherstationName"))`);
        await queryRunner.query(`CREATE INDEX "IDX_47ae2a4b84a99a7bcff052f876" ON "contract_weatherstations_weatherstation" ("contractId") `);
        await queryRunner.query(`CREATE INDEX "IDX_494a8657239ffc83c03842b21a" ON "contract_weatherstations_weatherstation" ("weatherstationId", "weatherstationName") `);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" ADD CONSTRAINT "FK_f00e07048e5102db74c580355aa" FOREIGN KEY ("weatherstationId", "weatherstationName") REFERENCES "weatherstation"("id","name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_e4543f99d629cf2c04fe9332e30" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "geolocation" ADD CONSTRAINT "FK_474939ecc461bbca3a08513776f" FOREIGN KEY ("weatherstationId", "weatherstationName") REFERENCES "weatherstation"("id","name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "geolocation" ADD CONSTRAINT "FK_b67b12241dc59c3b32b3a399e68" FOREIGN KEY ("countryCode") REFERENCES "country"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nearest_location" ADD CONSTRAINT "FK_a5753002f9160f69a7e05823a6d" FOREIGN KEY ("weatherstationId", "weatherstationName") REFERENCES "weatherstation"("id","name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nearest_location" ADD CONSTRAINT "FK_25cd5af4ae8c78b8e43481bd242" FOREIGN KEY ("countryCode") REFERENCES "country"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_f0884eb48f6545dbd5cf846c514" FOREIGN KEY ("subscriptionId") REFERENCES "subscription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract_weatherstations_weatherstation" ADD CONSTRAINT "FK_47ae2a4b84a99a7bcff052f876c" FOREIGN KEY ("contractId") REFERENCES "contract"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contract_weatherstations_weatherstation" ADD CONSTRAINT "FK_494a8657239ffc83c03842b21a4" FOREIGN KEY ("weatherstationId", "weatherstationName") REFERENCES "weatherstation"("id","name") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract_weatherstations_weatherstation" DROP CONSTRAINT "FK_494a8657239ffc83c03842b21a4"`);
        await queryRunner.query(`ALTER TABLE "contract_weatherstations_weatherstation" DROP CONSTRAINT "FK_47ae2a4b84a99a7bcff052f876c"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_f0884eb48f6545dbd5cf846c514"`);
        await queryRunner.query(`ALTER TABLE "nearest_location" DROP CONSTRAINT "FK_25cd5af4ae8c78b8e43481bd242"`);
        await queryRunner.query(`ALTER TABLE "nearest_location" DROP CONSTRAINT "FK_a5753002f9160f69a7e05823a6d"`);
        await queryRunner.query(`ALTER TABLE "geolocation" DROP CONSTRAINT "FK_b67b12241dc59c3b32b3a399e68"`);
        await queryRunner.query(`ALTER TABLE "geolocation" DROP CONSTRAINT "FK_474939ecc461bbca3a08513776f"`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_e4543f99d629cf2c04fe9332e30"`);
        await queryRunner.query(`ALTER TABLE "weatherstation_data" DROP CONSTRAINT "FK_f00e07048e5102db74c580355aa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_494a8657239ffc83c03842b21a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_47ae2a4b84a99a7bcff052f876"`);
        await queryRunner.query(`DROP TABLE "contract_weatherstations_weatherstation"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "contract"`);
        await queryRunner.query(`DROP TABLE "nearest_location"`);
        await queryRunner.query(`DROP TABLE "geolocation"`);
        await queryRunner.query(`DROP TABLE "country"`);
        await queryRunner.query(`DROP TABLE "subscription"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "weatherstation_data"`);
        await queryRunner.query(`DROP TABLE "weatherstation"`);
    }

}
