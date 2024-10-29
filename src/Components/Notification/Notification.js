import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ onCancel }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [appointmentData, setAppointmentData] = useState(null);

    useEffect(() => {
        const storedAppointmentData = JSON.parse(localStorage.getItem('appointmentData'));
        if (storedAppointmentData) {
            setAppointmentData(storedAppointmentData);
        }
    }, []);

    useEffect(() => {
        if (onCancel) {
            setIsVisible(false);
        }
    }, [onCancel]);

    if (!isVisible || !appointmentData) return null;

    return (
        <div className="notification">
            <h3>Appointment Notification</h3>
            <div className="appointment-details">
                <p><strong>Doctor:</strong> {appointmentData.doctorName}</p>
                <p><strong>Name:</strong> {appointmentData.userName}</p>
                <p><strong>Date of Appointment:</strong> {appointmentData.date}</p>
                <p><strong>Time Slot:</strong> {appointmentData.time}</p>
                <button onClick={() => setIsVisible(false)}>Cancel</button>
            </div>
        </div>
    );
};

export default Notification;