import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/StudentLoginPage.css";

const StudentLoginPage = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const studentLoginData = {
            username,
            password,
        };

        try {
            const response = await axios.post(
                `http://localhost:5000/login/student`,
                studentLoginData
            );

            let responseData = response.data.student;
            navigate(`/student-dashboard/${responseData._id}`);
        } catch (error) {
            console.log("Error response:", error.response);
            console.log("Error details:", error.message);
        }
    };

    return (
        <div className="student-login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Student Login Page</h2>
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

export default StudentLoginPage;
