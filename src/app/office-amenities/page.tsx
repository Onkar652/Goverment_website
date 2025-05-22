'use client';
import { useEffect, useState } from 'react';
import './OfficeAmenitiesPage.css';

interface Amenity {
  hospital_name: string;
  equipment: string;
  location: string;
  additional_info: string;
}

const OfficeAmenitiesPage = () => {
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const res = await fetch('https://goverment-website-backend.onrender.com/office-amenities');
        if (!res.ok) throw new Error('Failed to fetch amenities');
        const data = await res.json();
        setAmenities(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchAmenities();
  }, []);

  if (loading) return <p className="loading-text">Loading...</p>;
  if (error) return <p className="error-text">Error: {error}</p>;

  return (
    <div className="amenities-container">
      <h1 className="page-title">Office Amenities</h1>
      {amenities.map((item, index) => (
        <div key={index} className="amenity-card">
          <p><strong>Hospital Name:</strong> {item.hospital_name}</p>
          <p><strong>Equipment:</strong> {item.equipment}</p>
          <p><strong>Location:</strong> {item.location}</p>
          <p><strong>Additional Info:</strong> {item.additional_info}</p>
        </div>
      ))}
      <button className="back-button" onClick={() => window.location.href = '/'}>
        ← Back
      </button>
    </div>
  );
};

export default OfficeAmenitiesPage;
