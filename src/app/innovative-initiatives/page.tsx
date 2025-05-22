'use client';  // Marking the component as a Client Component

import React from 'react';
import './InnovativeInitiatives.css';  // Importing the separate CSS file for styling

const InnovativeInitiatives = () => {
  return (
    <div className="innovative-initiatives-container">
      <h1 className="page-title">Innovative Initiatives by the Government</h1>
      
      <div className="innovative-initiatives-content">
        <p>Welcome to the portal showcasing the government's innovative initiatives aimed at driving progress, sustainability, and inclusivity. Our goal is to leverage cutting-edge technology and forward-thinking policies to improve the quality of life for all citizens.</p>

        <h2 className="section-title">Smart Cities Development</h2>
        <p>Smart cities integrate advanced technology with urban living to create more efficient, sustainable, and livable cities. These cities focus on smart infrastructure, digital governance, and urban mobility solutions.</p>

        <h2 className="section-title">Green and Renewable Energy Programs</h2>
        <p>Our green initiatives aim to foster sustainable energy solutions, promote clean technologies, and reduce the nation's carbon footprint. These initiatives focus on solar energy, wind power, and electric vehicle adoption.</p>

        <h2 className="section-title">E-Government and Digital Transformation</h2>
        <p>Through digital transformation, the government is making public services more accessible and efficient through e-government portals, digital health services, and online education platforms.</p>

        <h2 className="section-title">Fintech and Financial Inclusion</h2>
        <p>We are committed to ensuring that every citizen has access to financial services through digital payments, microfinance programs, and blockchain technologies that guarantee transparency.</p>

        <h2 className="section-title">AI and Machine Learning for Governance</h2>
        <p>By implementing AI and machine learning in public administration, we are enhancing service delivery, improving decision-making, and optimizing public resources for better governance.</p>

        <h2 className="section-title">Social Innovation and Empowerment Programs</h2>
        <p>Our social innovation programs focus on empowering marginalized communities, providing skills training, and fostering gender equality and youth leadership.</p>

        <h2 className="section-title">Public-Private Partnerships</h2>
        <p>Our government partners with private enterprises to create world-class infrastructure, healthcare solutions, and transportation systems, promoting innovation through collaboration.</p>

        <h2 className="section-title">Sustainable Agriculture and Rural Development</h2>
        <p>Our agriculture initiatives focus on smart farming, ensuring better yields, more sustainable practices, and better market access for farmers.</p>
      </div>

      {/* Back Button */}
      <button 
        className="back-btn"
        onClick={() => window.location.href = '/'} // Customize the back button URL
      >
        ← Back
      </button>
    </div>
  );
};

export default InnovativeInitiatives;
