// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import './Sign_Up.css'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

// Function component for Sign Up form
const Sign_Up = () => {
    // State variables using useState hook
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState(''); // State to show error messages/ For server response errors
    const navigate = useNavigate(); // Navigation hook from react-router
    const [errors, setErrors] = useState({}); // For front-end validation errors

    const validate = () => {
        let validationErrors = {};
        let isValid = true;

        if (!name.trim()) {
            validationErrors.name = "Name is required";
            isValid = false;
        }

        const phonePattern = /^[0-9]{10}$/;
        if (!phone.match(phonePattern)) {
            validationErrors.phone = "Phone number must be 10 digits";
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.match(emailPattern)) {
            validationErrors.email = "Please enter a valid email";
            isValid = false;
        }

        if (password.length < 8) {
            validationErrors.password = "Password must be at least 8 characters";
            isValid = false;
        }

        setErrors(validationErrors);
        return isValid;
    };


    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (!validate()) return; // Prevent API call if validation fails

        // API Call to register user
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });

        const json = await response.json(); // Parse the response JSON

        if (json.authtoken) {
            // Store user data in session storage
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);


            // Alert user of successful registration
            alert('Registration successful!'); // <-- Add this line

            // Redirect user to home page
            navigate("/");
            window.location.reload(); // Refresh the page
        } else {
            if (json.errors) {
                setShowerr(json.errors.map(error => error.msg).join(', ')); // Show error messages
            } else {
                setShowerr(json.error);
            }
        }
    };


    const handleReset = () => {
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setShowerr('');
        setErrors({});
    };
    
    // In the button:
    <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light" onClick={handleReset}>Reset</button>

    // JSX to render the Sign Up form
    return (
        <div className="container" style={{ marginTop: '5%' }}> {/* Main container with margin-top */}
            <div className="signup-grid"> {/* Grid layout for sign-up form */}
                <div className="signup-text"> {/* Title for the sign-up form */}
                    <h1>Sign Up</h1>
                </div>
                <div className="signup-text1" style={{ textAlign: 'left' }}> {/* Text for existing members to log in */}
                    Already a member? <span><Link to="/login" style={{ color: '#2190FF' }}> Login</Link></span>
                </div>
                {showerr && <div className="error-message">{showerr}</div>} {/* Error message */}
                <div className="signup-form"> {/* Form for user sign-up */}
                    
                    <form onSubmit={register}> {/* Start of the form */}

                        <div className="form-group"> {/* Form group for user's name */}
                            <label htmlFor="name">Name</label> {/* Label for name input field */}
                            <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                required 
                                className="form-control" 
                                placeholder="Enter your name" 
                                aria-describedby="helpId" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            /> {/* Text input field for name */}
                            {errors.name && <div className="error-message">{errors.name}</div>}
                        </div>

                        <div className="form-group"> {/* Form group for user's phone number */}
                            <label htmlFor="phone">Phone</label> {/* Label for phone input field */}
                            <input 
                                type="tel" 
                                name="phone" 
                                id="phone" 
                                required 
                                className="form-control" 
                                placeholder="Enter your phone number" 
                                aria-describedby="helpId" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            /> {/* Tel input field for phone number */}
                            {errors.phone && <div className="error-message">{errors.phone}</div>}
                        </div>

                        <div className="form-group"> {/* Form group for user's email */}
                            <label htmlFor="email">Email</label> {/* Label for email input field */}
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                required 
                                className="form-control" 
                                placeholder="Enter your email" 
                                aria-describedby="helpId"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            /> {/* Email input field */}
                            {errors.email && <div className="error-message">{errors.email}</div>}
                        </div>

                        <div className="form-group"> {/* Form group for user's password */}
                            <label htmlFor="password">Password</label> {/* Label for password input field */}
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                required 
                                className="form-control" 
                                placeholder="Enter your password" 
                                aria-describedby="helpId" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            /> {/* Password input field */}
                            {errors.password && <div className="error-message">{errors.password}</div>}
                        </div>

                        <div className="btn-group"> {/* Button group for form submission and reset */}
                            <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Submit</button> {/* Submit button */}
                            <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light" onClick={handleReset}>Reset</button> {/* Reset button */}
                        </div>
                    </form> {/* End of the form */}
                </div>
            </div>
        </div> 
    )
}

// Note: Sign up role is not stored in the database. Additional logic can be implemented for this based on your React code.


export default Sign_Up; // Export the Sign_Up component for use in other components