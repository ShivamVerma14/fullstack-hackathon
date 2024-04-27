import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/StudentRegister.css";

const StudentRegister = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const studentData = {
            name: name,
            email: email,
            username: username,
            password: password,
            mobile: mobile,
        };

        try {
            const response = await axios.post(
                `http://localhost:5000/register/student`,
                studentData
            );

            let responseData = response.data.student;
            if (response.status === 201) {
                navigate(`/student-dashboard/${responseData._id}`);
            } else {
                console.error("Registration failed");
            }
        } catch (error) {
            console.log("Error response:", error.response);
            console.log("Error details:", error.message);
        }
    };

    return (
        <div className="student-register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Student Registration</h2>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mobile">Mobile</label>
                    <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </div>
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default StudentRegister;
