
import React, { useEffect, useState } from 'react';
import './AdminBookings.css';

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  // Load bookings from localStorage
  const loadBookings = () => {
    const savedBookings = JSON.parse(
      localStorage.getItem('restaurantBookings') || '[]'
    );

    setBookings(savedBookings);
  };

  useEffect(() => {
    loadBookings();

    // Listen for booking updates
    window.addEventListener('storage', loadBookings);
    window.addEventListener('bookingUpdated', loadBookings);

    return () => {
      window.removeEventListener('storage', loadBookings);
      window.removeEventListener('bookingUpdated', loadBookings);
    };
  }, []);

  // Update booking status
  const updateStatus = (id, status) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id
        ? { ...booking, status }
        : booking
    );

    localStorage.setItem(
      'restaurantBookings',
      JSON.stringify(updatedBookings)
    );

    setBookings(updatedBookings);
  };

  // Delete booking
  const deleteBooking = (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) {
      return;
    }

    const updatedBookings = bookings.filter(
      (booking) => booking.id !== id
    );

    localStorage.setItem(
      'restaurantBookings',
      JSON.stringify(updatedBookings)
    );

    setBookings(updatedBookings);
  };

  return (
    <div className="admin-bookings">

      <div className="bookings-header">
        <h2>Bookings Management</h2>
        <p>Manage all customer table reservations.</p>
      </div>

      <div className="booking-count">
        Total Bookings: <strong>{bookings.length}</strong>
      </div>

      {bookings.length === 0 ? (
        <div className="no-bookings">
          <h3>No Bookings Found</h3>
          <p>Customer bookings will appear here.</p>
        </div>
      ) : (
        <div className="bookings-table-container">
          <table className="bookings-table">

            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Time</th>
                <th>Guests</th>
                <th>Requests</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.name}</td>
                  <td>{booking.email || '-'}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>{booking.guests}</td>
                  <td>{booking.requests || '-'}</td>

                  <td>
                    <span className={`booking-status ${(
                      booking.status || 'Pending'
                    ).toLowerCase()}`}>
                      {booking.status || 'Pending'}
                    </span>
                  </td>

                  <td className="booking-actions">
                    <button
                      onClick={() => updateStatus(
                        booking.id,
                        'Confirmed'
                      )}
                      className="confirm-btn"
                    >
                      Confirm
                    </button>

                    <button
                      onClick={() => updateStatus(
                        booking.id,
                        'Cancelled'
                      )}
                      className="cancel-btn"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => deleteBooking(booking.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

    </div>
  );
}

export default AdminBookings;
