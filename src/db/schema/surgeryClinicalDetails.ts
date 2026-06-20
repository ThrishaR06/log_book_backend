import {
    mysqlTable,
    bigint,
    text,
    timestamp,
} from "drizzle-orm/mysql-core";

export const surgeryClinicalDetails = mysqlTable(
    "surgery_clinical_details",
    {
        id: bigint("id", { mode: "number" })
            .primaryKey()
            .autoincrement(),

        surgeryId: bigint("surgery_id", {
            mode: "number",
        }).notNull(),

        diagnosis: text("diagnosis"),
        operativeFindings: text("operative_findings"),
        procedureDetails: text("procedure_details"),
        bloodLoss: text("blood_loss"),
        specimens: text("specimens"),
        additionalNotes: text("additional_notes"),

        createdAt: timestamp("created_at")
            .defaultNow(),

        updatedAt: timestamp("updated_at")
            .defaultNow(),
    }
);