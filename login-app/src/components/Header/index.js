import "./index.css";

const Header = ({ userName}) => {
  return (
    <header className="cvb-dashboard-topbar">
          <div className="cvb-dashboard-welcome">
            <h2>{userName}</h2>
            {/* <p>Start building your resume or continue editing your drafts.</p> */}
          </div>
          <div className="cvb-dashboard-profile">
            <img src="https://i.pravatar.cc/40" alt="user" />
          </div>
        </header>
  );
}

export default Header;