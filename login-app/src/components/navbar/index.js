import React, { useState } from "react";
import "./index.css";
import LoginForm from "../../forms/loginForm";
import { MdClose } from "react-icons/md";
import PasswordUpdate from "../../forms/PasswordUpdateForm";
import RegisterForm from "../../forms/registerForm";
// import { Link } from "react-router-dom";
// import Cookies from "js-cookie";
import LogoutConfirm from "../LogoutConfirm";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [isShowUpdatePasswordForm, setIsShowUpdatePasswordForm] =
    useState(false);
  const [isShowRegisterForm, setIsShowRegisterForm] = useState(false);
  const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false);

  // const token = Cookies.get("jwtToken");

  const handleLoginClick = (role) => {
    setUserRole(role);
    setShowLogin(true);
    setIsShowUpdatePasswordForm(false);
    setIsShowRegisterForm(false);
  };

  const closePopup = () => {
    setShowLogin(false);
    setIsShowUpdatePasswordForm(false);
    setIsShowRegisterForm(false);
  };

  const backToLogin = () => {
    setIsShowUpdatePasswordForm(false);
    setIsShowRegisterForm(false);
  };

  return (
      <nav className="cvb-navbar">
        <div className="cvb-logo">CV Builder</div>
        <div className="cvb-nav-links">
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <button className="cvb-start-btn" onClick={() => handleLoginClick("Customer")}>Get Started</button>
        </div>

      {showLogin && (
        <div className="cvb-login-popup-overlay">
          <div className="cvb-login-popup">
            <button className="cvb-login-close-button" onClick={closePopup}>
              <MdClose />
            </button>

            {!isShowUpdatePasswordForm && !isShowRegisterForm && (
              <div className="cvb-login-page">
                <LoginForm role={userRole} onClose={closePopup} />
                <p
                  onClick={() => setIsShowUpdatePasswordForm(true)}
                  className="cvb-login-forgot-password"
                >
                  Forgot Password?
                </p>
                <p className="cvb-login-signup">
                  Don't have an account?
                  <span onClick={() => setIsShowRegisterForm(true)}>
                    {" "}
                    Sign Up{" "}
                  </span>
                </p>
              </div>
            )}

            {isShowUpdatePasswordForm && (
              <div className="cvb-login-page">
                <PasswordUpdate />
                <p
                  onClick={backToLogin}
                  className="cvb-login-forgot-password keep-signing-in"
                >
                  Keep Signing in
                </p>
              </div>
            )}

            {isShowRegisterForm && (
              <div className="cvb-login-page">
                <RegisterForm role={userRole} />
                <p
                  onClick={backToLogin}
                  className="cvb-login-forgot-password keep-signing-in"
                >
                  Back to Login
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {openLogoutConfirm && (
        <LogoutConfirm onClose={() => setOpenLogoutConfirm(false)} />
      )}
      </nav>
  );
};

export default Navbar;
