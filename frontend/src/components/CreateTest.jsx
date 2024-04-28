import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import "../styles/CreateTest.css";
import { useParams, useNavigate } from "react-router-dom";

function CreateTest() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [selectedCities, setSelectedCities] = useState([]);
    const [eligibility, setEligibility] = useState("");
    const [type, setType] = useState("");
    const [level, setLevel] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleCheckboxChange = (city) => {
        const isSelected = selectedCities.includes(city);
        setSelectedCities(
            isSelected
                ? selectedCities.filter((c) => c !== city)
                : [...selectedCities, city]
        );
    };

    const handleEligibilityChange = (e) => {
        setEligibility(e.target.value);
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const handleLevelChange = (e) => {
        setLevel(e.target.value);
    };

    const listOfCities = [
        "Mumbai",
        "Delhi",
        "Bangalore",
        "Kolkata",
        "Chennai",
        "Hyderabad",
        "Pune",
        "Ahmedabad",
        "Jaipur",
        "Surat",
        "Lucknow",
        "Kanpur",
        "Nagpur",
        "Indore",
        "Thane",
        "Bhopal",
        "Visakhapatnam",
        "Patna",
        "Vadodara",
        "Ghaziabad",
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const testData = {
                institute_id: id,
                name,
                date,
                eligibility,
                centres: selectedCities,
                type,
                ugpg: level,
                status: "upcoming",
            };
            console.log(testData);
            const response = await axios.post(
                "http://localhost:5000/test/add",
                testData
            );
            navigate(`/institute-dashboard/${id}`);
        } catch (error) {
            console.log("Error response:", error.response);
            console.log("Error details:", error.message);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="create-test-container">
                <h2 className="create-test-heading">Create Test</h2>
                <form onSubmit={handleSubmit}>
                    <div className="create-test-input-container">
                        <div className="name">
                            <label htmlFor="name" className="create-test-label">
                                Name of the Test:
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="create-test-input"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </div>
                        <div className="date">
                            <label htmlFor="date" className="create-test-label">
                                Date:
                            </label>
                            <input
                                type="date"
                                id="date"
                                className="create-test-input"
                                value={date}
                                onChange={handleDateChange}
                            />
                        </div>
                        <div className="eligibility">
                            <label
                                htmlFor="eligibility"
                                className="create-test-label"
                            >
                                Eligibility:
                            </label>
                            <input
                                type="text"
                                id="eligibility"
                                className="create-test-input"
                                value={eligibility}
                                onChange={handleEligibilityChange}
                            />
                        </div>
                        <div className="type">
                            <label htmlFor="type" className="create-test-label">
                                Type (Physical or Remote):
                            </label>
                            <input
                                type="text"
                                id="type"
                                className="create-test-input"
                                value={type}
                                onChange={handleTypeChange}
                            />
                        </div>
                        <div className="level">
                            <label
                                htmlFor="level"
                                className="create-test-label"
                            >
                                Level (UG or PG):
                            </label>
                            <input
                                type="text"
                                id="level"
                                className="create-test-input"
                                value={level}
                                onChange={handleLevelChange}
                            />
                        </div>
                    </div>
                    <div className="create-test-checkbox-container">
                        <p className="create-test-label">Select Cities:</p>
                        <div className="checkbox-grid">
                            {listOfCities.map((city) => (
                                <div
                                    key={city}
                                    className="create-test-checkbox-label"
                                >
                                    <input
                                        type="checkbox"
                                        value={city}
                                        checked={selectedCities.includes(city)}
                                        onChange={() =>
                                            handleCheckboxChange(city)
                                        }
                                        className="create-test-checkbox"
                                    />
                                    <label className="create-test-label">
                                        {city}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button type="submit" className="create-test-button">
                        Schedule Test
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateTest;
