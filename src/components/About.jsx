
import React from 'react';

function About() {
  return (
    <section className="about-section" id="about">

      {/* Left Side - Image */}
      <div className="about-image">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900"
          alt="Our Restaurant"
        />
      </div>

      
      <div className="about-content">

        <span className="about-label">ABOUT OUR RESTAURANT</span>

        <h2>A Place Where Every Meal Becomes Special</h2>

        <p>
          Welcome to My Restaurant! We are passionate about
          serving delicious food made with fresh ingredients
          and authentic flavours.
        </p>

        <p>
          Our restaurant brings people together through great
          food, warm hospitality and memorable dining experiences.
          Every dish is carefully prepared by our experienced
          chefs with love and attention.
        </p>

        <h3>Why People Love Us</h3>

        <ul>
          <li>Fresh and high-quality ingredients</li>
          <li>Authentic and delicious recipes</li>
          <li>Friendly and welcoming service</li>
          <li>Comfortable dining atmosphere</li>
        </ul>

      </div>

    </section>
  );
}

export default About;
