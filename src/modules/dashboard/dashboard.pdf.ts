import PDFDocument from "pdfkit";

export class DashboardPdf {

    static generate(
        data: any[],
        doctorName: string = "Doctor"
    ) {

        const doc = new PDFDocument({
            size: "A4",
            layout: "landscape",
            margin: 25,
        });

        const buffers: Buffer[] = [];

        doc.on("data", buffers.push.bind(buffers));

        return new Promise<Buffer>((resolve) => {

            doc.on("end", () => {
                resolve(Buffer.concat(buffers));
            });

            //==========================================
            // TITLE
            //==========================================

            doc
                .font("Helvetica-Bold")
                .fontSize(24)
                .fillColor("#23356F")
                .text("operative Records");

            doc.moveDown(0.4);

            doc
                .font("Helvetica")
                .fontSize(11)
                .fillColor("black")
                .text(
                    `${data.length} cases • Surgeon : ${doctorName}`
                );

            doc.moveDown(1);

            //------------------------------------------
            // TABLE SETTINGS
            //------------------------------------------

            const startX = 25;

            let y = doc.y;

            const headerHeight = 28;

            const rowHeight = 38;

            const columns = [

                { title: "S.No", width: 35 },

                { title: "Date", width: 65 },

                { title: "Case No.", width: 75 },

                { title: "Patient", width: 95 },

                { title: "Age/Sex", width: 80 },

                { title: "Diagnosis", width: 130 },

                { title: "Procedure", width: 95 },

                { title: "Hospital", width: 120 },

                { title: "Fees (₹)", width: 70 },

            ];

            //------------------------------------------
            // DRAW HEADER
            //------------------------------------------

            const drawHeader = () => {

                let x = startX;

                columns.forEach((column) => {

                    doc
                        .rect(
                            x,
                            y,
                            column.width,
                            headerHeight
                        )
                        .fill("#3F5E9C");

                    doc
                        .fillColor("white")
                        .font("Helvetica-Bold")
                        .fontSize(9)
                        .text(
                            column.title,
                            x,
                            y + 9,
                            {
                                width: column.width,
                                align: "center",
                            }
                        );

                    x += column.width;

                });

                y += headerHeight;

            };

            drawHeader();

            //------------------------------------------
            // TABLE ROWS
            //------------------------------------------

            data.forEach((item: any, index: number) => {

                if (y + rowHeight > 540) {

                    doc.addPage();

                    y = 30;

                    drawHeader();

                }

                let x = startX;

                const row = [

    index + 1,

    item.case_date
        ? new Date(item.case_date).toLocaleDateString("en-GB")
        : "-",

    item.case_number ?? "-",

    item.patient_name ?? "-",

    `${item.age ?? "-"} / ${item.sex ?? "-"}`,

    item.diagnosis ?? "-",

    item.procedureName ?? "-",

    item.hospital ?? "-",

    item.doctor_fee
        ? `₹${Number(item.doctor_fee).toLocaleString("en-IN")}`
        : "-",
];

                row.forEach((value, i) => {

                    doc
                        .rect(
                            x,
                            y,
                            columns[i].width,
                            rowHeight
                        )
                        .stroke("#D4D8E3");

                    doc
                        .fillColor("black")
                        .font("Helvetica")
                        .fontSize(8)
                        .text(
                            String(value ?? "-"),
                            x + 4,
                            y + 10,
                            {
                                width: columns[i].width - 8,
                                align:
                                    i === 0
                                        ? "center"
                                        : "left",
                            }
                        );

                    x += columns[i].width;

                });

                y += rowHeight;

            });

            //------------------------------------------
            // FOOTER
            //------------------------------------------

            doc.moveDown(2);

            doc
                .font("Helvetica")
                .fontSize(9)
                .fillColor("gray")
                .text(
                    `Generated on ${new Date().toLocaleString()}`,
                    {
                        align: "right",
                    }
                );

            doc.end();

        });

    }

}