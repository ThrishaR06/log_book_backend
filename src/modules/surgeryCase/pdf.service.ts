import PDFDocument from "pdfkit";

export class PdfService {
  async generatePdf(records: any[]): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        margin: 40,
        size: "A4",
      });

      const buffers: Buffer[] = [];

      doc.on("data", (chunk) => {
        buffers.push(chunk);
      });

      doc.on("end", () => {
        resolve(Buffer.concat(buffers));
      });

      doc.on("error", (err) => {
        reject(err);
      });

      // Title
      doc
        .fontSize(20)
        .text("Surgery Cases Report", {
          align: "center",
        });

      doc.moveDown();

      if (records.length === 0) {
        doc.fontSize(14).text("No surgery cases found.");
      } else {
        records.forEach((record, index) => {
          doc
            .fontSize(14)
            .text(`Case ${index + 1}`, {
              underline: true,
            });

          doc.moveDown(0.5);

          doc.fontSize(11);

          doc.text(`Patient Name : ${record.patientName ?? "-"}`);
          doc.text(`Age          : ${record.age ?? "-"}`);
          doc.text(`Gender       : ${record.sex ?? "-"}`);
          doc.text(`UHID         : ${record.uhidNo ?? "-"}`);
          doc.text(`Procedure    : ${record.surgeryName ?? "-"}`);
          doc.text(`Hospital     : ${record.hospitalName ?? "-"}`);
          doc.text(`Doctor       : ${record.doctorName ?? "-"}`);
          doc.text(`Date         : ${record.surgeryDate ?? "-"}`);

          doc.moveDown();

          doc.moveTo(40, doc.y)
            .lineTo(550, doc.y)
            .stroke();

          doc.moveDown();
        });
      }

      doc.end();
    });
  }
}