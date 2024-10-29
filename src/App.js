// Import necessary modules from React library
import React, { useState,useEffect } from 'react';
// Import components for routing from react-router-dom library
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Import custom Navbar component
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/LandingPage';
import Login from './Components/Login/Login';
import SignUp from './Components/Sign_Up/Sign_Up';
import Consultation from './Components/BookingConsultation';

// Function component for the main App
function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect to check if the user is already logged in on app load
    useEffect(() => {
        // Check session storage for an authentication token
        if (sessionStorage.getItem("auth-token")) {
        setIsLoggedIn(true); // Set logged-in state to true if token exists
        } else {
            setIsLoggedIn(false); // Ensure logged-in state is set to false if not present
        }
    }, []);


  // Render the main App component
  return (
    <div className="App">
        {/* Set up BrowserRouter for routing */}
        <BrowserRouter>
          {/* Display the Navbar component and pass login state and updater function */}
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

          {/* Set up the Routes for different pages */}
          <Routes>
            {/* Define individual Route components for different pages */}
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/consultation" element={<Consultation/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;