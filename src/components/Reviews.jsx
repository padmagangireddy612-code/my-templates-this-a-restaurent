
import React, { useState } from 'react';

function Reviews() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('5');
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !review.trim()) {
      alert('Please fill all fields');
      return;
    }

    const newReview = {
      id: Date.now(),
      name: name.trim(),
      rating: Number(rating),
      review: review.trim()
    };

    const savedReviews = JSON.parse(
      localStorage.getItem('restaurantReviews') || '[]'
    );

    savedReviews.push(newReview);

    localStorage.setItem(
      'restaurantReviews',
      JSON.stringify(savedReviews)
    );

    setName('');
    setRating('5');
    setReview('');

    alert('Thank you! Your review has been submitted.');
  };

  return (
    <section className="reviews-section" id="reviews">

      <div className="review-form">
        <h3>Write Your Review</h3>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="5">★★★★★ - Excellent</option>
            <option value="4">★★★★ - Very Good</option>
            <option value="3">★★★ - Good</option>
            <option value="2">★★ - Average</option>
            <option value="1">★ - Poor</option>
          </select>

          <textarea
            placeholder="Write your experience..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows="4"
          />

          <button type="submit">
            Submit Review
          </button>

        </form>
      </div>

    </section>
  );
}

export default Reviews;
