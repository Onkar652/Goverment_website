'use client';
import './InnovativeInitiativesPage.css';

const InnovativeInitiativesPage = () => {
    return (
        <div className="initiative-container">
            <h1>Innovative Initiatives</h1>

            <div className="initiative-list">
                <div className="initiative-card">
                    <h2>1. Digital Grievance Redressal</h2>
                    <p>A fully online system that allows citizens to file and track grievances through a user-friendly dashboard, ensuring transparency and timely resolution.</p>
                </div>

                <div className="initiative-card">
                    <h2>2. Smart Waste Management</h2>
                    <p>Implemented IoT-enabled bins across the city to monitor fill levels and optimize waste collection routes in real-time.</p>
                </div>

                <div className="initiative-card">
                    <h2>3. Paperless Office</h2>
                    <p>Adopted e-office solutions to streamline internal workflows, reduce paperwork, and improve efficiency across departments.</p>
                </div>

                <div className="initiative-card">
                    <h2>4. Health Equipment Tracking System</h2>
                    <p>Built a centralized portal to track location, usage, and maintenance of medical equipment across all government hospitals.</p>
                </div>

                <div className="initiative-card">
                    <h2>5. Real-time Public Dashboard</h2>
                    <p>Launched a public-facing analytics dashboard that displays live data about cleanliness scores, civic issues, and department performance.</p>
                </div>
            </div>

            <button className="back-btn" onClick={() => window.location.href = '/admin/mainbar'}>
                ← Back
            </button>

            <footer className="footer">
                Created by Onkar Pawar
            </footer>
        </div>
    );
};

export default InnovativeInitiativesPage;
