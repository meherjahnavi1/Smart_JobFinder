import React, { useState } from "react";
import CVTamplates from "../../pages/userDashboard/cvTamplates";
import CVPreview from "../CVPreview";

const CVBuilderPage = ({cvData}) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <div className="cvb-builder-container">
      {!selectedTemplate ? (
        <CVTamplates onSelectTemplate={(template) => setSelectedTemplate(template)} />
      ) : (
        <CVPreview cvData={cvData} onSelectTemplate={() => setSelectedTemplate(null)} selectedTemplate={selectedTemplate} />
      )}
    </div>
  );
};

export default CVBuilderPage;
