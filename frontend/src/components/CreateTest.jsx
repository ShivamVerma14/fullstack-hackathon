import React, { useState } from 'react';
import Navbar from "./Navbar";
import axios from 'axios';
import { useParams } from "react-router-dom";

function CreateTest() {
    const [selectedDate, setSelectedDate] = useState('');
    const [testData, setTestData] = useState(null);

    const handleDateChange = async (e) => {
        setSelectedDate(e.target.value);
        try {
            console.log(e.target.value);
            const response = await axios.get(`http://localhost:5000/fetchVenues/${e.target.value}`);
            setTestData(response.data);
        } catch (error) {
            console.error('Error fetching test data:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <form>
                <label>
                    Select Date:
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                </label>
            </form>
            {testData ? (
                <div>
                    {/* Render fetched data here */}
                    <h2>Test Data for {selectedDate}</h2>
                    <ul>
                        {testData.map((test, index) => (
                            <li key={index}>{test}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>No data available for selected date.</div>
            )}
        </div>
    );
}

export default CreateTest;
