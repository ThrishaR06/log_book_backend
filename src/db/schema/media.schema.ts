import { mysqlTable, bigint, varchar, boolean, timestamp } from "drizzle-orm/mysql-core";

export const media = mysqlTable("media", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),

  fileName: varchar("file_name", { length: 255 }).notNull(),
  s3Key: varchar("s3_key", { length: 512 }).notNull(),
  mimeType: varchar("mime_type", { length: 100 }).notNull(),

  surgeryCaseId: bigint("surgery_case_id", { mode: "number" }),

  mediaType: varchar("media_type", { length: 50 }),

  size: bigint("size", { mode: "number" }).notNull(),

  isPublic: boolean("is_public").default(false),

  uploadedBy: bigint("uploaded_by", { mode: "number" }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});