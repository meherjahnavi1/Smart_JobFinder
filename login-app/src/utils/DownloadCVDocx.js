import React from 'react';
import { saveAs } from 'file-saver';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel
} from 'docx';

const DownloadCVDocx = ({ cvData }) => {
  const handleDownloadDOCX = async () => {
    const { personal, education, skills, experience, projects } = cvData;

    const createSectionHeading = (text) =>
      new Paragraph({
        text,
        heading: HeadingLevel.HEADING_2,
        spacing: { after: 200 }
      });

    const createLabelValue = (label, value) =>
      new Paragraph({
        children: [
          new TextRun({ text: `${label}: `, bold: true }),
          new TextRun({ text: value || '' })
        ]
      });

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Personal Info
            new Paragraph({
              children: [new TextRun({ text: personal.full_name || 'Your Name', bold: true, size: 32 })],
              spacing: { after: 200 }
            }),
            createLabelValue("Phone", personal.phone),
            createLabelValue("Address", personal.address),
            createLabelValue("LinkedIn", personal.linkedin),
            createLabelValue("GitHub", personal.github),
            createLabelValue("Summary", personal.summary),
            new Paragraph(""),

            // Education
            createSectionHeading("Education"),
            ...education.map((edu) => [
              new Paragraph({
                children: [
                  new TextRun({ text: `${edu.degree} in ${edu.field}`, bold: true })
                ]
              }),
              new Paragraph(`${edu.institution} (${edu.start_date} - ${edu.end_date})`),
              new Paragraph(`CGPA/Percentage: ${edu.percentage}`),
              new Paragraph("")
            ]).flat(),

            // Skills
            createSectionHeading("Skills"),
            ...skills.map((skill) =>
              new Paragraph(`${skill.skill_name} - ${skill.level}`)
            ),
            new Paragraph(""),

            // Experience
            createSectionHeading("Experience"),
            ...experience.map((exp) => [
              new Paragraph({
                children: [
                  new TextRun({ text: `${exp.job_title} at ${exp.company_name}`, bold: true })
                ]
              }),
              new Paragraph(`${exp.start_date} - ${exp.end_date}`),
              new Paragraph(exp.description),
              new Paragraph("")
            ]).flat(),

            // Projects
            createSectionHeading("Projects"),
            ...projects.map((project) => [
              new Paragraph({ text: project.project_title, bold: true }),
              new Paragraph(project.description),
              new Paragraph(`Link: ${project.link}`),
              new Paragraph("")
            ]).flat()
          ]
        }
      ]
    });

    const blob = await Packer.toBlob(doc);
    const fileName = `${personal.full_name?.replace(/\s+/g, "_") || 'cv'}.docx`;
    saveAs(blob, fileName);
  };

  return (
    <button onClick={handleDownloadDOCX} className="cvb-download-btn">
      Download DOCX
    </button>
  );
};

export default DownloadCVDocx;
