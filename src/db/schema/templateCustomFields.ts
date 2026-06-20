import {
    mysqlTable,
    bigint,
    varchar,
    text,
    timestamp
} from "drizzle-orm/mysql-core";

export const templateCustomFields =
mysqlTable(
    "template_custom_fields",
{
    id: bigint("id", {
        mode: "number",
    })
    .primaryKey()
    .autoincrement(),

    templateId: bigint(
        "template_id",
        {
            mode: "number",
        }
    ).notNull(),

    fieldLabel: varchar(
        "field_label",
        {
            length: 255,
        }
    ).notNull(),

    fieldType: varchar(
        "field_type",
        {
            length: 100,
        }
    ).notNull(),

    fieldOptions:
        text("field_options"),

    createdAt:
        timestamp("created_at")
        .defaultNow(),
});