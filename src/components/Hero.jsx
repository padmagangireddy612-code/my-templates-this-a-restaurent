
import React from 'react';

function Hero() {
  return (
    <section className="hero-section" id="home">

      <div className="hero-overlay">
        <span>WELCOME TO MY RESTAURANT</span>

        <h1>
          Delicious Food,
          <br />
          Beautiful Moments
        </h1>

        <p>
          Enjoy fresh ingredients, authentic flavours
          and unforgettable dining experiences.
        </p>

        <div className="hero-buttons">
          <a href="#menu" className="explore-btn">
            Explore Menu
          </a>

          <a href="#contact" className="booking-btn">
            Book a Table
          </a>
        </div>
      </div>

    </section>
  );
}

export default Hero;
