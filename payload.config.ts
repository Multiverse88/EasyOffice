import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig, type CollectionConfig } from "payload";
import { s3Storage } from "@payloadcms/storage-s3";
import { AboutPage, Articles, ComparisonRows, Faqs, HomepageFacilities, Kategori, PageLayout, Kantor, Leads, LayananKantor, Media, Partners, Promotions, Services, SiteSettings, Testimonials, WhatsAppNumbers, isAdmin } from "./payload/collections/content";
import { lexicalEditor, FixedToolbarFeature, HeadingFeature } from "@payloadcms/richtext-lexical";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
    },
  ],
  access: { read: isAdmin, create: isAdmin, update: isAdmin, delete: isAdmin },
};

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET ?? "",
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, "app/(payload)"),
    },
    // @ts-expect-error Payload runtime supports custom views in this version.
    views: {
      puckBuilder: {
        path: "/puck-builder",
        exact: true,
            Component: { path: "../../payload/components/puck-manager-view.tsx", exportName: "default" },
      },
    },
  },
  collections: [Users, Services, Kantor, LayananKantor, Kategori, Articles, WhatsAppNumbers, Media, Partners, Promotions, Testimonials, ComparisonRows, PageLayout, Faqs, HomepageFacilities, Leads],
  plugins: [
    s3Storage({
      bucket: "media",
      clientUploads: true,
      collections: {
        media: {
          prefix: "",
          disableLocalStorage: true,
          generateFileURL: ({ filename, prefix }) => {
            const objectPath = [prefix, filename].filter((part): part is string => Boolean(part)).map((part) => encodeURIComponent(part)).join("/");
            return `${process.env.SUPABASE_URL ?? "https://qbfgapkitvhlylyrbivs.supabase.co"}/storage/v1/object/public/media/${objectPath}`;
          },
        },
      },
      config: {
        endpoint: process.env.SUPABASE_S3_ENDPOINT ?? "https://qbfgapkitvhlylyrbivs.storage.supabase.co/storage/v1/s3",
        region: process.env.SUPABASE_S3_REGION ?? "ap-northeast-1",
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY ?? "",
          secretAccessKey: process.env.SUPABASE_S3_SECRET_KEY ?? "",
        },
      },
    }),
  ],
  globals: [SiteSettings, AboutPage],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
      HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
    ],
  }),
  db: postgresAdapter({
    migrationDir: path.resolve(dirname, "migrations"),
    push: false,
    pool: {
      connectionString: process.env.DATABASE_URL ?? "",
    },
  }),
  sharp,
  graphQL: {
    disable: true,
  },
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  onInit: async (payload) => {
    const adminEmail = (process.env.PAYLOAD_ADMIN_EMAIL || "admin@easyoffice.local").trim();
    const adminPassword = (process.env.PAYLOAD_ADMIN_PASSWORD || "admin123").trim();

    if (adminEmail && adminPassword) {
      try {
        const users = await payload.find({
          collection: "users",
          where: {
            email: {
              equals: adminEmail,
            },
          },
          depth: 0,
          limit: 1,
        });

        if (users.totalDocs === 0) {
          await payload.create({
            collection: "users",
            data: {
              email: adminEmail,
              password: adminPassword,
              role: "admin",
              name: "Administrator",
            },
          });
          payload.logger.info(`[Auth] Created admin user from environment variables: ${adminEmail}`);
        } else {
          await payload.update({
            collection: "users",
            id: users.docs[0].id,
            data: {
              password: adminPassword,
              role: "admin",
            },
          });
          payload.logger.info(`[Auth] Synchronized admin password from environment variables: ${adminEmail}`);
        }
      } catch (error) {
        payload.logger.error(`[Auth] Failed to sync admin user from environment variables: ${error}`);
      }
    }
  },
  telemetry: false,
});
