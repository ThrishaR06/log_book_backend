import {
  mysqlTable,
  bigint,
  text,
  varchar,
  decimal,
  boolean,
  timestamp,
  json,
} from "drizzle-orm/mysql-core";

export const surgeryCases = mysqlTable("surgery_cases", {
  id: bigint("id", { mode: "number" })
    .primaryKey()
    .autoincrement(),

  surgeryId: bigint("surgery_id", { mode: "number" }).notNull(),

  anaesthesiaId: bigint("anaesthesia_id", { mode: "number" }),

  positionId: bigint("position_id", { mode: "number" }),

  incisionId: bigint("incision_id", { mode: "number" }),

  staffIds: json("staff_ids"),

  surgeryProcedure: json("surgery_procedure"),

  diagnosis: text("diagnosis"),

  operativeFindings: text("operative_findings"),

  procedureDetails: text("procedure_details"),

  bloodLoss: varchar("blood_loss", {
    length: 255,
  }),

  specimens: text("specimens"),

  additionalNotes: text("additional_notes"),

  ivFluidIds: json("iv_fluid_ids"),

  medicationIds: json("medication_ids"),

  monitoring: text("monitoring"),

  diet: text("diet"),

  drainManagement: text("drain_management"),

  woundCare: text("wound_care"),

  specialInstructions: text("special_instructions"),

  followUp: text("follow_up"),

  followUpImaging: text("follow_up_imaging"),

  preOpImages: json("pre_op_images"),

  intraOpImages: json("intra_op_images"),

  postOpImages: json("post_op_images"),

  doctorFee: decimal("doctor_fee", {
    precision: 12,
    scale: 2,
  }),

  doctorPaymentMode: varchar("doctor_payment_mode", {
    length: 100,
  }),

  doctorRemarks: text("doctor_remarks"),

  assistantFee: decimal("assistant_fee", {
    precision: 12,
    scale: 2,
  }),

  assistantPaymentMode: varchar("assistant_payment_mode", {
    length: 100,
  }),

  assistantRemarks: text("assistant_remarks"),

  implantFee: decimal("implant_fee", {
    precision: 12,
    scale: 2,
  }),

  implantPaymentMode: varchar("implant_payment_mode", {
    length: 100,
  }),

  implantDetails: text("implant_details"),

  implantPaidByHospital: boolean("implant_paid_by_hospital")
    .default(false),

  implantReceivedFromHospital: boolean("implant_received_from_hospital")
    .default(false),

  totalAmount: decimal("total_amount", {
    precision: 12,
    scale: 2,
  }),

  createdAt: timestamp("created_at").defaultNow(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .onUpdateNow(),
});