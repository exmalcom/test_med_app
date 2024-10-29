// Appointments.js
import React, { useEffect, useState } from 'react';
import './Appointments.css'; // Import the CSS file

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const storedAppointments = JSON.parse(localStorage.getItem('appointmentData')) || [];
        setAppointments(storedAppointments);
    }, []);

    return (
        <div className="appointments-container">
            <h2>Your Appointments</h2>
            {appointments.length === 0 ? (
                <p>No appointments booked yet.</p>
            ) : (
                <ul>
                    {appointments.map((appointment) => (
                        <li key={appointment.id}>
                            <p>Name: {appointment.name}</p>
                            <p>Phone Number: {appointment.phoneNumber}</p>
                            <p>Date: {appointment.selectedDate}</p>
                            <p>Time Slot: {appointment.selectedSlot}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Appointments;