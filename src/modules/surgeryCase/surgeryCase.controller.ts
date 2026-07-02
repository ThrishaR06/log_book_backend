import { SurgeryCaseService } from "./surgeryCase.service";
import { uploadToS3 } from "../../utils/s3Upload";
import { generateSurgeryPdf } from "../../utils/surgeryPdfGenerator";


export class SurgeryCaseController {
  private service = new SurgeryCaseService();

  private async prepareBody(body: any, doctor: any) {
    const preOpImages: { key: string; url: string }[] = [];

const intraOpImages: { key: string; url: string }[] = [];

const postOpImages: { key: string; url: string }[] = [];

    if (body.preOpImages) {
      const files = Array.isArray(body.preOpImages)
        ? body.preOpImages
        : [body.preOpImages];

      for (const file of files) {
        const path = await uploadToS3(file, "pre-op", doctor.full_name);
        console.log("UPLOAD RESULT =", path);

        preOpImages.push(path);
      }
    }

    if (body.intraOpImages) {
      const files = Array.isArray(body.intraOpImages)
        ? body.intraOpImages
        : [body.intraOpImages];

      for (const file of files) {
        const path = await uploadToS3(file, "intra-op", doctor.full_name);

        console.log("UPLOAD RESULT =", path);
        intraOpImages.push(path);
      }
    }

    if (body.postOpImages) {
      const files = Array.isArray(body.postOpImages)
        ? body.postOpImages
        : [body.postOpImages];

      for (const file of files) {
        const path = await uploadToS3(file, "post-op", doctor.full_name);
        console.log("UPLOAD RESULT =", path);
        
        postOpImages.push(path);
      }
    }

    body.preOpImages = preOpImages;
    body.intraOpImages = intraOpImages;
    body.postOpImages = postOpImages;

    body.patientName = body.patientName || null;
    body.age = body.age ? Number(body.age) : null;
    body.sex = body.sex || null;
    body.uhidNo = body.uhidNo || null;
    body.bloodGroup = body.bloodGroup || null;
    body.hospital = body.hospital || null;
    body.caseNumber = body.caseNumber || null;
    body.caseDate = body.caseDate || null;
    body.startTime = body.startTime || null;
    body.endTime = body.endTime || null;
    body.duration = body.duration || null;
    body.surgeon = body.surgeon || null;

    body.anaesthesiaId = body.anaesthesiaId
      ? Number(body.anaesthesiaId)
      : null;

    body.positionId = body.positionId
      ? Number(body.positionId)
      : null;

    body.incisionId = body.incisionId
      ? Number(body.incisionId)
      : null;

    body.doctorFee = Number(body.doctorFee || 0);
    body.assistantFee = Number(body.assistantFee || 0);
    body.implantFee = Number(body.implantFee || 0);
    body.totalAmount = Number(body.totalAmount || 0);

    body.implantPaidByHospital =
      body.implantPaidByHospital === "true";

    body.implantReceivedFromHospital =
      body.implantReceivedFromHospital === "true";

    if (body.staffIds) {
      body.staffIds =
        typeof body.staffIds === "string"
          ? JSON.parse(body.staffIds)
          : body.staffIds;
    }

    if (body.ivFluidIds) {
      body.ivFluidIds =
        typeof body.ivFluidIds === "string"
          ? JSON.parse(body.ivFluidIds)
          : body.ivFluidIds;
    }

    if (body.medicationIds) {
      body.medicationIds =
        typeof body.medicationIds === "string"
          ? JSON.parse(body.medicationIds)
          : body.medicationIds;
    }

    if (body.surgeryProcedure) {
      body.surgeryProcedure =
        typeof body.surgeryProcedure === "string"
          ? JSON.parse(body.surgeryProcedure)
          : body.surgeryProcedure;
    }

    return body;
  }

  private async prepareUpdateBody(body: any, doctor: any) {

  const preOpImages: { key: string; url: string }[] = [];
  const intraOpImages: { key: string; url: string }[] = [];
  const postOpImages: { key: string; url: string }[] = [];

  if (body.preOpImages) {
    const files = Array.isArray(body.preOpImages)
      ? body.preOpImages
      : [body.preOpImages];

    for (const file of files) {
      const path = await uploadToS3(file, "pre-op", doctor.full_name);
      preOpImages.push(path);
    }

    body.preOpImages = preOpImages;
  }

  if (body.intraOpImages) {
    const files = Array.isArray(body.intraOpImages)
      ? body.intraOpImages
      : [body.intraOpImages];

    for (const file of files) {
      const path = await uploadToS3(file, "intra-op", doctor.full_name);
      intraOpImages.push(path);
    }

    body.intraOpImages = intraOpImages;
  }

  if (body.postOpImages) {
    const files = Array.isArray(body.postOpImages)
      ? body.postOpImages
      : [body.postOpImages];

    for (const file of files) {
      const path = await uploadToS3(file, "post-op", doctor.full_name);
      postOpImages.push(path);
    }

    body.postOpImages = postOpImages;
  }

  if (body.age !== undefined) {
    body.age = Number(body.age);
  }

  if (body.anaesthesiaId !== undefined) {
    body.anaesthesiaId = Number(body.anaesthesiaId);
  }

  if (body.positionId !== undefined) {
    body.positionId = Number(body.positionId);
  }

  if (body.incisionId !== undefined) {
    body.incisionId = Number(body.incisionId);
  }

  if (body.doctorFee !== undefined) {
    body.doctorFee = Number(body.doctorFee);
  }

  if (body.assistantFee !== undefined) {
    body.assistantFee = Number(body.assistantFee);
  }

  if (body.implantFee !== undefined) {
    body.implantFee = Number(body.implantFee);
  }

  if (body.totalAmount !== undefined) {
    body.totalAmount = Number(body.totalAmount);
  }

  if (body.implantPaidByHospital !== undefined) {
    body.implantPaidByHospital =
      body.implantPaidByHospital === "true" ||
      body.implantPaidByHospital === true;
  }

  if (body.implantReceivedFromHospital !== undefined) {
    body.implantReceivedFromHospital =
      body.implantReceivedFromHospital === "true" ||
      body.implantReceivedFromHospital === true;
  }

  if (body.staffIds !== undefined) {
    body.staffIds =
      typeof body.staffIds === "string"
        ? JSON.parse(body.staffIds)
        : body.staffIds;
  }

  if (body.ivFluidIds !== undefined) {
    body.ivFluidIds =
      typeof body.ivFluidIds === "string"
        ? JSON.parse(body.ivFluidIds)
        : body.ivFluidIds;
  }

  if (body.medicationIds !== undefined) {
    body.medicationIds =
      typeof body.medicationIds === "string"
        ? JSON.parse(body.medicationIds)
        : body.medicationIds;
  }

  if (body.surgeryProcedure !== undefined) {
    body.surgeryProcedure =
      typeof body.surgeryProcedure === "string"
        ? JSON.parse(body.surgeryProcedure)
        : body.surgeryProcedure;
  }

  return body;
}
  async create(context: any) {
    try {

      console.log(context.store.user);
      console.log("Logged In User =", context.store.user);

      const body: any = context.body;

      console.log("BODY =", body);

      if (body.preOpImages && !Array.isArray(body.preOpImages)) {
        body.preOpImages = [body.preOpImages];
      }

      if (body.intraOpImages && !Array.isArray(body.intraOpImages)) {
        body.intraOpImages = [body.intraOpImages];
      }

      if (body.postOpImages && !Array.isArray(body.postOpImages)) {
        body.postOpImages = [body.postOpImages];
      }

      const doctor = await this.service.getDoctorById(
        context.store.user.id
      );

      body.doctorId = doctor.id;

      await this.prepareBody(body, doctor);

      return this.service.create(body);

    } catch (error: any) {

      return {
        success: false,
        message:
          error.message ||
          "Something went wrong while creating surgery case.",
      };

    }
  }

  async getById(params: any) {
    try {

      const id = Number(params.id);

      if (!id) {
        throw new Error("Invalid surgery case id");
      }

      return await this.service.getById(id);

    } catch (error: any) {

      return {
        success: false,
        message:
          error.message ||
          "Something went wrong while fetching surgery case.",
      };

    }
  }

 async getAll(context: any) {
  try {

    const doctorId = context.store.user.id;

    const page = Number(context.query.page || 1);

    const limit = Number(context.query.limit || 10);

    const filters = {

      patientName: context.query.patientName,

      hospital: context.query.hospital,

      caseNumber: context.query.caseNumber,

      caseDate: context.query.caseDate,

    };

    return this.service.getAllByDoctorId(
      doctorId,
      page,
      limit,
      filters
    );

  } catch (error: any) {

    return {
      success: false,
      message:
        error.message ||
        "Something went wrong while fetching surgery cases.",
    };

  }
}

  async update(context: any) {
    try {

      const id = Number(context.params.id);

      console.log("========== UPDATE ==========");
console.log("Params :", context.params);
console.log("Update Id :", id);

      const loggedInDoctorId = context.store.user.id;

      const doctor =
        await this.service.getDoctorInfoByCaseId(id);

      if (doctor.id !== loggedInDoctorId) {
        throw new Error(
          "You are not allowed to update this surgery case."
        );
      }

      const body = context.body;

      await this.prepareUpdateBody(body, doctor);

      return this.service.update(id, body);

    } catch (error: any) {

    console.error("UPDATE ERROR");
    console.error(error);

    return {
        success: false,
        message: error.message,
        stack: error.stack,
    };

}
  }

  async delete(context: any) {
    try {

      const id = Number(context.params.id);

      const loggedInDoctorId = context.store.user.id;

      const doctor =
        await this.service.getDoctorInfoByCaseId(id);

      if (doctor.id !== loggedInDoctorId) {
        throw new Error(
          "You are not allowed to delete this surgery case."
        );
      }

      return this.service.delete(id);

    } catch (error: any) {

      return {
        success: false,
        message:
          error.message ||
          "Something went wrong while deleting surgery case.",
      };

    }
  }
 async downloadAllPdf(context: any) {

    try {

        const doctorId = context.store.user.id;

const surgeries = await this.service.getAllPdfData(doctorId);

const pdf = await generateSurgeryPdf(surgeries);

const body = new Uint8Array(pdf);

return new Response(body, {
  headers: {
    "Content-Type": "application/pdf",
    "Content-Disposition": 'attachment; filename="record.pdf"',
  },
});

    } catch (error: any) {

        return {
            success: false,
            message:
                error.message ||
                "Failed to generate PDF.",
        };

    }

}

async downloadPdf(context: any) {
    try {

        const id = Number(context.params.id);

        const loggedInDoctorId = context.store.user.id;

        const doctor =
            await this.service.getDoctorInfoByCaseId(id);

        if (doctor.id !== loggedInDoctorId) {
            throw new Error(
                "You are not allowed to download this surgery case."
            );
        }

      const surgery = await this.service.getPdfData(id);

const pdf = await generateSurgeryPdf(surgery);

context.set.headers["Content-Type"] = "application/pdf";
context.set.headers["Content-Disposition"] =
    `attachment; filename="surgery-case-${id}.pdf"`;

return pdf;
    } catch (error: any) {

        return {
            success: false,
            message:
                error.message ||
                "Failed to generate PDF.",
        };

    }
}

}