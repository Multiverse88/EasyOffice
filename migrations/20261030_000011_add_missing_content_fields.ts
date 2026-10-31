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
    ALTER TABLE "faqs" ADD COLUMN IF NOT EXISTS "title" varchar;
    ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "location" varchar;
    CREATE TABLE IF NOT EXISTS "faqs_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL REFERENCES "faqs"("id") ON DELETE CASCADE,
      "id" varchar PRIMARY KEY NOT NULL,
      "question" varchar NOT NULL,
      "answer" varchar NOT NULL,
      "sort_order" numeric DEFAULT 0
    );
    ALTER TABLE "faqs_items" ADD COLUMN IF NOT EXISTS "question" varchar;
    ALTER TABLE "faqs_items" ADD COLUMN IF NOT EXISTS "answer" varchar;
    ALTER TABLE "faqs_items" ADD COLUMN IF NOT EXISTS "sort_order" numeric DEFAULT 0;
    CREATE INDEX IF NOT EXISTS "faqs_items_order_idx" ON "faqs_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "faqs_items_parent_id_idx" ON "faqs_items" USING btree ("_parent_id");
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
    DROP TABLE IF EXISTS "faqs_items" CASCADE;
    ALTER TABLE "faqs" DROP COLUMN IF EXISTS "title";
    ALTER TABLE "leads" DROP COLUMN IF EXISTS "location";
  `)
}
