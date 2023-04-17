import React from "react";
import { useState } from "react";
import "./MatchingPage.css";
import { Grid } from "@mui/material";

export default function MatchingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imagesTops = [
    {
      url: "https://example.com/image1.jpg",
      caption: "Image 1",
    },
    {
      url: "https://example.com/image2.jpg",
      caption: "Image 2",
    },
    {
      url: "https://example.com/image3.jpg",
      caption: "Image 3",
    },
  ];

  const imagesBottoms = [
    {
      url: "https://example.com/image1.jpg",
      caption: "Image 1",
    },
    {
      url: "https://example.com/image2.jpg",
      caption: "Image 2",
    },
    {
      url: "https://example.com/image3.jpg",
      caption: "Image 3",
    },
  ];

  const handleNextClick = (images) => {
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevClick = (images) => {
    if (currentIndex === 0) {
      setCurrentIndex(images.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div>
      <h1 className="image-gallery-title">DRESSERLY</h1>
      <div className="image-gallery-container">
        <div className="image-gallery-left">
          <h1 className="image-gallery-matching">MATCHING</h1>
        </div>
        <div className="image-gallery-middle">
          <h4 className="image-gallery-middle-titles">STYLE</h4>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>

          <h4 className="image-gallery-middle-titles">COLORS</h4>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
          <p>aaa</p>
        
        </div>
        <div className="image-gallery-right">
          <h5 className="image-gallery-secondTitle">TOP</h5>
          <div className="image-gallery-tops">
            <button onClick={() => handlePrevClick(imagesTops)}></button>
            <img
              src={imagesTops[currentIndex].url}
              alt={imagesTops[currentIndex].caption}
            />
            <button onClick={() => handleNextClick(imagesTops)}></button>
          </div>

          <div className="image-gallery-bottoms">
            <button onClick={() => handlePrevClick(imagesBottoms)}></button>
            <img
              src={imagesBottoms[currentIndex].url}
              alt={imagesBottoms[currentIndex].caption}
            />
            <button onClick={() => handleNextClick(imagesBottoms)}></button>
          </div>
          <h5 className="image-gallery-secondTitle">BOTTOM</h5>
        </div>
      </div>
    </div>
  );
}
