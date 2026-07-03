import PDFDocument from "pdfkit";

/* ============================================================
   COLORS
============================================================ */

const COLORS = {
    primary: "#166534",
    text: "#111827",
    label: "#374151",
    border: "#D1D5DB",
    card: "#F9FAFB",
    footer: "#6B7280",
};

/* ============================================================
   PAGE
============================================================ */

const PAGE = {
    left: 40,
    right: 555,
    width: 515,
    center: 297, // A4 width is 612, center is 306, but we use 297 for better alignment
};

/* ============================================================
   HEADER
============================================================ */

function drawHeader(doc: PDFKit.PDFDocument) {

    doc
        .rect(0, 0, 612, 90)
        .fill(COLORS.primary);

    doc
        .fillColor("white")
        .font("Helvetica-Bold")
        .fontSize(24)
        .text(
            "SURGERY OPERATIVE REPORT",
            0,
            30,
            {
                align: "center",
            }
        );

    doc
        .fontSize(10)
        .text(
            "Generated Surgical Record",
            {
                align: "center",
            }
        );

    doc.moveDown(4);

}

/* ============================================================
   SECTION TITLE - CENTERED
============================================================ */

function section(
    doc: PDFKit.PDFDocument,
    title: string
) {

    doc.moveDown(1);

    // Center the title
    doc
        .font("Helvetica-Bold")
        .fontSize(15)
        .fillColor(COLORS.primary)
        .text(
            title,
            PAGE.left,
            doc.y,
            {
                width: PAGE.width,
                align: "center",
            }
        );

    const y = doc.y + 4;

    // Center the underline - measure width with current font settings
    const textWidth = doc.widthOfString(title);
    
    const underlineX = PAGE.center - (textWidth / 2);
    const underlineWidth = textWidth + 40; // Add some padding

    doc
        .strokeColor(COLORS.primary)
        .lineWidth(1)
        .moveTo(underlineX, y)
        .lineTo(underlineX + underlineWidth, y)
        .stroke();

    doc.moveDown();

}
/* ============================================================
   PATIENT CARD
============================================================ */

function infoCard(
    doc: PDFKit.PDFDocument,
    label: string,
    value: any,
    x: number,
    y: number,
    width = 155
) {

    doc
        .roundedRect(
            x,
            y,
            width,
            55,
            8
        )
        .fillAndStroke(
            COLORS.card,
            COLORS.border
        );

    doc
        .fillColor(COLORS.primary)
        .font("Helvetica-Bold")
        .fontSize(9)
        .text(
            label,
            x + 10,
            y + 8
        );

    doc
        .fillColor(COLORS.text)
        .font("Helvetica")
        .fontSize(11)
        .text(
            value ?? "-",
            x + 10,
            y + 26,
            {
                width: width - 20,
            }
        );

}

/* ============================================================
   TWO COLUMN FIELD - IMPROVED ALIGNMENT
============================================================ */

function row(
    doc: PDFKit.PDFDocument,
    label: string,
    value: any
) {

    const y = doc.y;

    // Left aligned label with proper spacing
    doc
        .font("Helvetica-Bold")
        .fontSize(10.5)
        .fillColor(COLORS.label)
        .text(
            label + ":",
            40,
            y,
            {
                width: 170,
                align: "left",
            }
        );

    // Value with proper indentation
    doc
        .font("Helvetica")
        .fillColor(COLORS.text)
        .fontSize(10.5)
        .text(
            value ?? "-",
            220,
            y,
            {
                width: 300,
                align: "left",
            }
        );

    doc.moveDown(.6);

}

/* ============================================================
   PARAGRAPH - CENTERED
============================================================ */

function paragraph(
    doc: PDFKit.PDFDocument,
    value: any
) {

    doc
        .font("Helvetica")
        .fontSize(10.5)
        .fillColor(COLORS.text)
        .text(
            value ?? "-",
            PAGE.left,
            doc.y,
            {
                width: PAGE.width,
                align: "justify",
                lineGap: 3,
            }
        );

    doc.moveDown();

}

/* ============================================================
   TOTAL AMOUNT CARD
============================================================ */

function totalCard(
    doc: PDFKit.PDFDocument,
    amount: any
) {

    doc.moveDown();

    const cardWidth = 195;
    const cardX = PAGE.center - (cardWidth / 2);

    doc
        .roundedRect(
            cardX,
            doc.y,
            cardWidth,
            70,
            10
        )
        .fillAndStroke(
            "#ECFDF5",
            COLORS.primary
        );

    const top = doc.y;

    doc
        .fillColor(COLORS.primary)
        .font("Helvetica-Bold")
        .fontSize(11)
        .text(
            "TOTAL AMOUNT",
            cardX + 10,
            top + 12,
            {
                width: cardWidth - 20,
                align: "center",
            }
        );

    doc
        .fontSize(18)
        .text(
            `Rs. ${amount ?? "0.00"}`,
            cardX + 10,
            top + 34,
            {
                width: cardWidth - 20,
                align: "center",
            }
        );

    doc.moveDown(5);

}

/* ============================================================
   FOOTER
============================================================ */

function footer(
    doc: PDFKit.PDFDocument
) {

    doc.moveDown(2);

    doc
        .strokeColor(COLORS.border)
        .lineWidth(.8)
        .moveTo(PAGE.left, doc.y)
        .lineTo(PAGE.right, doc.y)
        .stroke();

    doc.moveDown();

    doc
        .font("Helvetica")
        .fontSize(9)
        .fillColor(COLORS.footer)
        .text(
            `Generated on ${new Date().toLocaleString()}`,
            {
                align: "center",
            }
        );

}

/* ============================================================
   AUTO PAGE BREAK
============================================================ */

function checkPage(
    doc: PDFKit.PDFDocument,
    height = 120
) {

    if (
        doc.y >
        doc.page.height -
        height
    ) {

        doc.addPage();

    }

}

/* ============================================================
   PDF GENERATOR
============================================================ */

export async function generateSurgeryPdf(
    data: any
): Promise<Buffer> {

    return new Promise((resolve, reject) => {

        const doc = new PDFDocument({
            size: "A4",
            margin: 40,
            bufferPages: true,
        });

        const buffers: Buffer[] = [];

        doc.on("data", (chunk) => buffers.push(chunk));

        doc.on("end", () => {
            resolve(Buffer.concat(buffers));
        });

        doc.on("error", reject);

        // =====================================================
        // HEADER
        // =====================================================

        drawHeader(doc);

        // =====================================================
        // PATIENT INFORMATION
        // =====================================================

        section(doc, "Patient Information");

        const top = doc.y;

        // Center the patient cards
        const cardWidth = 155;
        const spacing = 20;
        const totalWidth = (cardWidth * 3) + (spacing * 2);
        const startX = PAGE.center - (totalWidth / 2);

        infoCard(
            doc,
            "Patient Name",
            data.patientName,
            startX,
            top
        );

        infoCard(
            doc,
            "UHID Number",
            data.uhidNo,
            startX + cardWidth + spacing,
            top
        );

        infoCard(
            doc,
            "Case Date",
            data.caseDate
                ? new Date(data.caseDate).toLocaleDateString()
                : "-",
            startX + (cardWidth + spacing) * 2,
            top
        );

        infoCard(
            doc,
            "Hospital",
            data.hospital,
            startX,
            top + 70
        );

        infoCard(
            doc,
            "Age",
            data.age,
            startX + cardWidth + spacing,
            top + 70
        );

        infoCard(
            doc,
            "Gender",
            data.sex,
            startX + (cardWidth + spacing) * 2,
            top + 70
        );

        doc.y = top + 145;

        // =====================================================
        // PREOPERATIVE DIAGNOSIS
        // =====================================================

        checkPage(doc);

        section(doc, "Preoperative Diagnosis");

        paragraph(
            doc,
            data.diagnosis
        );

        // =====================================================
        // OPERATION DETAILS
        // =====================================================

        checkPage(doc);

        section(doc, "Operation Details");

        row(doc, "Surgeon", data.surgeon);

        row(doc, "Hospital", data.hospital);

        row(doc, "Case Number", data.caseNumber);

        row(
            doc,
            "Case Date",
            data.caseDate
                ? new Date(data.caseDate).toLocaleDateString()
                : "-"
        );

        row(doc, "Start Time", data.startTime);

        row(doc, "End Time", data.endTime);

        row(doc, "Duration", data.duration);

        row(doc, "Blood Group", data.bloodGroup);

        row(doc, "Blood Loss", data.bloodLoss);

        row(doc, "Anaesthesia ID", data.anaesthesiaId);

        row(doc, "Position ID", data.positionId);

        row(doc, "Incision ID", data.incisionId);

        // =====================================================
        // CLINICAL FINDINGS
        // =====================================================

        checkPage(doc);

        section(doc, "Clinical Findings");

        paragraph(
            doc,
            data.operativeFindings
        );

        // =====================================================
        // PROCEDURE DETAILS
        // =====================================================

        checkPage(doc);

        section(doc, "Procedure Details");

        paragraph(
            doc,
            data.procedureDetails
        );

        // =====================================================
        // SPECIMENS
        // =====================================================

        checkPage(doc);

        section(doc, "Specimens");

        paragraph(
            doc,
            data.specimens
        );

        // =====================================================
        // ADDITIONAL NOTES
        // =====================================================

        checkPage(doc);

        section(doc, "Additional Notes");

        paragraph(
            doc,
            data.additionalNotes
        );

        // =====================================================
        // POST OPERATIVE CARE
        // =====================================================

        checkPage(doc);

        section(doc, "Post Operative Care");

        row(
            doc,
            "Monitoring",
            data.monitoring
        );

        row(
            doc,
            "Diet",
            data.diet
        );

        row(
            doc,
            "Drain Management",
            data.drainManagement
        );

        row(
            doc,
            "Wound Care",
            data.woundCare
        );

        row(
            doc,
            "Special Instructions",
            data.specialInstructions
        );

        row(
            doc,
            "Follow Up",
            data.followUp
        );

        row(
            doc,
            "Follow Up Imaging",
            data.followUpImaging
        );

        // =====================================================
        // FINANCIAL DETAILS
        // =====================================================

        checkPage(doc);

        section(doc, "Financial Details");

        row(
            doc,
            "Doctor Fee",
            `Rs. ${data.doctorFee ?? "0.00"}`
        );

        row(
            doc,
            "Doctor Payment Mode",
            data.doctorPaymentMode
        );

        row(
            doc,
            "Doctor Remarks",
            data.doctorRemarks
        );

        doc.moveDown(0.5);

        row(
            doc,
            "Assistant Fee",
            `Rs. ${data.assistantFee ?? "0.00"}`
        );

        row(
            doc,
            "Assistant Payment Mode",
            data.assistantPaymentMode
        );

        row(
            doc,
            "Assistant Remarks",
            data.assistantRemarks
        );

        doc.moveDown(0.5);

        row(
            doc,
            "Implant Fee",
            `Rs. ${data.implantFee ?? "0.00"}`
        );

        row(
            doc,
            "Implant Payment Mode",
            data.implantPaymentMode
        );

        row(
            doc,
            "Implant Details",
            data.implantDetails
        );

        row(
            doc,
            "Paid By Hospital",
            data.implantPaidByHospital ? "Yes" : "No"
        );

        row(
            doc,
            "Received From Hospital",
            data.implantReceivedFromHospital ? "Yes" : "No"
        );

        // =====================================================
        // TOTAL AMOUNT
        // =====================================================

        totalCard(doc, data.totalAmount);

        // =====================================================
        // FOOTER
        // =====================================================

        footer(doc);

        doc.end();

    });

}