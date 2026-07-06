import ExcelJS from "exceljs";

export class DashboardExcel {

    static async generate(data: any[]) {

        const workbook = new ExcelJS.Workbook();

        const worksheet = workbook.addWorksheet("Dashboard Report");

        // ------------------------------------------------
        // HEADERS
        // ------------------------------------------------

        worksheet.columns = [
            { header: "S.No", key: "sno", width: 8 },
            { header: "Date", key: "date", width: 15 },
            { header: "Case No", key: "caseNo", width: 18 },
            { header: "Patient", key: "patient", width: 25 },
            { header: "Age/Sex", key: "ageSex", width: 15 },
            { header: "Diagnosis", key: "diagnosis", width: 30 },
            { header: "Procedure", key: "procedure", width: 35 },
            { header: "Hospital", key: "hospital", width: 35 },
            { header: "Fees (₹)", key: "fees", width: 18 }
        ];

        // ------------------------------------------------
        // HEADER STYLE
        // ------------------------------------------------

        const header = worksheet.getRow(1);

        header.font = {
            bold: true,
            size: 12
        };

        header.alignment = {
            horizontal: "center",
            vertical: "middle"
        };

        header.eachCell((cell) => {

            cell.border = {
                top: { style: "thin" },
                bottom: { style: "thin" },
                left: { style: "thin" },
                right: { style: "thin" }
            };

        });

        // ------------------------------------------------
        // DATA
        // ------------------------------------------------

        data.forEach((item: any, index: number) => {

            worksheet.addRow({

                sno: index + 1,

                date: item.case_date
                    ? new Date(item.case_date).toLocaleDateString("en-GB")
                    : "-",

                caseNo: item.case_number ?? "-",

                patient: item.patient_name ?? "-",

                ageSex: `${item.age}/${item.sex}`,

                diagnosis: item.diagnosis ?? "-",

                procedure:
                    item.procedureName ??
                    item.surgery_procedure?.procedureName ??
                    "-",

                hospital: item.hospital ?? "-",

                fees: item.doctor_fee
                    ? Number(item.doctor_fee)
                    : ""
            });

        });

        // ------------------------------------------------
        // FORMAT ALL ROWS
        // ------------------------------------------------

        worksheet.eachRow((row, rowNumber) => {

            row.height = 22;

            row.eachCell((cell) => {

                cell.alignment = {
                    vertical: "middle",
                    horizontal:
                        rowNumber === 1 ? "center" : "left",
                    wrapText: true
                };

                cell.border = {
                    top: { style: "thin" },
                    bottom: { style: "thin" },
                    left: { style: "thin" },
                    right: { style: "thin" }
                };

            });

        });

        // ------------------------------------------------
        // FORMAT FEES COLUMN
        // ------------------------------------------------

        worksheet.getColumn("fees").numFmt = '₹#,##0.00';

        // ------------------------------------------------
        // AUTO FILTER
        // ------------------------------------------------

        worksheet.autoFilter = {
            from: "A1",
            to: "I1"
        };

       const buffer = await workbook.xlsx.writeBuffer();

return Buffer.from(buffer);

    }

}