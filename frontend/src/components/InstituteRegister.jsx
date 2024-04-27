import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/InstituteRegister.css";

const InstituteRegister = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [bio, setBio] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const instituteData = {
            name,
            username,
            password,
            address,
            bio,
        };

        try {
            const response = await axios.post(
                `http://localhost:5000/register/institute`,
                instituteData
            );

            let responseData = response.data.institute;
            if (response.status === 201) {
                navigate(`/institute-dashboard/${responseData._id}`);
            } else {
                console.error("Registration failed");
            }
        } catch (error) {
            console.log("Error response:", error.response);
            console.log("Error details:", error.message);
        }
    };

    return (
        <div className="institute-register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Institute Registration</h2>
                <div className="form-group">
                    <label htmlFor="institutionName">Institution Name</label>
                    <input
                        type="text"
                        id="institutionName"
                        name="institutionName"
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
                    <label htmlFor="address">Address</label>
                    <textarea
                        id="address"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default InstituteRegister;
