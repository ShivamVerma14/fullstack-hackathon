// StudentDashboard.js

import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../styles/StudentDashboard.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const StudentDashboard = () => {
    const [studentProfile, setStudentProfile] = useState(null);
    // const [tests, setTests] = useState([]);

    const { id } = useParams(); // Get id from useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/fetchStudent/${id}`);
                console.log(response.data);
                setStudentProfile(response.data);
            } catch (error) {
                console.error('Error fetching student profile:', error);
            }
        };

        fetchData();
    }, [id]);

    // useEffect(() => {
    //     const fetchTests = async () => {
    //       try {
    //         const response = await axios.get(`http://localhost:5000/fetchTests/${id}`);
    //         console.log(response.data);
    //         setTests(response.data);
    //       } catch (error) {
    //         console.error('Error fetching tests:', error);
    //       }
    //     };
    
    //     fetchTests();
    //   }, [id]);
    
    // // Sample student profile data
    // const studentProfile = {
    //     name: "John Doe",
    //     email: "john@example.com",
    //     age: 25,
    //     // Add more profile data as needed
    // };

    const tests = [
        {
            id: 1,
            name: "Test 1",
            description: "Description of Test 1",
            date: "2022-05-10",
            eligibility: "Eligibility criteria for Test 1",
            type: "Type of Test 1",
            ug_pg: "UG/PG",
            centers: ["Center 1", "Center 2"],
        },
        {
            id: 2,
            name: "Test 2",
            description: "Description of Test 2",
            date: "2022-05-20",
            eligibility: "Eligibility criteria for Test 2",
            type: "Type of Test 2",
            ug_pg: "UG/PG",
            centers: ["Center 1", "Center 3"],
        },
        // Add more test data as needed
    ];

    // State to track the selected test details
    const [selectedTest, setSelectedTest] = useState(null);

    // Function to handle test click
    const handleTestClick = (testId) => {
        // If the clicked test is already expanded, collapse it
        if (selectedTest && selectedTest.id === testId) {
            setSelectedTest(null);
        } else {
            // Otherwise, expand the clicked test
            const test = tests.find((test) => test.id === testId);
            setSelectedTest(test);
        }
    };

    return (
        <div className="student-dashboard">
            <Navbar />
            <div className="profile-card">
                <h2>Student Details</h2>
                <i className="ri-account-pin-circle-fill"></i>
                {studentProfile ? (
                    <>
                        <div>Name: {studentProfile.name}</div>
                        <div>Email: {studentProfile.email}</div>
                        {/* <div>Age: {studentProfile.age}</div> */}
                        {/* Add more profile data as needed */}
                    </>
                ) : (
                    <div>Loading student profile...</div>
                )}
            </div>
            <div className="tests-container">
                <div className="test-box">
                    {tests.map((test) => (
                        <div key={test.id} className="test-card">
                            <div
                                className="test-header"
                                onClick={() => handleTestClick(test.id)}
                            >
                                <div>{test.name}</div>
                                <div>
                                    {/* Render arrow icon for each test */}
                                    <i
                                        className={`ri-arrow-right-s-line ${selectedTest &&
                                            selectedTest.id === test.id
                                            ? "expanded"
                                            : ""
                                            }`}
                                    ></i>
                                </div>
                            </div>
                            {/* Render test details if the test is expanded */}
                            {selectedTest && selectedTest.id === test.id && (
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

export default StudentDashboard;
