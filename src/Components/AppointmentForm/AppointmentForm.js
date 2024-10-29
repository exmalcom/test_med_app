import React, { useState } from 'react'

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null); // Add state for selected date
  
  
    const handleSlotSelection = (slot) => {
      setSelectedSlot(slot);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      onSubmit({ name, phoneNumber, selectedSlot, selectedDate }); // Pass selected date
      setName('');
      setPhoneNumber('');
      setSelectedSlot(null);
      setSelectedDate(null); // Clear date after submission
    };
  
    return (
      <form onSubmit={handleFormSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)} // Handle date change
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="slot">Select Time Slot:</label>
          <select id="slot" value={selectedSlot} onChange={(e) => handleSlotSelection(e.target.value)}>
            <option value ="">Select a time slot</option>
            <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
            <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
            <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
            <option value="12:00 PM - 1:00 PM">12:00 PM - 1:00 PM</option>
            <option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</option>
            <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
            <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
            <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
          </select>
        </div>
        <button type="submit">Book Now</button>
      </form>
    );
  };

export default AppointmentForm;
