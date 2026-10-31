import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "homepage_hero_eyebrow" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "homepage_hero_image_id" integer;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "homepage_hero_image_alt" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "homepage_hero_image_label" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "homepage_hero_primary_cta_label" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "homepage_hero_primary_cta_message" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "homepage_hero_secondary_cta_label" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "homepage_hero_secondary_cta_href" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "homepage_hero_eyebrow";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "homepage_hero_image_id";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "homepage_hero_image_alt";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "homepage_hero_image_label";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "homepage_hero_primary_cta_label";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "homepage_hero_primary_cta_message";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "homepage_hero_secondary_cta_label";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "homepage_hero_secondary_cta_href";
  `)
}
