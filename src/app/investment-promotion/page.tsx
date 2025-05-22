'use client';  

import React from 'react';
import './InvestmentPromotion.css'; // Link to the CSS file for styling

const InvestmentPromotion = () => {
  return (
    <div className="investment-promotion-container">
      <h1 className="page-title">Investment Promotion: A Gateway to Growth and Welfare</h1>
      
      <div className="investment-promotion-content">
        <p>Welcome to the Government's Investment Promotion Portal. Our mission is to create a conducive environment for businesses to grow and thrive. The government has rolled out various initiatives aimed at attracting investments, fostering innovation, and creating job opportunities across the country. Below are key areas of focus:</p>
        
        <h2 className="section-title">Key Investment Opportunities</h2>
        <p>The government offers several opportunities for domestic and international investors. These include sectors that drive economic growth, employment, and social welfare. Here are the primary sectors for investment:</p>

        <ul>
          <li><strong>Renewable Energy:</strong> Investment in clean energy technologies like solar and wind to promote sustainable development.</li>
          <li><strong>Healthcare and Hospitals:</strong> Funding for expanding and modernizing healthcare infrastructure, including government-run hospitals and animal care facilities.</li>
          <li><strong>Education and Skill Development:</strong> Opportunities to invest in educational programs and skill development to empower the workforce.</li>
          <li><strong>Agriculture and Rural Development:</strong> Investments that aim to modernize farming practices and promote rural growth.</li>
          <li><strong>Infrastructure Development:</strong> Projects related to building better roads, transportation, and urban planning to facilitate business growth.</li>
        </ul>

        <h2 className="section-title">Government Initiatives for Promoting Investments</h2>
        <p>The government is committed to providing incentives and a transparent policy framework to attract investments. Some of the key initiatives include:</p>

        <ul>
          <li><strong>Investment Facilitation Centers:</strong> These centers provide guidance to investors about regulatory requirements and available incentives.</li>
          <li><strong>Tax Benefits and Incentives:</strong> Special tax breaks and subsidies for businesses investing in priority sectors.</li>
          <li><strong>Easy Licensing Process:</strong> Streamlined processes for acquiring licenses and permits for businesses across industries.</li>
          <li><strong>Public-Private Partnerships:</strong> The government encourages collaborations between private investors and the public sector for large-scale infrastructure projects.</li>
        </ul>

        <h2 className="section-title">Animal Welfare and Government Hospitals</h2>
        <p>As part of its broader social responsibility, the government also focuses on animal welfare and providing healthcare services for both humans and animals. Here are some notable initiatives:</p>

        <h3 className="subsection-title">Government Animal Care Hospitals</h3>
        <p>The government-run animal care hospitals are designed to offer medical attention and rehabilitation services for sick, injured, or stray animals. These hospitals also provide vital vaccinations and adoption services. Key features include:</p>

        <ul>
          <li><strong>Emergency Medical Care:</strong> Rapid response to injuries and illnesses affecting animals.</li>
          <li><strong>Adoption Services:</strong> Facilitating the adoption of stray animals, offering a safe home to those in need.</li>
          <li><strong>Vaccination Campaigns:</strong> Nationwide vaccination programs to reduce the spread of diseases.</li>
          <li><strong>Public Awareness:</strong> Campaigns to educate citizens on animal rights, care, and responsibility.</li>
        </ul>

        <h3 className="subsection-title">Healthcare and Hospitals for Citizens</h3>
        <p>In addition to animal welfare, the government is deeply invested in providing world-class healthcare for its citizens. The following services are available:</p>

        <ul>
          <li><strong>Public Hospitals:</strong> Affordable healthcare facilities with specialized services for all citizens, including emergency care, maternity, and pediatric care.</li>
          <li><strong>Emergency Medical Services:</strong> A well-coordinated emergency response system that ensures rapid treatment for citizens in distress.</li>
          <li><strong>Specialized Clinics:</strong> Clinics dedicated to treating specific medical conditions, from chronic illnesses to rehabilitation.</li>
          <li><strong>Healthcare Programs:</strong> Ongoing efforts to provide medical supplies and services to underserved regions of the country.</li>
        </ul>

        <h2 className="section-title">How to Invest</h2>
        <p>If you are an investor looking to explore opportunities in the government’s priority sectors, here are the steps to get started:</p>

        <ul>
          <li>Identify the sector or industry you want to invest in.</li>
          <li>Contact the respective Investment Facilitation Center for detailed information.</li>
          <li>Submit your business proposal or project plan for review and approval.</li>
          <li>Consult with the government’s legal and financial advisors to understand regulations and incentives.</li>
        </ul>

        <h2 className="section-title">Contact Information</h2>
        <p>For more detailed information on investment opportunities or to inquire about specific government services, please contact:</p>
        <ul>
          <li><strong>Investment Facilitation Office:</strong> info@investment.gov</li>
          <li><strong>Animal Welfare Department:</strong> animals@welfare.gov</li>
          <li><strong>Healthcare Services:</strong> healthservices@gov</li>
        </ul>
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

export default InvestmentPromotion;
