import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../styles/InstituteDashboard.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const InstituteDashboard = () => {
    const [instituteProfile, setInstituteProfile] = useState(null);
    const [tests, setTests] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/fetchInstituteProfile/${id}`
                );
                setInstituteProfile(response.data);
                const response2 = await axios.get(
                    `http://localhost:5000/fetchTests/${id}`
                );
                setTests(response2.data);
            } catch (error) {
                console.error("Error fetching institute profile:", error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/fetchTests/${id}`
                );
                console.log(response.data);
                setTests(response.data);
            } catch (error) {
                console.error("Error fetching tests:", error);
            }
        };

        fetchTests();
    }, [id]);

    const [selectedTest, setSelectedTest] = useState(null);
    const handlePay = async (e) => {
        e.preventDefault();
        console.log("Payment button clicked");
        const amt = 100;
        try {
            const response = await axios.post(`http://localhost:5000/payment`, {
                amt,
                id,
            });
            console.log("Payment response:", response.data);
            window.location.href = response.data;
            setPaid(true);
        } catch (error) {
            console.error("Error processing payment:", error);
        }
    };

    return (
        <div className="institute-dashboard">
            <Navbar />
            <div className="profile-card">
                <h2>institute Details</h2>
                <i className="ri-account-pin-circle-fill"></i>
                {instituteProfile ? (
                    <>
                        <div>Name: {instituteProfile.name}</div>
                        <div>Email: {instituteProfile.email}</div>
                    </>
                ) : (
                    <div>Loading institute profile...</div>
                )}
            </div>
            <h3>Subscription: $100</h3>

            <form onSubmit={handlePay}>
                <button type="submit">Pay</button>
            </form>

            <Link to={`/test/add/${id}`}>Create test</Link>

            <div className="tests-container">
                <div className="test-box">
                    {tests.map((test) => (
                        <div key={test._id} className="test-card">
                            <div
                                className="test-header"
                                onClick={() => handleTestClick(test._id)}
                            >
                                <div>{test.name}</div>
                                <div>
                                    <i
                                        className={`ri-arrow-right-s-line ${
                                            selectedTest &&
                                            selectedTest.id === test._id
                                                ? "expanded"
                                                : ""
                                        }`}
                                    ></i>
                                </div>
                            </div>
                            {selectedTest && selectedTest.id === test._id && (
                                <div className="test-details">
                                    <h3>Test Details</h3>
                                    <div>Description: {test.description}</div>
                                    <div>Date: {test.date}</div>
                                    <div>Eligibility: {test.eligibility}</div>
                                    <div>Type: {test.type}</div>
                                    <div>UG/PG: {test.ug_pg}</div>
                                    <div>
                                        Centers: {test.centers.join(", ")}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InstituteDashboard;
