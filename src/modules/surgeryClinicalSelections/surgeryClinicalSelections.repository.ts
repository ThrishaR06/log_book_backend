import { pool } from "../../db";

export class SurgeryClinicalSelectionsRepository {

  async create(data: any) {

    const [result]: any = await pool.query(
      `
      INSERT INTO surgery_clinical_selections
      (
        surgery_id,

        anaesthesia_id,
        position_id,
        incision_id,

        category_id,
        procedure_id,

        side_id,
        tumour_type_id,
        approach_id,

        staff_ids
      )
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        data.surgeryId,

        data.anaesthesiaId,
        data.positionId,
        data.incisionId,

        data.categoryId,
        data.procedureId,

        data.sideId,
        data.tumourTypeId,
        data.approachId,

        JSON.stringify(data.staffIds)
      ]
    );

    return result.insertId;
  }
}