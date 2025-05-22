'use client';
import { useEffect, useState } from 'react';
import './Survey.css';

interface SurveyItem {
  id: string;
  location: string;
  hospital_name: string;
  handled_problems: string;
  imag_url: string;
}

const Survey = () => {
  const [surveyData, setSurveyData] = useState<SurveyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const res = await fetch('http://localhost:3000/survey');
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setSurveyData(data);
      } catch {
        setError('Error fetching survey data.');
      } finally {
        setLoading(false);
      }
    };
    fetchSurveyData();
  }, []);

  return (
    <div className="survey-container">
      <div className="title-wrapper">
        <h2>Survey Data</h2>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && surveyData.length > 0 ? (
        <div className="survey-list">
          {surveyData.map(({ id, location, hospital_name, handled_problems, imag_url }, index) => {
            const isOdd = index % 2 === 0; // 0-based index: even index = odd item

            return (
              <div
                key={id}
                className={`survey-item-wrapper ${isOdd ? 'odd-item' : 'even-item'}`}
              >
                <div className="image-wrapper">
                  <img src={imag_url} alt={`Survey location: ${location}`} loading="lazy" />
                </div>
                <div className="info-wrapper">
                  <p><strong>Location:</strong> {location}</p>
                  <p><strong>Hospital Name:</strong> {hospital_name}</p>
                  <p><strong>Work:</strong> {handled_problems}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        !loading && <p className="no-data">No data available</p>
      )}

      <button className="survery-back-btn" onClick={() => (window.location.href = '/')}>
        ← Back
      </button>
    </div>
  );
};

export default Survey;
