import React, { useState } from "react";
import "../styles/BookTest.css";
import Navbar from "./Navbar";

const BookTestPage = () => {
    const tests = [
        {
            id: 1,
            name: "Test 1",
            date: "2022-05-10",
            eligibility: "Eligibile",
            type: "Physical",
            ug_pg: "PG",
            centers: ["Chennai", "Kolkata"],
        },
        {
            id: 2,
            name: "Test 2",
            date: "2022-05-20",
            eligibility: "Not Eligibile",
            type: "Remote",
            ug_pg: "UG",
            centers: ["Ahmedabad", "Jaipur"],
        },
    ];

    const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
    const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

    const [selectedTest, setSelectedTest] = useState(null);

    const [filteredTests, setFilteredTests] = useState(tests);

    const handleTestClick = (testId) => {
        const test = tests.find((test) => test.id === testId);
        setSelectedTest(test);
    };

    const filterTests = (filter) => {
        let filteredTestsCopy = [...tests];

        if (filter === "Location") {
            setIsLocationDropdownOpen(!isLocationDropdownOpen);
        }

        setFilteredTests(filteredTestsCopy);
    };

    const toggleLocationDropdown = () => {
        setIsLocationDropdownOpen(!isLocationDropdownOpen);
    };

    const toggleTypeDropdown = () => {
        setIsTypeDropdownOpen(!isTypeDropdownOpen);
    };

    return (
        <div>
            <Navbar />
            <div className="filter-options">
                {/* Location Filter */}
                <div
                    className="filter-option"
                    onMouseEnter={toggleLocationDropdown}
                    onMouseLeave={toggleLocationDropdown}
                    onClick={() => filterTests("Location")}
                >
                    {/* Dropdown */}
                    {isLocationDropdownOpen && (
                        <div className="dropdown">
                            <div className="dropdown-item">Chennai</div>
                            <div className="dropdown-item">Kolkata</div>
                        </div>
                    )}
                    Location
                    {/* <Dropdown className="icon" /> */}
                </div>

                {/* Type Filter (similar structure) */}
                <div
                    className="filter-option"
                    onMouseEnter={toggleTypeDropdown}
                    onMouseLeave={toggleTypeDropdown}
                    onClick={() => filterTests("Type")}
                >
                    {/* Dropdown */}
                    {isTypeDropdownOpen && (
                        <div className="dropdown">
                            <div className="dropdown-item">Physical</div>
                            <div className="dropdown-item">Remote</div>
                        </div>
                    )}
                    Type
                    {/* <Dropdown /> */}
                </div>
                {/* Add filter options for other filters if needed */}
            </div>

            <div className="test-section">
                {/* Render all test cards */}
                {filteredTests.map((test) => (
                    <div
                        key={test.id}
                        className="test-card"
                        onClick={() => handleTestClick(test.id)}
                    >
                        <div className="test-header">
                            <div>{test.name}</div>
                        </div>
                    </div>
                ))}
                {/* Render TestDetails if a test is selected */}
                {/* {selectedTest && (
                    <TestDetails test={selectedTest} className="test-item" />
                )} */}
            </div>
        </div>
    );
};

export default BookTestPage;
