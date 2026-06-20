import { SurgeryCaseService }
from "./surgeryCase.service";

import { uploadToS3 }
from "../../utils/s3Upload";

export class SurgeryCaseController {

  private service =
    new SurgeryCaseService();

  async create(body: any) {


    console.log("BODY =", body);
console.log("PRE OP =", body.preOpImages);
console.log("INTRA OP =", body.intraOpImages);
console.log("POST OP =", body.postOpImages);
console.log("BODY KEYS =", Object.keys(body));


    const preOpImages: string[] = [];
    const intraOpImages: string[] = [];
    const postOpImages: string[] = [];

    if (body.preOpImages) {

      const files =
        Array.isArray(body.preOpImages)
        ? body.preOpImages
        : [body.preOpImages];

      for (const file of files) {

        const path =
await uploadToS3(
    file,
    "pre-op"
);

        preOpImages.push(path);
      }
    }

    if (body.intraOpImages) {

      const files =
        Array.isArray(body.intraOpImages)
        ? body.intraOpImages
        : [body.intraOpImages];

      for (const file of files) {

        const path =
await uploadToS3(
    file,
    "intra-op"
);

        intraOpImages.push(path);
      }
    }

    if (body.postOpImages) {

      const files =
        Array.isArray(body.postOpImages)
        ? body.postOpImages
        : [body.postOpImages];

      for (const file of files) {

        const path =
await uploadToS3(
    file,
    "post-op"
);

        postOpImages.push(path);
      }
    }

    body.preOpImages = preOpImages;
    body.intraOpImages = intraOpImages;
    body.postOpImages = postOpImages;

    // ===== FIX FOR FORM-DATA =====

    body.surgeryId = Number(body.surgeryId);

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

    // =============================

    return this.service.create(body);
  }
}