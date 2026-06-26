import {
  mysqlTable,
  bigint,
  varchar,
} from "drizzle-orm/mysql-core";

export const roles = mysqlTable("roles", {
  id: bigint("id", {
    mode: "number",
  })
    .primaryKey()
    .autoincrement(),

  name: varchar("name", {
    length: 50,
  }).notNull(),
});