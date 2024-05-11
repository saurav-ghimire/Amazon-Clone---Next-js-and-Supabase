import React from "react";

function Rating({averageRating}:{averageRating:any}) {
  // Round the average rating to the nearest half value
  const roundedRating = Math.round(averageRating * 2) / 2;

  // Array to store star components
  const stars = [] as any;

  // Function to generate star components based on rounded rating
  const generateStars = () => {
    for (let i = 0; i < 5; i++) {
      if (i < roundedRating) {
        stars.push(<span key={i} className="text-yellow-400">★</span>);
      } else {
        stars.push(<span key={i} className="text-gray-300">★</span>);
      }
    }
  };

  generateStars(); // Call the function to generate stars

  return (
    <div className="flex items-center space-x-1">
      {stars}
      <span className="text-gray-500">({averageRating.toFixed(1)})</span>
    </div>
  );
}

export default Rating;
