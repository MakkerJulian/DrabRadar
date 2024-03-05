import { MigrationInterface, QueryRunner } from 'typeorm';

export class Iteration11709640257152 implements MigrationInterface {
  name = 'Iteration11709640257152';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "country" ("code" character varying NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8ff4c23dc9a3f3856555bd86186" PRIMARY KEY ("code"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "geolocation" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "island" character varying, "county" character varying, "place" character varying, "hamlet" character varying, "town" character varying, "municipality" character varying, "state_district" character varying, "administrative" character varying, "state" character varying, "village" character varying, "region" character varying, "province" character varying, "city" character varying, "locality" character varying, "postcode" character varying, "countryCode" character varying, CONSTRAINT "PK_36aa5f8d0de597a21a725ee1cc2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "weatherstation" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "longitude" integer NOT NULL, "latitude" integer NOT NULL, "elevation" integer NOT NULL, CONSTRAINT "PK_8b3d2b285b0adf69cdafd11099a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "weatherstation_data" ("id" SERIAL NOT NULL, "datetime" TIMESTAMP NOT NULL, "temp" integer NOT NULL, "dew_point" integer NOT NULL, "s_airpressure" integer NOT NULL, "sea_airpressure" integer NOT NULL, "visibility" integer NOT NULL, "windspeed" integer NOT NULL, "precipitation" integer NOT NULL, "snow_amount" integer NOT NULL, "freezing" boolean NOT NULL DEFAULT false, "rain" boolean NOT NULL DEFAULT false, "snow" boolean NOT NULL DEFAULT false, "hail" boolean NOT NULL DEFAULT false, "thunder" boolean NOT NULL DEFAULT false, "tornado" boolean NOT NULL DEFAULT false, "clouds" integer NOT NULL, "wind_direction" integer NOT NULL, "weatherstationId" integer, CONSTRAINT "PK_bd4033afa8f7eb584300e899e18" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "nearest_location" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "admin_region_name1" character varying NOT NULL, "admin_region_name2" character varying, "longitude" integer NOT NULL, "latitude" integer NOT NULL, "weatherstationId" integer, "countryCode" character varying, CONSTRAINT "PK_e5185e48ea7bdae2dbc6d63a306" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" integer, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "subscription" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "clientId" integer, CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "account" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying, "phone" character varying, "password" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "contract" ("id" SERIAL NOT NULL, "level" integer NOT NULL, "subscriptionId" integer, CONSTRAINT "PK_17c3a89f58a2997276084e706e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "geolocation" ADD CONSTRAINT "FK_b67b12241dc59c3b32b3a399e68" FOREIGN KEY ("countryCode") REFERENCES "country"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "weatherstation_data" ADD CONSTRAINT "FK_853096ef2aee29be468a23fdd8b" FOREIGN KEY ("weatherstationId") REFERENCES "weatherstation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "nearest_location" ADD CONSTRAINT "FK_b8058714adeb71a87a1c29f9e8d" FOREIGN KEY ("weatherstationId") REFERENCES "weatherstation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "nearest_location" ADD CONSTRAINT "FK_25cd5af4ae8c78b8e43481bd242" FOREIGN KEY ("countryCode") REFERENCES "country"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" ADD CONSTRAINT "FK_abf97d7c93eb255c0f18dee2a55" FOREIGN KEY ("clientId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contract" ADD CONSTRAINT "FK_f0884eb48f6545dbd5cf846c514" FOREIGN KEY ("subscriptionId") REFERENCES "subscription"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contract" DROP CONSTRAINT "FK_f0884eb48f6545dbd5cf846c514"`,
    );
    await queryRunner.query(
      `ALTER TABLE "subscription" DROP CONSTRAINT "FK_abf97d7c93eb255c0f18dee2a55"`,
    );
    await queryRunner.query(
      `ALTER TABLE "nearest_location" DROP CONSTRAINT "FK_25cd5af4ae8c78b8e43481bd242"`,
    );
    await queryRunner.query(
      `ALTER TABLE "nearest_location" DROP CONSTRAINT "FK_b8058714adeb71a87a1c29f9e8d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "weatherstation_data" DROP CONSTRAINT "FK_853096ef2aee29be468a23fdd8b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "geolocation" DROP CONSTRAINT "FK_b67b12241dc59c3b32b3a399e68"`,
    );
    await queryRunner.query(`DROP TABLE "contract"`);
    await queryRunner.query(`DROP TABLE "account"`);
    await queryRunner.query(`DROP TABLE "subscription"`);
    await queryRunner.query(`DROP TABLE "customer"`);
    await queryRunner.query(`DROP TABLE "nearest_location"`);
    await queryRunner.query(`DROP TABLE "weatherstation_data"`);
    await queryRunner.query(`DROP TABLE "weatherstation"`);
    await queryRunner.query(`DROP TABLE "geolocation"`);
    await queryRunner.query(`DROP TABLE "country"`);
  }
}
