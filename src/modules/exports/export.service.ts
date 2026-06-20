import { db } from "../../db";
import { surgeries } from "../../db/schema/surgeries";
import { hospitals } from "../../db/schema/hospitals";
import { templates } from "../../db/schema/templates";

import { eq } from "drizzle-orm";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";

export class ExportService {

    // =========================
    // 1. EXPORT SURGERIES (EXCEL)
    // =========================
    static async exportSurgeriesExcel(doctorId: number) {

        const data = await db
            .select({
                id: surgeries.id,
                hospital: hospitals.name,
                template: templates.name,
                date: surgeries.surgeryDate,
                earnings: surgeries.earnings,
                notes: surgeries.notes,
            })
            .from(surgeries)
            .innerJoin(hospitals, eq(surgeries.hospitalId, hospitals.id))
            .innerJoin(templates, eq(surgeries.templateId, templates.id))
            .where(eq(surgeries.doctorId, doctorId));

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Surgeries");

        sheet.columns = [
            { header: "ID", key: "id", width: 10 },
            { header: "Hospital", key: "hospital", width: 20 },
            { header: "Template", key: "template", width: 25 },
            { header: "Date", key: "date", width: 15 },
            { header: "Earnings", key: "earnings", width: 15 },
            { header: "Notes", key: "notes", width: 30 },
        ];

        data.forEach(row => {
            sheet.addRow(row);
        });

        return workbook;
    }

    // =========================
    // 2. EXPORT EARNINGS (PDF)
    // =========================
    static async exportEarningsPDF(doctorId: number) {

        const data = await db
            .select({
                totalEarnings: surgeries.earnings,
                date: surgeries.surgeryDate,
            })
            .from(surgeries)
            .where(eq(surgeries.doctorId, doctorId));

        const doc = new PDFDocument();

        return new Promise((resolve) => {

            let buffers: any[] = [];

            doc.on("data", buffers.push.bind(buffers));

            doc.on("end", () => {
                const pdfData = Buffer.concat(buffers);
                resolve(pdfData);
            });

            doc.fontSize(20).text("Earnings Report", { align: "center" });
            doc.moveDown();

            let total = 0;

            data.forEach((item, index) => {
                total += Number(item.totalEarnings);

                doc.fontSize(12).text(
                    `${index + 1}. Date: ${item.date} | Earnings: ${item.totalEarnings}`
                );
            });

            doc.moveDown();
            doc.fontSize(14).text(`Total Earnings: ${total}`);

            doc.end();
        });
    }
}