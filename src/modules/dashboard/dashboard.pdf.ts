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

            const columns = [

                { title: "S.No", width: 35 },

                { title: "Date", width: 65 },

                { title: "Case No.", width: 75 },

                { title: "Patient", width: 95 },

                { title: "Age/Sex", width: 80 },

                { title: "Diagnosis", width: 180 },

                { title: "Procedure", width: 95 },

                { title: "Hospital", width: 120 },

                { title: "Fees", width: 70 },

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

            const getRowHeight = (row: any[]) => {

    let maxHeight = 20;

    row.forEach((value, i) => {

        const text = String(value ?? "-");

        const height = doc.heightOfString(text, {
            width: Math.max(columns[i].width - 8, 20),
        });

        if (Number.isFinite(height)) {
            maxHeight = Math.max(maxHeight, height);
        }

    });

    return Math.min(Math.max(maxHeight + 16, 38), 200);
};

            data.forEach((item: any, index: number) => {

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
            ? `RS.${Number(item.doctor_fee).toLocaleString("en-IN")}`
            : "-",

    ];

    const rowHeight = getRowHeight(row);

    // Page break check
    if (y + rowHeight > doc.page.height - 40) {

        doc.addPage();

        y = 30;

        drawHeader();

    }

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
            .fontSize(7)
            .text(
                String(value ?? "-"),
                x + 4,
                y + 6,
                {
                    width: columns[i].width - 8,
                    align: i === 0 ? "center" : "left",
                }
            );

        x += columns[i].width;

    });

    y += rowHeight;

});

  //------------------------------------------
// FOOTER
//------------------------------------------

y += 15;

if (y > doc.page.height - 40) {

    doc.addPage();

    y = 40;
}

const generatedOn = new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
}).format(new Date());

doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor("gray")
    .text(
        `Generated on ${generatedOn}`,
        startX,
        y,
        {
            width: doc.page.width - 25,
            align: "right",
        }
    );
    doc.end();

        });
        

    }

}