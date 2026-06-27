import { t } from "elysia";
import { Elysia } from "elysia";

export const updateSurgeryCaseSchema = t.Object({

  surgeryId: t.Optional(t.String()),

  patientName: t.Optional(t.String()),
  age: t.Optional(t.String()),
  sex: t.Optional(t.String()),
  uhidNo: t.Optional(t.String()),
  bloodGroup: t.Optional(t.String()),
  hospital: t.String(),

  caseNumber: t.Optional(t.String()),
  caseDate: t.Optional(t.String()),

  startTime: t.Optional(t.String()),
  endTime: t.Optional(t.String()),
  duration: t.Optional(t.String()),

  surgeon: t.Optional(t.String()),

  anaesthesiaId: t.Optional(t.String()),
  positionId: t.Optional(t.String()),
  incisionId: t.Optional(t.String()),

  staffIds: t.Optional(t.Any()),

  surgeryProcedure: t.Optional(t.Any()),

  diagnosis: t.Optional(t.String()),
  operativeFindings: t.Optional(t.String()),
  procedureDetails: t.Optional(t.String()),

  bloodLoss: t.Optional(t.String()),
  specimens: t.Optional(t.String()),
  additionalNotes: t.Optional(t.String()),

  ivFluidIds: t.Optional(t.Any()),
  medicationIds: t.Optional(t.Any()),

  monitoring: t.Optional(t.String()),
  diet: t.Optional(t.String()),

  drainManagement: t.Optional(t.String()),
  woundCare: t.Optional(t.String()),

  specialInstructions: t.Optional(t.String()),
  followUp: t.Optional(t.String()),
  followUpImaging: t.Optional(t.String()),

  preOpImages: t.Optional(t.Any()),
  intraOpImages: t.Optional(t.Any()),
  postOpImages: t.Optional(t.Any()),

  doctorFee: t.Optional(t.String()),
  doctorPaymentMode: t.Optional(t.String()),
  doctorRemarks: t.Optional(t.String()),

  assistantFee: t.Optional(t.String()),
  assistantPaymentMode: t.Optional(t.String()),
  assistantRemarks: t.Optional(t.String()),

  implantFee: t.Optional(t.String()),
  implantPaymentMode: t.Optional(t.String()),
  implantDetails: t.Optional(t.String()),

  implantPaidByHospital: t.Optional(t.String()),
  implantReceivedFromHospital: t.Optional(t.String()),

  totalAmount: t.Optional(t.String())

});