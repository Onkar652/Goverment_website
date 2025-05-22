'use client';
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import "./home.css";

export default function Home() {
  const images = [
    "/cows1.png",
    "/cows2.png",
    "/cows3.png",
    "/cows4.png",
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  useEffect(() => {
    // Pick a random image on mount
    const randomIndex = Math.floor(Math.random() * images.length);
    setSelectedImage(images[randomIndex]);

    // Change image every 10 seconds randomly
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * images.length);
      setSelectedImage(images[randomIndex]);
    }, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="home-page">
        <div className="logo-container">
          <img src="/logo.jpg" alt="Hospital Logo" className="logo" />
        </div>
        <div className="text-overlay">
          <h1>पशुसंवर्धन विभाग पंचायत समिति, ता,सोयगाव,जिल्हा छत्रपती संभाजीनगर.</h1>
        </div>
        <img src={selectedImage} alt="Cow in hospital care" className="cows-img" />
      </div>
    </div>
  );
}
