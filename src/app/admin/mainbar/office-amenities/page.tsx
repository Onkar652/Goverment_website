'use client';
import { useEffect, useState } from 'react';
import './OfficeAmenitiesPage.css';

interface OfficeAmenity {
  id: string;
  hospital_name: string;
  equipment: string;
  location: string;
  contact_number?: string;
  additional_info?: string;
  created_at: string;
}

const OfficeAmenitiesPage = () => {
  const [amenities, setAmenities] = useState<OfficeAmenity[]>([]);
  const [formData, setFormData] = useState({
    hospital_name: '',
    equipment: '',
    location: '',
    contact_number: '',
    additional_info: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [submitting, setSubmitting] = useState(false); // ✅ New state

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const res = await fetch('http://localhost:3000/office-amenities');
        if (!res.ok) throw new Error('Failed to fetch amenities');
        const data: OfficeAmenity[] = await res.json();
        setAmenities(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchAmenities();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true); // ✅ Show spinner
    try {
      const res = await fetch('http://localhost:3000/office-amenities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to add amenity');
      const newAmenity = await res.json();
      setAmenities(prev => [newAmenity, ...prev]);
      setFormData({
        hospital_name: '',
        equipment: '',
        location: '',
        contact_number: '',
        additional_info: '',
      });
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setSubmitting(false); // ✅ Hide spinner
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/office-amenities/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete amenity');

      setAmenities(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="office-container">
      <h1>Office Amenities</h1>

      <form className="office-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="hospital_name"
          value={formData.hospital_name}
          onChange={handleChange}
          placeholder="Hospital Name"
          required
        />
        <input
          type="text"
          name="equipment"
          value={formData.equipment}
          onChange={handleChange}
          placeholder="Equipment"
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          required
        />
        <input
          type="text"
          name="contact_number"
          value={formData.contact_number}
          onChange={handleChange}
          placeholder="Contact Number (hospital number)"
        />
        <textarea
          name="additional_info"
          value={formData.additional_info}
          onChange={handleChange}
          placeholder="Additional Info (Optional)"
        />
        <button type="submit" disabled={submitting}>
          {submitting ? 'सबमिट होत आहे...' : 'सबमिट करा'}
        </button>
      </form>

      <ul className="amenity-list">
        {amenities.map((item) => (
          <li key={item.id} className="amenity-item">
            <h3>{item.hospital_name}</h3>
            <p><strong>Equipment:</strong> {item.equipment}</p>
            <p><strong>Location:</strong> {item.location}</p>
            {item.contact_number && <p><strong>Contact:</strong> {item.contact_number}</p>}
            {item.additional_info && <p><strong>Info:</strong> {item.additional_info}</p>}
            <small><strong>Created At:</strong> {new Date(item.created_at).toLocaleString()}</small>
            <button className="delete-button" onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OfficeAmenitiesPage;
