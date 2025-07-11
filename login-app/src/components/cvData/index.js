import React from 'react'
import { MdClose } from 'react-icons/md'
import PersonalInfo from './personalInfo';
import EducationDetails from './educationDetails';
import Skills from './skills';
import Experience from './experience';
import Projects from './projects';
import Certifications from './certifications';

const CVData = ({isOpenPopup, setIsOpenPopup, cvData}) => {

    const {personal, education, skills, experience, projects, certifications} = cvData

    const renderViewPage = () => {
        switch (isOpenPopup) {
            case "personal":
              return <PersonalInfo personal={personal}/>;
            case "education":
              return <EducationDetails education={education}/>;
            case "skills":
              return <Skills skills={skills}/>;
            case "experience":
              return <Experience experience={experience}/>;
            case "projects":
              return <Projects projects={projects}/>;
            case "certifications":
              return <Certifications certifications={certifications}/>;
            default:
              return null;
          }
    }


    return (
        (
        <div className="cvb-login-popup-overlay">
          <div className="cvb-login-popup">
            <button
              className="cvb-login-close-button"
              onClick={() => setIsOpenPopup(false)}
            >
              <MdClose />
            </button>
            <div className="cvb-login-page">
                {renderViewPage()}
            </div>
          </div>
        </div>
      )
    )

}

export default CVData