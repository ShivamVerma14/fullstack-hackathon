// StudentLoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/StudentLoginPage.css";

const InstituteLoginPage = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const instituteLoginData = {
            username,
            password,
        };

        try {
            const response = await axios.post(
                `http://localhost:5000/login/institute`,
                instituteLoginData
            );

            console.log(response);
            let responseData = response.data.institute;
            navigate(`/institute-dashboard/${responseData._id}`);
        } catch (error) {
            console.log("Error response:", error.response);
            console.log("Error details:", error.message);
        }
    };

    return (
        <div className="student-login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Institute Login Page</h2>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default InstituteLoginPage;
