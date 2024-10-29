// Import necessary modules from React library
import React, { useState, useEffect } from 'react';
// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import custom Navbar component
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/LandingPage';
import Login from './Components/Login/Login';
import SignUp from './Components/Sign_Up/Sign_Up';
import Consultation from './Components/BookingConsultation';
import Notification from './Components/Notification/Notification';
import ReviewForm from './Components/ReviewForm/ReviewForm';
import ProfileCard from './Components/ProfileCard/ProfileCard';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';

// Function component for the main App
function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [appointmentData, setAppointmentData] = useState(null);
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [userDetails, setUserDetails] = useState(null); // Fixed the syntax error here


    // useEffect to check if the user is already logged in on app load
    // Check if the user is logged in
    // Simulate fetching user data
    useEffect(() => {
      // Check session storage for an authentication token
      const token = sessionStorage.getItem("auth-token");
      if (token) {
          const user = {
              name: sessionStorage.getItem("name"),
              email: sessionStorage.getItem("email"), // Get the email from session storage
              phone: sessionStorage.getItem("phone")
          };
          setUserDetails(user);
          setIsLoggedIn(true); // Set logged-in state to true if token exists
      } else {
          setIsLoggedIn(false); // Ensure logged-in state is set to false if not present
      }

      // Retrieve appointment data from localStorage
    const storedAppointmentData = localStorage.getItem('appointmentData');
    if (storedAppointmentData) {
        setAppointmentData(JSON.parse(storedAppointmentData));
        setNotificationVisible(true); // Show notification if there's an appointment
    }

    }, []);


    // Function to handle booking an appointment
    const handleBookAppointment = (data) => {
        setAppointmentData(data);
        setNotificationVisible(true);
        localStorage.setItem('appointmentData', JSON.stringify(data)); // Store appointment data
    };

    // Function to handle cancellation of an appointment
    const handleCancelAppointment = () => {
        setAppointmentData(null);
        setNotificationVisible(false);
        localStorage.removeItem('appointmentData'); // Remove appointment data
    };

    // Render the main App component
    return (
        <div className="App">
            {/* Set up BrowserRouter for routing */}
            <BrowserRouter>
                {/* Display the Navbar component and pass login state and updater function */}
                <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                {/* Render Notification component */}
                {notificationVisible && (
                    <Notification onCancel={handleCancelAppointment} />
                )}

                {/* Set up the Routes for different pages */}
                
                <Routes>
                    {/* Define individual Route components for different pages */}
                    <Route path="/" element={
                        <>
                            <LandingPage />
                            <ReviewForm /> {/* Render ReviewForm only on LandingPage */}
                        </>
                    } />
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/consultation" element={<Consultation onBookAppointment={handleBookAppointment} />} />
                    <Route path="/profile" element={<ProfileCard userDetails={userDetails} appointmentData={appointmentData}/>} />
                    <Route path="/reports" element={<ReportsLayout />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

// Export the App component as the default export
export default App;
