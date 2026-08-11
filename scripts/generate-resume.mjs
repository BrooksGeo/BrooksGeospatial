import { createWriteStream, mkdirSync, writeFileSync } from "node:fs";
import { finished } from "node:stream/promises";
import { join } from "node:path";
import PDFDocument from "pdfkit";
import { AlignmentType, BorderStyle, Document, LevelFormat, Packer, Paragraph, TextRun } from "docx";

const outputDirectory = join(process.cwd(), "public", "downloads");
const docxPath = join(outputDirectory, "Davis-Mac-Brooks-Resume.docx");
const pdfPath = join(outputDirectory, "Davis-Mac-Brooks-Resume.pdf");

const teal = "116F6C";
const charcoal = "10232D";
const gray = "4B5D66";

const heading = (text) =>
  new Paragraph({
    spacing: { before: 280, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: teal, space: 4 } },
    children: [new TextRun({ text, bold: true, size: 24, color: charcoal, font: "Arial" })],
  });

const body = (text, options = {}) =>
  new Paragraph({
    spacing: { after: 80 },
    ...options,
    children: [new TextRun({ text, size: 20, color: gray, font: "Arial" })],
  });

const bullet = (text) =>
  new Paragraph({
    numbering: { reference: "resume-bullets", level: 0 },
    spacing: { after: 45 },
    children: [new TextRun({ text, size: 20, color: gray, font: "Arial" })],
  });

const document = new Document({
  creator: "Brooks Geospatial",
  title: "Davis Mac Brooks Resume",
  description: "Resume for Davis Mac Brooks",
  numbering: {
    config: [
      {
        reference: "resume-bullets",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 360, hanging: 180 } } },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 900, right: 1080, bottom: 900, left: 1080 },
        },
      },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 70 },
          children: [
            new TextRun({ text: "Davis “Mac” Brooks", bold: true, size: 36, color: charcoal, font: "Arial" }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 50 },
          children: [
            new TextRun({
              text: "GIS Analyst · Founder, Brooks Geospatial · FAA Part 107 Remote Pilot",
              bold: true,
              size: 20,
              color: teal,
              font: "Arial",
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 160 },
          children: [new TextRun({ text: "mac@brooksgeospatial.com", size: 20, color: gray, font: "Arial" })],
        }),
        heading("PROFESSIONAL SUMMARY"),
        body(
          "GIS analyst and founder of Brooks Geospatial with experience in market-area mapping, real-estate feasibility research, spatial-data work, and database maintenance. Current focus: geospatial AI evaluation and GIS quality assurance.",
        ),
        heading("EXPERIENCE"),
        new Paragraph({
          spacing: { before: 50, after: 45 },
          children: [
            new TextRun({
              text: "Capitol Market Research",
              bold: true,
              size: 22,
              color: charcoal,
              font: "Arial",
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 70 },
          children: [
            new TextRun({
              text: "GIS Analyst Intern to GIS Analyst",
              bold: true,
              size: 20,
              color: teal,
              font: "Arial",
            }),
          ],
        }),
        bullet("Performed market-area mapping and real-estate feasibility research."),
        bullet("Maintained a database of more than 1,500 office, retail, and multifamily locations."),
        new Paragraph({
          spacing: { before: 120, after: 45 },
          children: [
            new TextRun({ text: "Brooks Geospatial", bold: true, size: 22, color: charcoal, font: "Arial" }),
          ],
        }),
        new Paragraph({
          spacing: { after: 70 },
          children: [new TextRun({ text: "Founder", bold: true, size: 20, color: teal, font: "Arial" })],
        }),
        body(
          "Focused on geospatial AI evaluation, GIS quality assurance, spatial-data validation, and reproducible workflow testing.",
        ),
        heading("EDUCATION"),
        new Paragraph({
          spacing: { before: 50, after: 45 },
          children: [
            new TextRun({
              text: "Texas State University",
              bold: true,
              size: 22,
              color: charcoal,
              font: "Arial",
            }),
          ],
        }),
        body("B.S. in Geography, Resource and Environmental Studies"),
        body("Minor in Plant and Soil Science"),
        heading("SKILLS AND CERTIFICATION"),
        bullet("ArcGIS / ArcMap"),
        bullet("QGIS portfolio development"),
        bullet("Python and spatial-data QA"),
        bullet("FAA Part 107 Remote Pilot"),
      ],
    },
  ],
});

mkdirSync(outputDirectory, { recursive: true });
writeFileSync(docxPath, await Packer.toBuffer(document));

const pdf = new PDFDocument({
  size: "LETTER",
  margin: 54,
  info: { Title: "Davis Mac Brooks Resume", Author: "Brooks Geospatial", Subject: "Resume" },
});
const stream = createWriteStream(pdfPath);
pdf.pipe(stream);
pdf
  .fillColor(`#${charcoal}`)
  .font("Helvetica-Bold")
  .fontSize(22)
  .text("Davis “Mac” Brooks", { align: "center" });
pdf
  .fillColor(`#${teal}`)
  .fontSize(10)
  .text("GIS Analyst · Founder, Brooks Geospatial · FAA Part 107 Remote Pilot", { align: "center" });
pdf
  .fillColor(`#${gray}`)
  .font("Helvetica")
  .fontSize(10)
  .text("mac@brooksgeospatial.com", { align: "center" });

function pdfHeading(text) {
  pdf.moveDown(1.25).fillColor(`#${charcoal}`).font("Helvetica-Bold").fontSize(12).text(text);
  pdf.moveDown(0.25).strokeColor(`#${teal}`).lineWidth(1.25).moveTo(pdf.x, pdf.y).lineTo(558, pdf.y).stroke();
  pdf.moveDown(0.45).fillColor(`#${gray}`).font("Helvetica").fontSize(10);
}

function pdfBullet(text) {
  pdf.text(`• ${text}`, { indent: 12, lineGap: 3 });
}

pdfHeading("PROFESSIONAL SUMMARY");
pdf.text(
  "GIS analyst and founder of Brooks Geospatial with experience in market-area mapping, real-estate feasibility research, spatial-data work, and database maintenance. Current focus: geospatial AI evaluation and GIS quality assurance.",
  { lineGap: 3 },
);
pdfHeading("EXPERIENCE");
pdf.fillColor(`#${charcoal}`).font("Helvetica-Bold").fontSize(11).text("Capitol Market Research");
pdf.fillColor(`#${teal}`).fontSize(10).text("GIS Analyst Intern to GIS Analyst");
pdf.fillColor(`#${gray}`).font("Helvetica").fontSize(10).moveDown(0.25);
pdfBullet("Performed market-area mapping and real-estate feasibility research.");
pdfBullet("Maintained a database of more than 1,500 office, retail, and multifamily locations.");
pdf.moveDown(0.55).fillColor(`#${charcoal}`).font("Helvetica-Bold").fontSize(11).text("Brooks Geospatial");
pdf.fillColor(`#${teal}`).fontSize(10).text("Founder");
pdf
  .fillColor(`#${gray}`)
  .font("Helvetica")
  .fontSize(10)
  .moveDown(0.25)
  .text(
    "Focused on geospatial AI evaluation, GIS quality assurance, spatial-data validation, and reproducible workflow testing.",
    { lineGap: 3 },
  );
pdfHeading("EDUCATION");
pdf.fillColor(`#${charcoal}`).font("Helvetica-Bold").fontSize(11).text("Texas State University");
pdf
  .fillColor(`#${gray}`)
  .font("Helvetica")
  .fontSize(10)
  .text("B.S. in Geography, Resource and Environmental Studies");
pdf.text("Minor in Plant and Soil Science");
pdfHeading("SKILLS AND CERTIFICATION");
pdfBullet("ArcGIS / ArcMap");
pdfBullet("QGIS portfolio development");
pdfBullet("Python and spatial-data QA");
pdfBullet("FAA Part 107 Remote Pilot");
pdf.end();
await finished(stream);

console.log(`Created ${docxPath}`);
console.log(`Created ${pdfPath}`);
