
'use client';

import { useEffect, useState } from 'react';
import './CleanlinessPage.css';

interface Cleanliness {
  id: number;
  title: string;
  description: string;
  location: string;
  activity_date: string;
  uploaded_by: string;
  file_path: string | null;
  imageUrl: string | null;
  created_at: string;
}

export default function Page() {
  const [data, setData] = useState<Cleanliness[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    activity_date: '',
    uploaded_by: '',
  });

  const fetchData = async () => {
    try {
      const res = await fetch('https://goverment-website-backend.onrender.com/cleanliness');
      if (!res.ok) throw new Error('Failed to fetch cleanliness data');
      const json = await res.json();
      setData(json.reverse());
    } catch (err) {
      setError('डेटा लोड करण्यात अडचण. कृपया पुन्हा प्रयत्न करा.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`https://goverment-website-backend.onrender.com/cleanliness/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete failed');
      await fetchData();
    } catch (err) {
      console.error(err);
      alert('डेटा हटवताना अडचण आली.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('activity_date', formData.activity_date);
    formDataToSend.append('uploaded_by', formData.uploaded_by);

    if (imageFile) {
      formDataToSend.append('file', imageFile);
    }

    try {
      const res = await fetch('https://goverment-website-backend.onrender.com/cleanliness', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!res.ok) throw new Error('Data upload failed');

      const newItem: Cleanliness = await res.json();
      setData((prev) => [newItem, ...prev]);

      // Reset form
      setFormData({
        title: '',
        description: '',
        location: '',
        activity_date: '',
        uploaded_by: '',
      });
      setImageFile(null);
    } catch (err) {
      console.error(err);
      alert('डेटा सबमिट करताना अडचण आली.');
    } finally {
      setSubmitting(false);
    }
  };


  if (loading) return <p>लोड होत आहे...</p>;
  if (error) return <p>त्रुटी: {error}</p>;

  return (
    <div className="cleanliness-container">
      <h1>स्वच्छता माहिती</h1>

      <form onSubmit={handleSubmit} className="cleanliness-form">
        <input type="text" name="title" placeholder="शीर्षक" value={formData.title} onChange={handleChange} required />
        <textarea name="description" placeholder="वर्णन" value={formData.description} onChange={handleChange} required />
        <input type="text" name="location" placeholder="स्थान" value={formData.location} onChange={handleChange} required />
        <input type="date" name="activity_date" value={formData.activity_date} onChange={handleChange} required />
        <input type="text" name="uploaded_by" placeholder="अपलोड करणारा" value={formData.uploaded_by} onChange={handleChange} required />
        <input type="file" name="file" accept="image/*" onChange={handleChangeFile} />
        <button type="submit" disabled={submitting}>
          {submitting ? 'सबमिट होत आहे...' : 'सबमिट करा'}
        </button>
      </form>

      <ul className="cleanliness-list">
        {data.map((item) => (
          <li key={item.id} className="cleanliness-item">
            <h3>{item.title}</h3>
            <p><strong>वर्णन:</strong> {item.description}</p>
            <p><strong>स्थान:</strong> {item.location}</p>
            <p><strong>दिनांक:</strong> {item.activity_date ? new Date(item.activity_date).toLocaleDateString() : 'नाही'}</p>
            <p><strong>अपलोड करणारा:</strong> {item.uploaded_by}</p>

            {item.imageUrl && (
              <div className="image-container">
                <img src={item.imageUrl} alt="Uploaded" style={{ width: '200px', marginTop: '10px' }} />
              </div>
            )}

            <button onClick={() => handleDelete(item.id)} className="delete-button">हटा</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
