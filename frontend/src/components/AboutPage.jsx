import React from "react";
import "../styles/AboutPage.css";

const AboutPage = () => {
    return (
        <div className="about-container">
            <h1>About Us</h1>
            <p>
                Welcome to our third-party entrance test booking application! We
                provide a convenient platform for students and institutes to
                streamline the process of scheduling and managing entrance tests
                for various educational programs.
            </p>
            <h2>Our Mission</h2>
            <p>
                Our mission is to simplify the test booking process for both
                students and institutes. We aim to provide a seamless experience
                that saves time and effort, allowing users to focus on their
                academic goals.
            </p>
            <h2>Features</h2>
            <ul>
                <li>Easy test scheduling and registration</li>
                <li>Secure payment processing</li>
                <li>Comprehensive test details and eligibility criteria</li>
                <li>Notification system for important updates</li>
                <li>User-friendly interface for intuitive navigation</li>
            </ul>
            <h2>Why Choose Us?</h2>
            <p>
                With our application, students can discover and register for a
                wide range of entrance tests, while institutes can efficiently
                manage test logistics and applicant data. Whether you're a
                student aspiring to pursue higher education or an institute
                seeking to streamline your admissions process, we're here to
                help.
            </p>
        </div>
    );
};

export default AboutPage;
