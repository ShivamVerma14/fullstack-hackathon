import React from "react";
import { Link } from "react-router-dom";
import "../styles/MainLoginPage.css";

const MainLoginPage = () => {
    return (
        <div className="main-login-page">
            <div className="left-section">
                <h2>Are you an Institute or a Student?</h2>
                <Link to="/institute-login">Institute</Link>
                <Link to="/student-login">Student</Link>
            </div>
        </div>
    );
};

export default MainLoginPage;
