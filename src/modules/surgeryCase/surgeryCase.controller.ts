import { SurgeryCaseService }
from "./surgeryCase.service";

import { uploadToS3 }
from "../../utils/s3Upload";

export class SurgeryCaseController {

   private service = new SurgeryCaseService();

    private async prepareBody(
        body: any,
        doctor: any
    ) {

        // We'll move all common logic here
            const preOpImages: string[] = [];
    const intraOpImages: string[] = [];
    const postOpImages: string[] = [];

    if (body.preOpImages) {

        const files = Array.isArray(body.preOpImages)
            ? body.preOpImages
            : [body.preOpImages];

        for (const file of files) {

            const path = await uploadToS3(
                file,
                "pre-op",
                doctor.name
            );

            preOpImages.push(path);
        }
    }

    if (body.intraOpImages) {

        const files = Array.isArray(body.intraOpImages)
            ? body.intraOpImages
            : [body.intraOpImages];

        for (const file of files) {

            const path = await uploadToS3(
                file,
                "Intra-op",
                doctor.name
            );

            intraOpImages.push(path);
        }
    }

    if (body.postOpImages) {

        const files = Array.isArray(body.postOpImages)
            ? body.postOpImages
            : [body.postOpImages];

        for (const file of files) {

            const path = await uploadToS3(
                file,
                "post-op",
                doctor.name
            );

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

 async create(context: any) {
   const loggedInDoctorId = context.store.user.id;

    // Get parsed body from Elysia
const body: any = context.body;

console.log("BODY =", body);

// Normalize image fields
if (body.preOpImages && !Array.isArray(body.preOpImages)) {
    body.preOpImages = [body.preOpImages];
}

if (body.intraOpImages && !Array.isArray(body.intraOpImages)) {
    body.intraOpImages = [body.intraOpImages];
}

if (body.postOpImages && !Array.isArray(body.postOpImages)) {
    body.postOpImages = [body.postOpImages];
}

    // Convert surgeryId once
    body.surgeryId = Number(body.surgeryId);

    const doctor =
        await this.service.getDoctorInfo(
            body.surgeryId
        );

    if (doctor.id !== loggedInDoctorId) {

        throw new Error(
            "You are not allowed to create a surgery case for this surgery."
        );
    }


await this.prepareBody(body, doctor);

    return this.service.create(body);
}

    async getById(params: any) {

  const id = Number(params.id);

  if (!id) {
    throw new Error("Invalid surgery case id");
  }

  return await this.service.getById(id);
}

async getAll(context:any){

const doctorId=context.store.user.id;

return this.service.getAllByDoctorId(doctorId);

}

async update(context:any){

    const id = Number(context.params.id);

    const loggedInDoctorId = context.store.user.id;

    const doctor =
        await this.service.getDoctorInfoByCaseId(id);

    if (doctor.id !== loggedInDoctorId) {

        throw new Error(
            "You are not allowed to update this surgery case."
        );
    }

    const body = context.body;

    await this.prepareBody(body, doctor);

    return this.service.update(id, body);
}


async delete(context:any){

    const id = Number(context.params.id);

    const loggedInDoctorId =
        context.store.user.id;

    const doctor =
        await this.service.getDoctorInfoByCaseId(id);

    if (doctor.id !== loggedInDoctorId) {

        throw new Error(
            "You are not allowed to delete this surgery case."
        );
    }

    return this.service.delete(id);
}

  }