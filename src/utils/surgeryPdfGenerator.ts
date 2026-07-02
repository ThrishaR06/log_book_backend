import PDFDocument from "pdfkit";

export async function generateSurgeryPdf(
    data: any
): Promise<Buffer> {

    return new Promise((resolve, reject) => {

        const doc = new PDFDocument({
            size: "A4",
            margin: 40,
        });

        const buffers: Buffer[] = [];

        doc.on("data", (chunk) => buffers.push(chunk));

        doc.on("end", () => {
            resolve(Buffer.concat(buffers));
        });

        doc.on("error", reject);

        // ===========================
        // TITLE
        // ===========================

        doc
            .fontSize(22)
            .fillColor("#166534")
            .text("SURGERY CASE REPORT", {
                align: "center",
            });

        doc.moveDown(2);

        // ===========================
        // PATIENT INFORMATION
        // ===========================

        doc
            .fontSize(16)
            .fillColor("#166534")
            .text("Patient Information");

        doc.moveDown(0.5);

        doc.fontSize(11).fillColor("black");

        doc.text(`Patient Name : ${data.patientName ?? "-"}`);
        doc.text(`Age : ${data.age ?? "-"}`);
        doc.text(`Gender : ${data.sex ?? "-"}`);
        doc.text(`UHID Number : ${data.uhidNo ?? "-"}`);
        doc.text(`Blood Group : ${data.bloodGroup ?? "-"}`);

        doc.moveDown();

        // ===========================
        // CASE INFORMATION
        // ===========================

        doc
            .fontSize(16)
            .fillColor("#166534")
            .text("Case Information");

        doc.moveDown(0.5);

        doc.fontSize(11).fillColor("black");

        doc.text(`Hospital : ${data.hospital ?? "-"}`);
        doc.text(`Case Number : ${data.caseNumber ?? "-"}`);
        doc.text(
            `Case Date : ${
                data.caseDate
                    ? new Date(data.caseDate).toLocaleDateString()
                    : "-"
            }`
        );

        doc.text(`Start Time : ${data.startTime ?? "-"}`);
        doc.text(`End Time : ${data.endTime ?? "-"}`);
        doc.text(`Duration : ${data.duration ?? "-"}`);

        doc.moveDown();

        // ===========================
        // SURGERY DETAILS
        // ===========================

        doc
            .fontSize(16)
            .fillColor("#166534")
            .text("Surgery Details");

        doc.moveDown(0.5);

        doc.fontSize(11).fillColor("black");

        doc.text(`Surgeon : ${data.surgeon ?? "-"}`);
        doc.text(`Diagnosis : ${data.diagnosis ?? "-"}`);

        doc.moveDown();

        // ===========================
        // OPERATIVE DETAILS
        // ===========================

        doc
            .fontSize(16)
            .fillColor("#166534")
            .text("Operative Details");

        doc.moveDown(0.5);

        doc.fontSize(11).fillColor("black");

        doc.text(`Operative Findings : ${data.operativeFindings ?? "-"}`);
        doc.moveDown(0.5);

        doc.text(`Procedure Details : ${data.procedureDetails ?? "-"}`);
        doc.moveDown(0.5);

        doc.text(`Blood Loss : ${data.bloodLoss ?? "-"}`);
        doc.text(`Specimens : ${data.specimens ?? "-"}`);
        doc.text(`Additional Notes : ${data.additionalNotes ?? "-"}`);

        doc.moveDown();

        // ===========================
        // POST OPERATIVE CARE
        // ===========================

        doc
            .fontSize(16)
            .fillColor("#166534")
            .text("Post Operative Care");

        doc.moveDown(0.5);

        doc.fontSize(11).fillColor("black");

        doc.text(`Monitoring : ${data.monitoring ?? "-"}`);
        doc.text(`Diet : ${data.diet ?? "-"}`);
        doc.text(`Drain Management : ${data.drainManagement ?? "-"}`);
        doc.text(`Wound Care : ${data.woundCare ?? "-"}`);
        doc.text(
            `Special Instructions : ${data.specialInstructions ?? "-"}`
        );
        doc.text(`Follow Up : ${data.followUp ?? "-"}`);
        doc.text(`Follow Up Imaging : ${data.followUpImaging ?? "-"}`);

        doc.moveDown();

        // ===========================
        // FINANCIAL DETAILS
        // ===========================

        doc
            .fontSize(16)
            .fillColor("#166534")
            .text("Financial Details");

        doc.moveDown(0.5);

        doc.fontSize(11).fillColor("black");

        doc.text(`Doctor Fee : ₹${data.doctorFee ?? "0"}`);
        doc.text(`Doctor Payment Mode : ${data.doctorPaymentMode ?? "-"}`);
        doc.text(`Doctor Remarks : ${data.doctorRemarks ?? "-"}`);

        doc.moveDown(0.5);

        doc.text(`Assistant Fee : ₹${data.assistantFee ?? "0"}`);
        doc.text(`Assistant Payment Mode : ${data.assistantPaymentMode ?? "-"}`);
        doc.text(`Assistant Remarks : ${data.assistantRemarks ?? "-"}`);

        doc.moveDown(0.5);

        doc.text(`Implant Fee : ₹${data.implantFee ?? "0"}`);
        doc.text(`Implant Payment Mode : ${data.implantPaymentMode ?? "-"}`);
        doc.text(`Implant Details : ${data.implantDetails ?? "-"}`);

        doc.text(
            `Implant Paid By Hospital : ${
                data.implantPaidByHospital ? "Yes" : "No"
            }`
        );

        doc.text(
            `Implant Received From Hospital : ${
                data.implantReceivedFromHospital ? "Yes" : "No"
            }`
        );

        doc.moveDown();

        doc
            .fontSize(14)
            .fillColor("#166534")
            .text(`Total Amount : ₹${data.totalAmount ?? "0"}`);

        doc.moveDown(2);

        doc
            .fontSize(10)
            .fillColor("gray")
            .text(
                `Generated on ${new Date().toLocaleString()}`,
                {
                    align: "center",
                }
            );

        doc.end();
    });
}