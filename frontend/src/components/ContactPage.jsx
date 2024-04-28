import React from "react";
import "../styles/ContactPage.css";

const ContactPage = () => {
    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <p>
                If you have any questions, feedback, or concerns, please don't
                hesitate to get in touch with us. We're here to help you!
            </p>
            <div className="contact-details">
                <div>
                    <h2>Customer Support</h2>
                    <p>Email: khaturiageetansh@gmail.com.com</p>
                    <p>Phone: +8302051159</p>
                </div>
                <div>
                    <h2>Business Inquiries</h2>
                    <p>Email: suryanshnarang@gmail.com</p>
                    <p>Phone: +91 8630146682</p>
                    <p>Email: banilkumar@gmail.com</p>
                    <p>Phone: +91 9521315251</p>
                    <p>Email: shivamverma@gmail.com</p>
                    <p>Phone: +91 8826375344</p>
                    <p>Email: tanmaychoudhary@gmail.com</p>
                    <p>Phone: +91 8630112345</p>
                </div>
            </div>
            <div className="social-media">
                <h2>Connect with Us on Social Media</h2>
                <ul>
                    <li>
                        <a href="https://facebook.com">Facebook</a>
                    </li>
                    <li>
                        <a href="https://twitter.com">Twitter</a>
                    </li>
                    <li>
                        <a href="https://instagram.com">Instagram</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ContactPage;
