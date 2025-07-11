import "./index.css"

const PersonalInfo = ({personal}) => {
    return (
        <div className="cvb-personal-info">
            <p><strong>Name: </strong>{personal.fullName}</p>
            <p><strong>Email: </strong> {personal.email}</p>
            <p><strong>Phone: </strong> {personal.phone}</p>
            <p><strong>Address: </strong> {personal.address}</p>
            <p><strong>Summary: </strong> {personal.summary}</p>
            <p><strong>LinkedIn: </strong> {personal.linkedin}</p>
            <p><strong>GitHub: </strong>{personal.github}</p>
            <p><strong>Portfolio: </strong> {personal.portfolio}</p>
            <p><strong>Declaration: </strong>{personal.declaration}</p>
        </div>
    )
}

export default PersonalInfo