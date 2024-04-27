import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import HomePage from "./components/HomePage";
import InstituteLoginPage from "./components/InstituteLoginPage";
import MainLoginPage from "./components/MainLoginPage";
import StudentLoginPage from "./components/StudentLoginPage";
import RegisterUser from "./components/RegisterUser";
import InstituteRegister from "./components/InstituteRegister";
import StudentRegister from "./components/StudentRegister";
import StudentDashboard from "./components/StudentDashboard";
import InstituteDashboard from "./components/InstituteDashboard";
import CreateTest from './components/CreateTest'
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/main-login" element={<MainLoginPage />} />
                <Route
                    path="/institute-login"
                    element={<InstituteLoginPage />}
                />
                <Route path="/student-login" element={<StudentLoginPage />} />
                <Route path="/register-user" element={<RegisterUser />} />
                {/* Add route for InstituteRegister */}
                <Route
                    path="/institute-register"
                    element={<InstituteRegister />}
                />
                <Route
                    path="/student-dashboard/:id"
                    element={<StudentDashboard />}
                />
                <Route
                    path="/institute-dashboard/:id"
                    element={<InstituteDashboard />}
                />
                <Route path="/student-register" element={<StudentRegister />} />
                <Route path='/test/add' element={<CreateTest />}></Route>

            </Routes>
        </Router>
    );
};

export default App;
