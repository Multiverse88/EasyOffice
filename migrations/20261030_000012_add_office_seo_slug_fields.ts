import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "kantor" ADD COLUMN IF NOT EXISTS "seo_slug" varchar;
    ALTER TABLE "layanan_kantor" ADD COLUMN IF NOT EXISTS "seo_slug" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "layanan_kantor" DROP COLUMN IF EXISTS "seo_slug";
    ALTER TABLE "kantor" DROP COLUMN IF EXISTS "seo_slug";
  `)
}
