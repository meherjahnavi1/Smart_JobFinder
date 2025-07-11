import { convertDate } from "../../utils/DateModifications";

const Experience = ({experience}) => {
    return (
        <div className="cvb-personal-info">
            <h2>Experience</h2>
            <ul>
                {experience.map((exp, index) => (
                    <li key={index}>
                        <p><strong>{exp.job_title}</strong></p>
                        <p>{convertDate(exp.start_date)} - {convertDate(exp.end_date)}</p>
                        <p>{exp.company_name}</p>
                        <p>{exp.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Experience;