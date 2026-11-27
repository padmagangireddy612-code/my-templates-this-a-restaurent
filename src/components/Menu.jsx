
import React from 'react';
import { menuItems } from "../data/product.js";

function Menu({ onOrder }) {
  return (
    <section className="menu-section" id="menu">

      <div className="menu-heading">
        <h2>Our Delicious Menu</h2>
        <p>Discover our special and tasty dishes</p>
      </div>

      <div className="menu-container">

        {menuItems.map((item) => (
          <div className="menu-card" key={item.id}>

            <img src={item.image} alt={item.name} />

            <div className="menu-info">
              <span>{item.category}</span>

              <h3>{item.name}</h3>

              <p>{item.description}</p>

              <div className="menu-bottom">

                <h4>₹{item.price}</h4>

                <button
                  onClick={() => onOrder(item)}
                >
                  Order Now
                </button>

              </div>
            </div>

          </div>
        ))}

      </div>
    </section>
  );
}

export default Menu;
