export interface CreateSurgeryStaffDto {
  doctorId: number;
  staffType:
    | "ANAESTHETIST"
    | "ASSISTANT_SURGEON"
    | "SCRUB_NURSE"
    | "OT_NURSE";

  name: string;

  qualification?: string;

  mobile?: string;
}