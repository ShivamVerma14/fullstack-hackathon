import React from "react";
import { Link } from "react-router-dom";
import "../styles/HeroSection.css";

const HeroSection = () => {
    return (
        <div className="hero-section">
            <div className="hero-content">
                <h1>Welcome to our Exam Portal</h1>
                <p>Prepare for success with us!</p>
                <div className="button-container">
                    <Link to="/institute-login" className="hero-button">
                        Schedule an Exam
                    </Link>
                    <Link to="/student-login" className="hero-button">
                        Book an Exam
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
