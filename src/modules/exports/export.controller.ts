import { ExportService } from "./export.service";

export class ExportController {

    // EXCEL EXPORT
    static async exportSurgeries({ store, set }: any) {

        const workbook =
            await ExportService.exportSurgeriesExcel(
                store.user.id
            );

        set.headers["Content-Type"] =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

        set.headers["Content-Disposition"] =
            "attachment; filename=surgeries.xlsx";

        const buffer = await workbook.xlsx.writeBuffer();

        return buffer;
    }

    // PDF EXPORT
    static async exportEarnings({ store, set }: any) {

        const pdfBuffer =
            await ExportService.exportEarningsPDF(
                store.user.id
            );

        set.headers["Content-Type"] = "application/pdf";
        set.headers["Content-Disposition"] =
            "attachment; filename=earnings.pdf";

        return pdfBuffer;
    }
}