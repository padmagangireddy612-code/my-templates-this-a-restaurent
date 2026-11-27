
import React from 'react';

function Contact() {

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const bookingDetails = Object.fromEntries(
      formData.entries()
    );

    // Get existing bookings
    const existingBookings = JSON.parse(
      localStorage.getItem('restaurantBookings') || '[]'
    );

    // Create new booking
    const newBooking = {
      id: Date.now(),
      name: bookingDetails.name,
      email: bookingDetails.email,
      phone: bookingDetails.phone,
      date: bookingDetails.date,
      time: bookingDetails.time,
      guests: bookingDetails.guests,
      requests: bookingDetails.requests || '',
      status: 'Pending'
    };

    // Save booking in localStorage
    const updatedBookings = [
      ...existingBookings,
      newBooking
    ];

   localStorage.setItem(
  'restaurantBookings',
  JSON.stringify(updatedBookings)
);

window.dispatchEvent(new Event('bookingUpdated'));

    alert('Thank you! Your table booking has been received.');

    // Clear form
    e.target.reset();
  };

  return (
    <section className="contact-section" id="contact">

      <div className="contact-heading">
        <span>RESERVATIONS</span>
        <h2>Book Your Table</h2>
        <p>
          Reserve your table and enjoy a wonderful dining experience.
        </p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
        />

        <input
          type="date"
          name="date"
          required
        />

        <input
          type="time"
          name="time"
          required
        />

        <select name="guests" required defaultValue="">
          <option value="" disabled>
            Select Guests
          </option>
          <option value="1">1 Guest</option>
          <option value="2">2 Guests</option>
          <option value="3">3 Guests</option>
          <option value="4">4 Guests</option>
          <option value="5">5 Guests</option>
          <option value="6+">6+ Guests</option>
        </select>

        <textarea
          name="requests"
          placeholder="Special Requests"
          rows="4"
        />

        <button type="submit">
          Confirm Booking
        </button>

      </form>
    </section>
  );
}

export default Contact;
