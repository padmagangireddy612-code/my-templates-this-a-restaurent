
import React, { useState } from 'react';

function Order({ item, onBack }) {
  const [quantity, setQuantity] = useState(1);

  if (!item) {
    return <p>No item selected.</p>;
  }

  const total = Number(item.price) * quantity;

  const handlePlaceOrder = () => {
    const newOrder = {
      id: Date.now(),
      customerName: 'Guest',
      name: item.name,
      itemName: item.name,
      quantity: quantity,
      price: Number(item.price),
      total: total,
      date: new Date().toLocaleDateString('en-IN'),
      status: 'Pending'
    };

    try {
      const savedOrders = JSON.parse(
        localStorage.getItem('restaurantOrders') || '[]'
      );

      const updatedOrders = [
        ...savedOrders,
        newOrder
      ];

      localStorage.setItem(
        'restaurantOrders',
        JSON.stringify(updatedOrders)
      );

      window.dispatchEvent(
        new Event('ordersUpdated')
      );

      alert('Order placed successfully!');

      onBack();

    } catch (error) {
      console.error('Order saving failed:', error);
      alert('Unable to place order. Please try again.');
    }
  };

  return (
    <div className="order-page">

      <button onClick={onBack}>
        Back to Menu
      </button>

      <h2>Order Details</h2>

      <img
        src={item.image}
        alt={item.name}
        width="200"
      />

      <h3>{item.name}</h3>

      <p>{item.description}</p>

      <h4>Price: ₹{item.price}</h4>

      <label>Quantity: </label>

      <button
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
      >
        -
      </button>

      <span> {quantity} </span>

      <button
        onClick={() => setQuantity(quantity + 1)}
      >
        +
      </button>

      <h3>Total: ₹{total}</h3>

      <button onClick={handlePlaceOrder}>
        Place Order
      </button>

    </div>
  );
}

export default Order;
