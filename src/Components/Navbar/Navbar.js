import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();  // Hook to programmatically navigate
  const email = sessionStorage.getItem('email'); // Retrieve email from sessionStorage
  const username = email ? email.split('@')[0] : ''; // Extract username from email

  const handleClick = () => {
    // Define your click handling logic here (e.g., toggle mobile menu)
    console.log('Navigation icon clicked');
  };

  const handleLogout = () => {
    // Confirmation alert before logging out
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
        sessionStorage.removeItem("auth-token"); // Clear auth token from session storage
        localStorage.removeItem("user-info"); // Clear user data from local storage
        setIsLoggedIn(false); // Update the logged-in state
        sessionStorage.removeItem('email'); // Clear email from session storage
        navigate("/"); // Redirect to the home page
        window.location.reload(); // Refresh the page after logout
    }
  };

  return (
    <div>
      <nav>
        {/* Navigation logo section */}
        <div className="nav__logo">
          {/* Link to the home page */}
          <Link to="/">
            StayHealthy
            {/* Insert an SVG icon of a doctor with a stethoscope */}
            <svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 1000 1000" style={{ fill: '#3685fb' }}>
              <title>Doctor With Stethoscope SVG icon</title>
              <g>
                <g>
                  {/* Path for the stethoscope icon */}
                  <path d="M499.8,10c91.7,0,166,74.3,166,166c0,91.7-74.3,166-166,166c-91.7,0-166-74.3-166-166C333.8,84.3,408.1,10,499.8,10z"></path>
                  {/* Additional path for the icon */}
                  <path d="M499.8,522.8c71.2,0,129.1-58.7,129.1-129.1H370.6C370.6,464.1,428.6,522.8,499.8,522.8z"></path>
                  {/* Another path for the icon */}
                  <path d="M693.2,395c-0.7,94.9-70.3,173.7-160.8,188.9v155.9c0,80.3-60.7,150.8-140.8,155.3c-83,4.7-152.7-58.9-157.6-139.7c-22-12.8-35.6-38.5-30.3-66.7c4.7-25.1,25.5-45.6,50.8-49.9c39.7-6.7,74.1,23.7,74.1,62.1c0,23-12.3,43-30.7,54.1c4.7,45.4,45.1,80.4,92.6,76c44.6-4,77.2-44...."></path>
                </g>
              </g>
            </svg>
          </Link>
          {/* A span element for styling purposes */}
          <span>.</span>
        </div>
        {/* Navigation icon section with an onClick event listener */}
        <div className="nav__icon" onClick={handleClick}>
          {/* Font Awesome icon for bars (hamburger menu) */}
          <i className="fa fa-times fa fa-bars"></i>
        </div>

        {/* Unordered list for navigation links with 'active' class */}
        <ul className="nav__links active">
          {/* List item for the 'Home' link */}
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          {/* List item for the 'Appointments' link */}
          <li className="link">
            <Link to="/appointments">Appointments</Link>
          </li>
          {/* List item for the 'Sign Up' link with a button */}
          <li className="link">
            {isLoggedIn ? (
              <div className='user-info'>
                {/* Display username before Logout */}
                <span className="username">{username}</span>
                <button className="btn1" onClick={handleLogout}>Logout</button> {/* Logout button for logged in users */}
              </div>
            ) : (
              <Link to="/signup">
              <button className="btn1">Sign Up</button> {/* Sign up link for new users */}
              </Link>
            )}
          </li>
          {/* List item for the 'Login' link with a button */}
          {!isLoggedIn && (
            <li className="link">
                <Link to="/login">
                <button className="btn1" onClick={() => navigate("/login")}>Login</button>
                </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;