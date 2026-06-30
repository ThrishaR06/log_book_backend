import { pool } from "../../db";

export class PostOpOrdersRepository {

  async create(data: any) {

    const connection =
      await pool.getConnection();

    try {

      await connection.beginTransaction();

      const [result]: any =
        await connection.query(
          `
          INSERT INTO surgery_post_op_orders
          (
            surgery_id,
            monitoring,
            diet,
            drain_management,
            wound_care,
            special_instructions,
            follow_up,
            follow_up_imaging
          )
          VALUES
          (?, ?, ?, ?, ?, ?, ?, ?)
          `,
          [
            data.surgeryId,
            data.monitoring,
            data.diet,
            data.drainManagement,
            data.woundCare,
            data.specialInstructions,
            data.followUp,
            data.followUpImaging
          ]
        );

      for (
        const ivFluidId
        of data.ivFluidIds
      ) {

        await connection.query(
          `
          INSERT INTO surgery_post_op_iv_fluids
          (
            surgery_id,
            iv_fluid_id
          )
          VALUES
          (?, ?)
          `,
          [
            data.surgeryId,
            ivFluidId
          ]
        );
      }

      for (
        const medicationId
        of data.medicationIds
      ) {

        await connection.query(
          `
          INSERT INTO surgery_post_op_medications
          (
            surgery_id,
            medication_id
          )
          VALUES
          (?, ?)
          `,
          [
            data.surgeryId,
            medicationId
          ]
        );
      }

      await connection.commit();

      return result.insertId;

    } catch (error) {

      await connection.rollback();

      throw error;

    } finally {

      connection.release();
    }
  }

  async getBySurgeryId(
    surgeryId: number
  ) {

    const [orders]: any =
      await pool.query(
        `
        SELECT *
        FROM surgery_post_op_orders
        WHERE surgery_id = ?
        `,
        [surgeryId]
      );

    const [ivFluids]: any =
      await pool.query(
        `
        SELECT iv_fluid_id
        FROM surgery_post_op_iv_fluids
        WHERE surgery_id = ?
        `,
        [surgeryId]
      );

    const [medications]: any =
      await pool.query(
        `
        SELECT medication_id
        FROM surgery_post_op_medications
        WHERE surgery_id = ?
        `,
        [surgeryId]
      );

    return {
      ...orders[0],
      ivFluidIds:
        ivFluids.map(
          (x: any) =>
          x.iv_fluid_id
        ),

      medicationIds:
        medications.map(
          (x: any) =>
          x.medication_id
        )
    };
  }

  async validateDoctorSurgery(
    doctorId: number,
    surgeryId: number
) {

    const [rows]: any =
        await pool.query(
            `
            SELECT id
            FROM surgery_cases
            WHERE id = ?
            AND doctor_id = ?
            LIMIT 1
            `,
            [
                surgeryId,
                doctorId
            ]
        );

    return rows.length > 0;

}
}