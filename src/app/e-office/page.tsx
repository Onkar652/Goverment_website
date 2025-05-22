'use client'; 
import React from 'react';
import './EOffice.css'; // Link to the CSS file for styling

const EOffice = () => {
  return (
    <div className="e-office-container">
      <h1 className="page-title">E-Office: Animal Care and Welfare</h1>
      
      <div className="e-office-content">
        <p>Welcome to the E-Office portal dedicated to Animal Care and Welfare. The government is committed to ensuring the well-being of animals through various programs, shelters, and hospitals. Below are the important services and information available through this portal:</p>
        
        <h2 className="section-title">Government Animal Care Hospitals</h2>
        <p>The government has set up several animal care hospitals across the country to provide medical care to injured, sick, or stray animals. These hospitals offer emergency services, vaccination programs, and general health check-ups. Here are some key features:</p>

        <ul>
          <li><strong>Emergency Medical Care:</strong> Immediate treatment for injured or sick animals.</li>
          <li><strong>Vaccination Programs:</strong> Regular vaccination drives to ensure animal health.</li>
          <li><strong>Adoption Services:</strong> Helping stray animals find permanent homes.</li>
          <li><strong>Awareness Campaigns:</strong> Educating the public on animal rights and responsibilities.</li>
        </ul>

        <h2 className="section-title">How to Access Services</h2>
        <p>If you encounter an injured or stray animal, or if you need to report an issue related to animal welfare, you can contact the nearest government-run animal care hospital or welfare center. Below are the steps to access the services:</p>

        <ul>
          <li>Visit the nearest Animal Care Hospital in your region.</li>
          <li>Fill out a complaint or service request form online or in person.</li>
          <li>Emergency cases can be reported directly to the hospitals emergency number.</li>
        </ul>

        <h2 className="section-title">Key Government Animal Welfare Initiatives</h2>
        <ul>
          <li><strong>National Animal Welfare Scheme:</strong> A nationwide program aimed at improving the welfare of animals, providing shelters, and implementing vaccination and sterilization programs.</li>
          <li><strong>Animal Rescue and Rehabilitation:</strong> A rescue operation for injured animals, ensuring they are rehabilitated before being released into the wild or placed in shelters.</li>
          <li><strong>Stray Animal Control:</strong> Managing the stray animal population through humane methods, such as sterilization and relocation.</li>
        </ul>
        
        <p>For more detailed information, please visit your local animal welfare office or contact the national animal welfare department.</p>
      </div>

      {/* Back Button */}
      <button 
        className="back-btn"
        onClick={() => window.location.href = '/'} 
      >
        ← Back
      </button>
    </div>
  );
};

export default EOffice;
