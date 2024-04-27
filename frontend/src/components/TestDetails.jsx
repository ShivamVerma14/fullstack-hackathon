//TestDetails.js
// InstitudeDashboard.js
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import TestDetails from './TestDetails'
import '../styles/StudentDashboard.css'

const InstitudeDashboard = () => {
  const studentProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    age: 25,
  }

  const tests = [
    {
      id: 1,
      name: 'Test 1',
      description: 'Description of Test 1',
      date: '2022-05-10',
      eligibility: 'Eligibility criteria for Test 1',
      type: 'Type of Test 1',
      ug_pg: 'UG/PG',
      centers: ['Center 1', 'Center 2'],
    },
    {
      id: 2,
      name: 'Test 2',
      description: 'Description of Test 2',
      date: '2022-05-20',
      eligibility: 'Eligibility criteria for Test 2',
      type: 'Type of Test 2',
      ug_pg: 'UG/PG',
      centers: ['Center 1', 'Center 3'],
    },
  ]

  const [selectedTest, setSelectedTest] = useState(null)

  const handleTestClick = (testId) => {
    if (selectedTest && selectedTest.id === testId) {
      setSelectedTest(null)
    } else {
      const test = tests.find((test) => test.id === testId)
      setSelectedTest(test)
    }
  }

  return (
    <div className='student-dashboard'>
      <Navbar />
      <div className='profile-card'>
        <h2>Institute Details</h2>
        <div className='profile-card-container'>
          <i className='ri-account-pin-circle-fill'></i>
          <div className='about-user'>
            <div>Name: {studentProfile.name}</div>
            <div>Email: {studentProfile.email}</div>
            <div>Age: {studentProfile.age}</div>
          </div>
        </div>
      </div>
      <h2>Enrolled Tests</h2>
      <div className='tests-container'>
        <ul className='test-list'>
          {tests.map((test) => (
            <li key={test.id} className='test-item'>
              <div
                className='test-header'
                onClick={() => handleTestClick(test.id)}
              >
                <div>{test.name}</div>
                <div>
                  <i
                    className={`ri-arrow-right-s-line ${
                      selectedTest && selectedTest.id === test.id
                        ? 'expanded'
                        : ''
                    }`}
                  ></i>
                </div>
              </div>
              {selectedTest && selectedTest.id === test.id && (
                <TestDetails test={selectedTest} />
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* Button link to CreateTest component */}
      <Link to='/create-test' className='create-test-link'>
        Create Test
      </Link>
    </div>
  )
}
export default InstitudeDashboard