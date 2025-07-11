import Cookies from "js-cookie";
import "./index.css";

const LogoutConfirm = ({ onClose }) => {
    const handleLogout = () => {
        Cookies.remove("jwtToken");
        window.location.href = "/"; 
    };

    return (
        <div className="logout-popup-overlay">
            <div className="logout-popup-content">
                <h3 className="logout-popup-title">Are You Sure You Want to Logout</h3>

                <div className="logout-popup-buttons">
                    <button onClick={onClose} className="logout-cancel-btn">Cancel</button>
                    <button onClick={handleLogout} className="logout-submit-btn">Logout</button>
                </div>
            </div>
        </div>
    );
};

export default LogoutConfirm;
