'use client';
import { useState, useEffect } from 'react';
import './ComplaintForm.css';

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    phone_ne: '',
    name: '',
    problem: '',
  });

  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [justSubmitted, setJustSubmitted] = useState(false);

  useEffect(() => {
    const savedId = localStorage.getItem('complaint_id');
    if (savedId) {
      setSubmittedId(savedId);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submittedId) {
      setMessage('You have already submitted a complaint.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData }),
      });

      if (!res.ok) throw new Error('Submission failed');

      const result = await res.json();
      if (result.id) {
        localStorage.setItem('complaint_id', result.id);
        setSubmittedId(result.id);
        setMessage('Complaint submitted successfully!');
        setJustSubmitted(true);
      } else {
        setMessage('Submission failed: No ID returned');
      }
    } catch (error) {
      setMessage('Error submitting complaint.');
    }
  };

  const handleNewComplaint = () => {
    localStorage.removeItem('complaint_id');
    setSubmittedId(null);
    setMessage('');
    setJustSubmitted(false);
    setFormData({
      phone_ne: '',
      name: '',
      problem: '',
    });
  };

  return (
    <div className="complaint-container">
      <h2>Submit a Complaint</h2>

      {submittedId && !justSubmitted ? (
        <div className="submitted-message">
          <p className="info">
            You have already submitted a complaint. ID: {submittedId}
          </p>
          <button className="submit-another-btn" onClick={handleNewComplaint}>
            Submit Another Complaint
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="complaint-form">
          <label>
            Phone Number:
            <input
              type="text"
              name="phone_ne"
              value={formData.phone_ne}
              maxLength={10}
              pattern="\d{10}"
              required
              onChange={handleChange}
            />
          </label>

          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              maxLength={100}
              required
              onChange={handleChange}
            />
          </label>

          <label>
            Problem:
            <textarea
              name="problem"
              value={formData.problem}
              required
              onChange={handleChange}
            ></textarea>
          </label>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      )}

      {justSubmitted && message && (
        <div>
          <p className="message">{message}</p>
          <button className="submit-another-btn" onClick={handleNewComplaint}>
            Submit Another Complaint
          </button>
        </div>
      )}

      {/* Back Button */}
      <button className="back-button" onClick={() => window.location.href = '/'}>
        ← Back
      </button>
    </div>
  );
};

export default ComplaintForm;
