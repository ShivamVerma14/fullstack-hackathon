import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import "../styles/Navbar.css"; // Import your CSS file for Navbar styles

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="logo">
                    {/* Replace 'logo.svg' with the path to your logo */}
                    <img src="logo.svg" alt="Logo" />
                </Link>
            </div>
            <div className="navbar-right">
                <Link to="/book-test" className="nav-button">
                    Book Test
                </Link>
                <div className="profile-icon">
                    {/* Insert your profile icon or avatar */}
                    <i class="profile ri-account-pin-circle-fill"></i>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
