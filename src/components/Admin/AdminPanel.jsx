
import React, { useState, useEffect } from 'react';
import './Admin.css';

// Read localStorage data safely
const getSavedData = (key) => {
  try {
    const data = localStorage.getItem(key);
    const parsedData = data ? JSON.parse(data) : [];

    return Array.isArray(parsedData) ? parsedData : [];
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return [];
  }
};

function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState('Dashboard');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Actual customer bookings
  const [bookings, setBookings] = useState([]);

  // Load bookings from localStorage
  const loadBookings = () => {
    const savedBookings = getSavedData('restaurantBookings');

    const sortedBookings = [...savedBookings].sort(
      (a, b) => Number(b.id) - Number(a.id)
    );

    setBookings(sortedBookings);
  };

  // Load bookings automatically
  useEffect(() => {
    loadBookings();

    window.addEventListener('bookingUpdated', loadBookings);
    window.addEventListener('storage', loadBookings);

    return () => {
      window.removeEventListener('bookingUpdated', loadBookings);
      window.removeEventListener('storage', loadBookings);
    };
  }, []);

const [orders, setOrders] = useState(() =>
  getSavedData('restaurantOrders')
);

const [reviews, setReviews] = useState(() =>
  getSavedData('restaurantReviews')
);

useEffect(() => {
  const loadOrders = () => {
    setOrders(getSavedData('restaurantOrders'));
  };

  const loadReviews = () => {
    setReviews(getSavedData('restaurantReviews'));
  };

  loadOrders();
  loadReviews();

  window.addEventListener('ordersUpdated', loadOrders);
  window.addEventListener('reviewsUpdated', loadReviews);
  window.addEventListener('storage', loadOrders);
  window.addEventListener('storage', loadReviews);

  return () => {
    window.removeEventListener('ordersUpdated', loadOrders);
    window.removeEventListener('reviewsUpdated', loadReviews);
    window.removeEventListener('storage', loadOrders);
    window.removeEventListener('storage', loadReviews);
  };
}, []);
  // Admin credentials
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'Admin@123';

  // Login
  const handleLogin = (e) => {
    e.preventDefault();

    if (
      username.trim() === ADMIN_USERNAME &&
      password === ADMIN_PASSWORD
    ) {
      setIsLoggedIn(true);
      setLoginError('');
      setActivePage('Dashboard');

      setUsername('');
      setPassword('');

      loadBookings();
    } else {
      setLoginError('Invalid Username or Password!');
      setPassword('');
    }
  };

  // Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setLoginError('');
    setActivePage('Dashboard');
  };

  // Admin Login Page
  if (!isLoggedIn) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-card">

          <h1>Spice Garden</h1>
          <p>Admin Panel Login</p>

          <form onSubmit={handleLogin}>

            <label>Username</label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setLoginError('');
              }}
              autoComplete="username"
              required
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setLoginError('');
              }}
              autoComplete="current-password"
              required
            />

            {loginError && (
              <p style={{ color: 'red' }}>
                {loginError}
              </p>
            )}

            <button type="submit">
              Login to Dashboard
            </button>

          </form>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <aside className="admin-sidebar">

        <h2>Spice Garden</h2>
        <p>ADMIN PANEL</p>

        <button onClick={() => {
          loadBookings();
          setActivePage('Dashboard');
        }}>
          Dashboard
        </button>

        <button onClick={() => {
          loadBookings();
          setActivePage('Bookings');
        }}>
          Bookings
        </button>

        <button onClick={() => setActivePage('Orders')}>
          Orders
        </button>

        <button onClick={() => setActivePage('Reviews')}>
          Reviews
        </button>

        <button onClick={() => setActivePage('Customers')}>
          Customers
        </button>

        <button onClick={() => setActivePage('Settings')}>
          Settings
        </button>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </aside>

      {/* Main Content */}
      <main className="admin-main">

        <header className="admin-header">

          <div>
            <h1>{activePage}</h1>
            <p>
              Welcome to Spice Garden Admin Dashboard
            </p>
          </div>

          <span>Admin</span>

        </header>

        {/* Dashboard */}
        {activePage === 'Dashboard' && (
          <>

            <div className="admin-stats">

              <div className="stat-card">
                <h3>Total Bookings</h3>
                <h1>{bookings.length}</h1>
              </div>

              <div className="stat-card">
                <h3>Total Orders</h3>
                <h1>{orders.length}</h1>
              </div>

              <div className="stat-card">
                <h3>Total Reviews</h3>
                <h1>{reviews.length}</h1>
              </div>

              <div className="stat-card">
                <h3>Total Customers</h3>
                <h1>
                  {new Set(
                    bookings.map((b) => b.phone)
                  ).size}
                </h1>
              </div>

            </div>

            <h2 className="table-heading">
              Recent Bookings
            </h2>

            <BookingTable
              bookings={bookings.slice(0, 5)}
            />

          </>
        )}

        {/* All Bookings */}
        {activePage === 'Bookings' && (

          <div className="admin-content-card">

            <h2>All Restaurant Bookings</h2>

            <p>
              Total Bookings: <strong>{bookings.length}</strong>
            </p>

            <BookingTable bookings={bookings} />

          </div>
        )}

        {/* Orders */}
        {activePage === 'Orders' && (

          <div className="admin-content-card">

            <h2>Customer Orders</h2>

            {orders.length === 0 ? (
              <p>No orders available yet.</p>
            ) : (

              <div className="table-wrapper">

                <table className="booking-table">

                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Food Item</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order) => (

                      <tr key={order.id}>
                        <td>
                          {order.customerName || 'Guest'}
                        </td>

                        <td>
                          {order.name || order.itemName || 'Food Item'}
                        </td>

                        <td>
                          {order.quantity || 1}
                        </td>

                        <td>
                          ₹{order.total || order.price || 0}
                        </td>

                        <td>
                          {order.date || 'Not available'}
                        </td>
                      </tr>

                    ))}
                  </tbody>

                </table>

              </div>

            )}

          </div>
        )}

        {/* Reviews */}
        {activePage === 'Reviews' && (

          <div className="admin-content-card">

            <h2>Customer Reviews</h2>

            {reviews.length === 0 ? (
              <p>No customer reviews available.</p>
            ) : (

              reviews.map((review) => (

                <div
                  key={review.id}
                  className="review-card"
                  style={{
                    padding: '15px',
                    margin: '12px 0',
                    border: '1px solid #ddd',
                    borderRadius: '8px'
                  }}
                >

                  <h3>{review.name}</h3>

                  <p style={{ color: '#e5a000' }}>
                    {'★'.repeat(Number(review.rating) || 0)}
                    {'☆'.repeat(
                      5 - (Number(review.rating) || 0)
                    )}
                  </p>

                  <p>{review.review}</p>

                </div>

              ))

            )}

          </div>
        )}

        {/* Customers */}
        {activePage === 'Customers' && (

          <div className="admin-content-card">

            <h2>Customer Management</h2>

            <p>
              Total Booking Customers:{' '}
              {new Set(
                bookings.map((b) => b.phone)
              ).size}
            </p>

            {bookings.map((booking) => (

              <p key={booking.id}>
                {booking.name} - {booking.phone}
              </p>

            ))}

          </div>
        )}

        {/* Settings */}
        {activePage === 'Settings' && (

          <div className="admin-content-card">

            <h2>Admin Settings</h2>

            <p>Restaurant Name: Spice Garden</p>
            <p>Username: admin</p>
            <p>Account Type: Administrator</p>

          </div>
        )}

      </main>

    </div>
  );
}

// Reusable Booking Table
function BookingTable({ bookings }) {

  return (

    <div className="table-wrapper">

      <table className="booking-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Time</th>
            <th>Guests</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {bookings.length === 0 ? (

            <tr>
              <td
                colSpan="6"
                style={{ textAlign: 'center' }}
              >
                No bookings available yet.
              </td>
            </tr>

          ) : (

            bookings.map((booking) => (

              <tr key={booking.id}>

                <td>{booking.name}</td>
                <td>{booking.phone}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.guests}</td>

                <td>
                  <span
                    className={`status-${(
                      booking.status || 'Pending'
                    ).toLowerCase()}`}
                  >
                    {booking.status || 'Pending'}
                  </span>
                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );
}

export default AdminPanel;
        