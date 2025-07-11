import React, { useState, useEffect } from "react";
import EducationDetailsForm from "../../forms/educationDetails";
import PersonalInfoForm from "../../forms/personalInfo";
import SkillsForm from "../../forms/skillsForm";
import ExperienceForm from "../../forms/experienceForm";
import ProjectsForm from "../../forms/projectsForm";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import "./index.css";
import { MdClose } from "react-icons/md";
import { getCVProgress } from "../../api/cvDetailsApi";
import CertificationForm from "../../forms/certificationForm";

const CVModal = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(null);
  const [progress, setProgress] = useState({
    personalDetails: 0,
    education: 0,
    skills: 0,
    experience: 0,
    projects: 0,
    certifications: 0,
    achievements: 0,
    hobbies: 0,
    extraCurricularActivities: 0,
    refferencesInfo: 0,
  });
  const token = Cookies.get("jwtToken");
  const userId = token ? jwtDecode(token).id : null;

    useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await getCVProgress(userId);
        setProgress(response.progress);
        
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchProgress();

    }, [userId]);

    console.log("Progress:", progress);
    



  const renderForms = () => {
    switch (isOpenPopup) {
      case "personalDetails":
        return (
          <PersonalInfoForm
            userId={userId}
            onClose={() => setIsOpenPopup(false)}
          />
        );
      case "education":
        return (
          <EducationDetailsForm
            userId={userId}
            onClose={() => setIsOpenPopup(false)}
          />
        );
      case "skills":
        return (
          <SkillsForm userId={userId} onClose={() => setIsOpenPopup(false)} />
        );
      case "experience":
        return (
          <ExperienceForm
            userId={userId}
            onClose={() => setIsOpenPopup(false)}
          />
        );
      case "projects":
        return (
          <ProjectsForm userId={userId} onClose={() => setIsOpenPopup(false)} />
        );

        case "certifications":
        return (
          <CertificationForm userId={userId} onClose={() => setIsOpenPopup(false)} />
        )
      default:
        return null;
    }
  };

  

  const updateProgress = (section, value) => {
    setProgress((prev) => ({ ...prev, [section]: value }));
  };

  return (
    <div className="cvb-cv-builder-page">
      <div className="cvb-cv-builder-content">
        <div className="cvb-cv-buttons-grid">
          {[
            ["Personal Info", "personalDetails"],
            ["Education Details", "education"],
            ["Skills", "skills"],
            ["Experience", "experience"],
            ["Projects", "projects"],    
            ["Certifications", "certifications"],
            ["Achievements", "achievements"],
            ["Hobbies", "hobbies"],
            ["Extra Curricular Activities", "extraCurricular"],
            ["References", "references"],
          ].map(([label, key]) => (
            <div key={key} className="cvb-cv-section-card">
              <div className="cvb-cv-section-top">
                <span className="cvb-cv-section-title">{label}</span>
                <span className="cvb-cv-progress">{progress[key]}%</span>
              </div>
              <button
                onClick={() => setIsOpenPopup(key)}
                className="cvb-cv-add-btn"
              >
                ➕ Add {label}
              </button>
            </div>
          ))}
        </div>
      </div>
      {isOpenPopup && (
        <div className="cvb-login-popup-overlay">
          <div className="cvb-login-popup">
            <button
              className="cvb-login-close-button"
              onClick={() => setIsOpenPopup(false)}
            >
              <MdClose />
            </button>
            <div className="cvb-login-page">{renderForms()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CVModal;
