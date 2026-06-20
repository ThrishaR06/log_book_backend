import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema/*.ts",
  out: "./src/db/migrations",
  dialect: "mysql",

  dbCredentials: {
    host: "127.0.0.1",   // ✅ IMPORTANT FIX
    port: 3306,
    user: "root",

    // ✅ IMPORTANT FIX (must NOT be empty string)
    password: undefined,

    database: "saas_db",
  },

  verbose: true,
  strict: true,
});