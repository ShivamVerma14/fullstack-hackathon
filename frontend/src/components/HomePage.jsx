import React from "react";
import { Link } from "react-router-dom";
import HeroSection from "./HeroSection";
import "../styles/HomePage.css";

const HomePage = () => {
    return (
        <div>
            <nav className="navbar">
                <ul>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact Us</Link>
                    </li>
                    <li>
                        <Link to="/main-login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register-user">Register</Link>
                    </li>
                </ul>
            </nav>
            <HeroSection />
        </div>
    );
};

export default HomePage;
