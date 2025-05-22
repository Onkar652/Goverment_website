'use client';
import { useEffect, useState } from 'react';
import './SurveyPage.css';

interface Survey {
  id: string;
  location: string;
  hospital_name: string;
  handled_problems: string;
  created_at: string;
  image_url?: string;
}

const SurveyPage = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [formFile, setFormFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState({
    location: '',
    hospital_name: '',
    handled_problems: '',
  });

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const res = await fetch('https://goverment-website-backend.onrender.com/survey');
        if (!res.ok) throw new Error('Failed to fetch survey data');
        const data: Survey[] = await res.json();

        const correctedData = data.map(survey => ({
          ...survey,
          image_url: survey.image_url || (survey as any).imag_url || '',
        })).reverse();

        setSurveys(correctedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this survey?')) return;

    try {
      const res = await fetch(`https://goverment-website-backend.onrender.com/survey/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete survey');
      setSurveys(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('location', form.location);
      formData.append('hospital_name', form.hospital_name);
      formData.append('handled_problems', form.handled_problems);
      if (formFile) {
        formData.append('image', formFile);
      }

      const res = await fetch('https://goverment-website-backend.onrender.com/survey', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to add survey');
      const newSurvey = await res.json();
      newSurvey.image_url = newSurvey.image_url || newSurvey.imag_url || '';

      setSurveys(prev => [...prev, newSurvey]);
      setForm({ location: '', hospital_name: '', handled_problems: '' });
      setFormFile(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="survey-container">
      <h1>Survey Reports</h1>

      {/* Add Survey Form */}
      <form onSubmit={handleSubmit} className="survey-form" encType="multipart/form-data">
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="hospital_name"
          placeholder="Hospital Name or Area Name"
          value={form.hospital_name}
          onChange={handleChange}
          required
        />
        <textarea
          name="handled_problems"
          placeholder="The Work you have done"
          value={form.handled_problems}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setFormFile(e.target.files?.[0] || null)}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? 'सबमिट होत आहे...' : 'सबमिट करा'}
        </button>
      </form>

      {/* Display Survey List */}
      <ul>
        {surveys.map((survey) => (
          <li key={survey.id} className="survey-item">
            <h3>Hospital: {survey.hospital_name}</h3>
            <p><strong>Location:</strong> {survey.location}</p>
            <p><strong>Work Done:</strong> {survey.handled_problems}</p>
            <small><strong>Created At:</strong> {new Date(survey.created_at).toLocaleString()}</small>
            {survey.image_url && (
              <div>
                <img src={survey.image_url} alt="Survey" width={200} style={{ marginTop: '10px' }} />
              </div>
            )}
            <br />
            <button onClick={() => handleDelete(survey.id)} className="delete-btn">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyPage;
