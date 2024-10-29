// src/components/ReviewForm/ReviewForm.js
import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = () => {
    const [view, setView] = useState('reviews'); // 'reviews' or 'reviewForm'
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        review: ''
    });
    const [doctors, setDoctors] = useState([
        { id: 1, name: 'Dr. Jiao Yang', speciality: 'Cardiology', review: '' },
        { id: 2, name: 'Dr. Denis Raj', speciality: 'Dermatology', review: '' },
    ]);

    const handleFeedbackClick = (doctor) => {
        setSelectedDoctor(doctor);
        setView('reviewForm'); // Switch to review form view
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedDoctors = doctors.map((doc) => {
            if (doc.id === selectedDoctor.id) {
                return { ...doc, review: formData.review };
            }
            return doc;
        });
        setDoctors(updatedDoctors);
        setView('reviews'); // Switch back to reviews view
        setFormData({ name: '', review: '' }); // Reset form data
        setSelectedDoctor(null); // Reset selected doctor
    };

    const renderReviews = () => (
        <div className="reviews-container"> {/* Add a wrapper div with a class */}
            <h1>Reviews</h1>
            <table>
                <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>Doctor Name</th>
                        <th>Doctor Speciality</th>
                        <th>Provide feedback</th>
                        <th>Review Given</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor, index) => (
                        <tr key={doctor.id}>
                            <td>{index + 1}</td>
                            <td>{doctor.name}</td>
                            <td>{doctor.speciality}</td>
                            <td>
                                {doctor.review ? (
                                    <p>Review given</p>
                                ) : (
                                    <button className="btn" onClick={() => handleFeedbackClick(doctor)}>Click Here</button>
                                )}
                            </td>
                            <td>{doctor.review}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderReviewForm = () => (
        <div className="review-form-container">
            <h2>Give Your Review for {selectedDoctor.name}</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                <label htmlFor="review">Review:</label>
                <textarea id="review" name="review" value={formData.review} onChange={handleChange} required />
                <button type="submit">Submit</button>
            </form>
            <button onClick={() => setView('reviews')}>Cancel</button> {/* Cancel button to go back */}
        </div>
    );

    return (
        <div>
            {view === 'reviews' ? renderReviews() : renderReviewForm()}
        </div>
    );
};

export default ReviewForm;