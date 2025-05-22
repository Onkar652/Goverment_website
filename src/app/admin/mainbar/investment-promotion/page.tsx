'use client';
import './CostInfoPage.css';

const CostInfoPage = () => {
    return (
        <div className="cost-container">
            <h1>Project Cost & Credits</h1>

            <table className="cost-table">
                <thead>
                    <tr>
                        <th>Component</th>
                        <th>Estimated Cost (INR)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>UI/UX Design</td>
                        <td>₹5,000</td>
                    </tr>
                    <tr>
                        <td>Frontend Development</td>
                        <td>₹10,000</td>
                    </tr>
                    <tr>
                        <td>Backend Development</td>
                        <td>₹7,000</td>
                    </tr>
                    <tr>
                        <td>Hosting & Deployment</td>
                        <td>₹3,000</td>
                    </tr>
                    <tr>
                        <td><strong>Total</strong></td>
                        <td><strong>₹25,000</strong></td>
                    </tr>
                </tbody>
            </table>

            <div className="section">
                <h2>Funding Information</h2>
                <p>This website was developed as part of the Digital Services Initiative by the Municipal Office.</p>
                <p><strong>Funding Source:</strong> Government Fund</p>
                <p><strong>Date of Completion:</strong> May 2, 2025</p>
            </div>

            <div className="section">
                <h2>Credits</h2>
                <p><strong>Developed By:</strong> Onkar Pawar</p>
                <p><strong>Role:</strong> Full-Stack Web Developer</p>
                <p><strong>Email:</strong> onkarpawar75@gmail.com</p>
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

export default CostInfoPage;
