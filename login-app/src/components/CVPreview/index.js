import React, { useState, useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";
import "./index.css";

import DownloadCVDocx from "../../utils/DownloadCVDocx";
import CVSectionSelector from "../../CVTamplates/CVSectionSelector";
import CVTemplate1 from "../../CVTamplates/CVTemplate1";
import CVTemplate2 from "../../CVTamplates/CVTemplate2";
import CVTemplate3 from "../../CVTamplates/CVTemplate3";
import CVTemplate4 from "../../CVTamplates/CVTemplate4";
import CVTemplate from "../../CVTamplates/CVTemplate";

const CVPreview = ({ cvData, selectedTemplate, onSelectTemplate }) => {
  const [selectData, setSelectData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const cvRef = useRef();
  const formRef = useRef();

  useEffect(() => {
    if (cvData) setSelectData(cvData);
  }, [cvData]);

  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showForm]);

  const handleDownloadPDF = () => {
    if (!selectData?.personal) return;
    const { personal } = selectData;

    const element = cvRef.current;
    const opt = {
      margin: 0.1,
      filename: `${personal.fullName.replace(/\s/g, "_")}_CV.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  const handleSelectionComplete = (filteredCVData) => {
    
    setShowForm(!showForm);
    setSelectData(filteredCVData);
  };

  const renderTemplates = () => {
    switch (selectedTemplate) {
      case "cv": return <CVTemplate cvData={selectData} />;
      case "cv1": return <CVTemplate1 cvData={selectData} />;
      case "cv2": return <CVTemplate2 cvData={selectData} />;
      case "cv3": return <CVTemplate3 cvData={selectData} />;
      case "cv4": return <CVTemplate4 cvData={selectData} />;
      default: return <div>No template selected.</div>;
    }
  };

  return (
    <div className="cvb-preview-main-container">
      {selectData && (
        <>
        <div className="cvb-preview-header">
          <button onClick={() => onSelectTemplate()} className="cvb-template-back-button">Back</button>
          <button
            className="cvb-toggle-button"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Hide" : "Show"} Section Form
          </button>

          </div>

          <div className="cvb-preview-container1">
            {(
              <div
                ref={formRef}
                className={`cvb-section-selector-wrapper ${
                  showForm ? "cvb-slide-down" : "cvb-slide-up"
                }`}
              >
                {showForm && (
                  <CVSectionSelector
                    cvData={cvData}
                    onSelectionComplete={handleSelectionComplete}
                  />
                )}
              </div>
            )}

            {!showForm && <div className="cvb-template-preview-wrapper" ref={cvRef}>
              {renderTemplates()}
            </div>}
          </div>

          <div className="cvb-download-buttons animated-buttons">
            <button className="cvb-btn pdf" onClick={handleDownloadPDF}>
              📄 Download as PDF
            </button>
            <DownloadCVDocx cvData={selectData} />
          </div>
        </>
      )}
    </div>
  );
};

export default CVPreview;
