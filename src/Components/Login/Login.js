// Following code has been commented with appropriate comments for your reference.
import React, { useState, useEffect } from 'react';
// Apply CSS according to your design theme or the CSS provided in week 2 lab 2

import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import './Login.css';

const Login = ({ setIsLoggedIn }) => {

  // State variables for email and password
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  // Get navigation function from react-router-dom
  const navigate = useNavigate();

  // Check if user is already authenticated, then redirect to home page
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);

  // Function to handle login form submission
  const login = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!email || !password) {
        setErrorMessage("Email and password are required.");
        return;
    }

    // Clear any previous error messages
    setErrorMessage('');


    // Send a POST request to the login API endpoint
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });

    // Parse the response JSON
    const json = await res.json();

    if (json.authtoken) {
      // If authentication token is received, store it in session storage
      sessionStorage.setItem('auth-token', json.authtoken);
      sessionStorage.setItem('email', email); // Store email in sessionStorage
      setIsLoggedIn(true); // Update login state 
      
      // Redirect to home page and reload the window
      navigate('/');
      window.location.reload();
    } else {
      // Handle errors if authentication fails
      if (json.errors) {
        json.errors.forEach((error) => alert(error.msg));
      } else {
        // Set error message based on the server response
        // Here you can customize the error message based on the response
        // Handle errors if authentication fails
        if (json.error) {
            //setErrorMessage(json.error); // Use the error message from the server
            setErrorMessage("Login failed, Check your Email address and Password."); // Use a generic error message
        } else {
            setErrorMessage(json.error || "Login failed. Please try again.");
        }
      }
    }
  };

  // Function to handle form reset
  const handleReset = () => {
    setEmail('');
    setPassword('');
    setErrorMessage('');
  };

  return (
    // Main container div for the page content
        <div className="container">
            {/* Div for login grid layout */}
            <div className="login-grid">
                {/* Div for login text */}
                <div className="login-text">
                    <h2>Login</h2>
                </div>
                {/* Additional login text with a link to Sign Up page */}
                <div className="login-text">
                    Are you a new member? <span><Link to="/signup" style={{ color: '#2190FF' }}> Sign Up Here</Link></span>
                </div>
                <br />
                {/* Div for login form */}
                <div className="login-form">
                    <form onSubmit={login}>
                        

                        {/* Form group for email input */}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                className="form-control" 
                                placeholder="Enter your email" 
                                aria-describedby="helpId" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {/* Form group for password input */}
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter your password"
                                aria-describedby="helpId"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {/* Display error message if there is one */}
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        </div>
                        {/* Button group for login and reset buttons */}
                        <div className="btn-group">
                            <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Login</button>
                            <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light" onClick={handleReset}>Reset</button>
                        </div>
                        <br />
                        {/* Additional login text for 'Forgot Password' option */}
                        <div className="login-text">
                            Forgot Password?
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default Login;
