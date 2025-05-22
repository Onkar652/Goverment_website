'use client';

import { useEffect, useState } from 'react';
import './CleanlinessPage.css';

interface CleanlinessData {
  title: string;
  description: string;
  location: string;
  activity_date: string;
  imageUrl?: string;
}

const CleanlinessPage = () => {
  const [cleanlinessData, setCleanlinessData] = useState<CleanlinessData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/cleanliness');
        if (!res.ok) throw new Error('Failed to fetch cleanliness data');
        const data = await res.json();
        setCleanlinessData([...data].reverse());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="cleanliness-container">
      {/* <h1 className="page-title">Cleanliness Activity Reports</h1> */}
      <h2 className='page-title'>पशुसंवर्धन विभाग पंचायत समिति, ता,सोयगाव,जिल्हा छत्रपती संभाजीनगर </h2>
      <button className="back-btn" onClick={() => window.location.href = '/'}>
        ← Back to Home
      </button>

      <div className="report-list">
        {cleanlinessData.map((item, index) => (
          <div
            key={index}
            className={`report-entry ${index % 2 === 0 ? 'image-left' : 'image-right'}`}
          >
            <div className="report-image-wrapper">
              <img
                src={item.imageUrl || '/images/no-image.png'}
                alt={item.title}
                className="report-image"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/no-image.png';
                }}
              />
            </div>
            <div className="report-info">
              <h2 className="report-title">{item.title}</h2>
              <p><strong>📍 Location:</strong> {item.location}</p>
              <p><strong>📅 Date:</strong> {new Date(item.activity_date).toLocaleDateString()}</p>
              <p className="report-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CleanlinessPage;
