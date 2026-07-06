import PDFDocument from "pdfkit";
function drawCell(
    doc: PDFKit.PDFDocument,
    x: number,
    y: number,
    width: number,
    height: number,
    text: any,
    fill = false
) {

    if (fill) {

        doc.rect(x, y, width, height)
            .fill("#3F5E9C");

        doc.fillColor("white");

    } else {

        doc.rect(x, y, width, height)
            .stroke();

        doc.fillColor("black");

    }

    doc.fontSize(9)
        .text(
            text ?? "-",
            x + 4,
            y + 7,
            {
                width: width - 8,
                align: "center"
            }
        );
}
