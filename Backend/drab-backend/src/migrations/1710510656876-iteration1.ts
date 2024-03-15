import { MigrationInterface, QueryRunner } from "typeorm";

export class Iteration11710510656876 implements MigrationInterface {
    name = 'Iteration11710510656876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "weatherstation" ("name" character varying NOT NULL, "longitude" numeric(6,2) NOT NULL, "latitude" numeric(6,2) NOT NULL, "elevation" numeric(6,2) NOT NULL, CONSTRAINT "PK_73bb1b5b5a6888f857f14329224" PRIMARY KEY ("name"))`);
        await queryRunner.query(`CREATE TABLE "country" ("code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8ff4c23dc9a3f3856555bd86186" PRIMARY KEY ("code"))`);
        await queryRunner.query(`CREATE TABLE "nearest_location" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "admin_region_name1" character varying NOT NULL, "admin_region_name2" character varying, "longitude" numeric(6,2) NOT NULL, "latitude" numeric(6,2) NOT NULL, "weatherstationName" character varying, "countryCode" character varying, CONSTRAINT "PK_e5185e48ea7bdae2dbc6d63a306" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "weather_data" ("id" SERIAL NOT NULL, "datetime" TIMESTAMP NOT NULL, "temp" numeric(6,2) NOT NULL, "dew_point" numeric(6,2) NOT NULL, "s_airpressure" numeric(6,2) NOT NULL, "sea_airpressure" numeric(6,2) NOT NULL, "visibility" numeric(6,2) NOT NULL, "windspeed" numeric(6,2) NOT NULL, "precipitation" numeric(6,2) NOT NULL, "snow_amount" numeric(6,2) NOT NULL, "freezing" boolean NOT NULL DEFAULT false, "rain" boolean NOT NULL DEFAULT false, "snow" boolean NOT NULL DEFAULT false, "hail" boolean NOT NULL DEFAULT false, "thunder" boolean NOT NULL DEFAULT false, "tornado" boolean NOT NULL DEFAULT false, "clouds" numeric(6,2) NOT NULL, "wind_direction" integer NOT NULL, "weatherstationName" character varying, CONSTRAINT "PK_6ee17d274a88f8036d2aa8ea9d1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contract" ("id" SERIAL NOT NULL, "level" integer NOT NULL, "subscriptionId" integer, CONSTRAINT "PK_17c3a89f58a2997276084e706e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscription" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "customerId" integer, CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "geolocation" ("id" SERIAL NOT NULL, "island" character varying, "county" character varying, "place" character varying, "hamlet" character varying, "town" character varying, "municipality" character varying, "state_district" character varying, "administrative" character varying, "state" character varying, "village" character varying, "region" character varying, "province" character varying, "city" character varying, "locality" character varying, "postcode" character varying, "weatherstationName" character varying, "countryCode" character varying, CONSTRAINT "PK_36aa5f8d0de597a21a725ee1cc2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying, "phone" character varying, "password" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contract_weatherstations_weatherstation" ("contractId" integer NOT NULL, "weatherstationName" character varying NOT NULL, CONSTRAINT "PK_3ad51f349ffeaaeae96a1015a39" PRIMARY KEY ("contractId", "weatherstationName"))`);
        await queryRunner.query(`CREATE INDEX "IDX_47ae2a4b84a99a7bcff052f876" ON "contract_weatherstations_weatherstation" ("contractId") `);
        await queryRunner.query(`CREATE INDEX "IDX_82b8a11c88a7ec96d3c0a16c69" ON "contract_weatherstations_weatherstation" ("weatherstationName") `);
        await queryRunner.query(`ALTER TABLE "nearest_location" ADD CONSTRAINT "FK_54c0d2ab99d1c08a2122de2bbb7" FOREIGN KEY ("weatherstationName") REFERENCES "weatherstation"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nearest_location" ADD CONSTRAINT "FK_25cd5af4ae8c78b8e43481bd242" FOREIGN KEY ("countryCode") REFERENCES "country"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weather_data" ADD CONSTRAINT "FK_77be1a09af1d93b7cda3a41586e" FOREIGN KEY ("weatherstationName") REFERENCES "weatherstation"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract" ADD CONSTRAINT "FK_f0884eb48f6545dbd5cf846c514" FOREIGN KEY ("subscriptionId") REFERENCES "subscription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_e4543f99d629cf2c04fe9332e30" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "geolocation" ADD CONSTRAINT "FK_14eaa335f3c255e556c5a28370c" FOREIGN KEY ("weatherstationName") REFERENCES "weatherstation"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "geolocation" ADD CONSTRAINT "FK_b67b12241dc59c3b32b3a399e68" FOREIGN KEY ("countryCode") REFERENCES "country"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contract_weatherstations_weatherstation" ADD CONSTRAINT "FK_47ae2a4b84a99a7bcff052f876c" FOREIGN KEY ("contractId") REFERENCES "contract"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "contract_weatherstations_weatherstation" ADD CONSTRAINT "FK_82b8a11c88a7ec96d3c0a16c698" FOREIGN KEY ("weatherstationName") REFERENCES "weatherstation"("name") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract_weatherstations_weatherstation" DROP CONSTRAINT "FK_82b8a11c88a7ec96d3c0a16c698"`);
        await queryRunner.query(`ALTER TABLE "contract_weatherstations_weatherstation" DROP CONSTRAINT "FK_47ae2a4b84a99a7bcff052f876c"`);
        await queryRunner.query(`ALTER TABLE "geolocation" DROP CONSTRAINT "FK_b67b12241dc59c3b32b3a399e68"`);
        await queryRunner.query(`ALTER TABLE "geolocation" DROP CONSTRAINT "FK_14eaa335f3c255e556c5a28370c"`);
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_e4543f99d629cf2c04fe9332e30"`);
        await queryRunner.query(`ALTER TABLE "contract" DROP CONSTRAINT "FK_f0884eb48f6545dbd5cf846c514"`);
        await queryRunner.query(`ALTER TABLE "weather_data" DROP CONSTRAINT "FK_77be1a09af1d93b7cda3a41586e"`);
        await queryRunner.query(`ALTER TABLE "nearest_location" DROP CONSTRAINT "FK_25cd5af4ae8c78b8e43481bd242"`);
        await queryRunner.query(`ALTER TABLE "nearest_location" DROP CONSTRAINT "FK_54c0d2ab99d1c08a2122de2bbb7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_82b8a11c88a7ec96d3c0a16c69"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_47ae2a4b84a99a7bcff052f876"`);
        await queryRunner.query(`DROP TABLE "contract_weatherstations_weatherstation"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "geolocation"`);
        await queryRunner.query(`DROP TABLE "subscription"`);
        await queryRunner.query(`DROP TABLE "contract"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "weather_data"`);
        await queryRunner.query(`DROP TABLE "nearest_location"`);
        await queryRunner.query(`DROP TABLE "country"`);
        await queryRunner.query(`DROP TABLE "weatherstation"`);
    }

}
