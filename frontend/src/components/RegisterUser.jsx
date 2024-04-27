// RegisterUser.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/RegisterUser.css";

const RegisterUser = () => {
    return (
        <div className="main-register-page">
            <div className="left-section">
                <h2>Are you an Institute or a Student?</h2>
                <Link to="/institute-register">Institute</Link>
                <Link to="/student-register">Student</Link>
            </div>
        </div>
    );
};

export default RegisterUser;
