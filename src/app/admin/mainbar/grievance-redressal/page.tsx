'use client';
import { useState, useEffect } from 'react';
import './ComplaintPage.css';

interface Complaint {
  id: string;
  phone_ne: string;
  name: string;
  problem: string;
  createdAt: Date;
  completed?: boolean;
}

const LOCAL_STORAGE_KEY = 'completedComplaints';

const ComplaintPage = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Load completed complaint IDs from localStorage safely
  const getCompletedFromLocalStorage = (): string[] => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    }
    return [];
  };

  // Save completed complaint IDs to localStorage safely
  const saveCompletedToLocalStorage = (completedIds: string[]) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(completedIds));
      } catch {
        // silently ignore
      }
    }
  };

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch('https://goverment-website-backend.onrender.com/complaints');
        if (!res.ok) throw new Error('Failed to fetch complaints data');
        const data: Complaint[] = await res.json();

        const completedIds = getCompletedFromLocalStorage();

        const updatedData = data.map(c => ({
          ...c,
          completed: completedIds.includes(c.id),
        }));

        setComplaints(updatedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching complaints');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this complaint?');
    if (!confirmed) return;

    try {
      const res = await fetch(`https://goverment-website-backend.onrender.com/complaints/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete complaint');

      setComplaints(prev => prev.filter(c => c.id !== id));

      const updatedCompleted = getCompletedFromLocalStorage().filter(cid => cid !== id);
      saveCompletedToLocalStorage(updatedCompleted);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const handleComplete = (id: string) => {
    setComplaints(prev =>
      prev.map(c => (c.id === id ? { ...c, completed: true } : c))
    );

    const completedIds = getCompletedFromLocalStorage();
    if (!completedIds.includes(id)) {
      completedIds.push(id);
      saveCompletedToLocalStorage(completedIds);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1>Complaints</h1>
      <ul>
        {complaints.map((complaint) => (
          <li key={complaint.id} className={complaint.completed ? 'completed' : ''}>
            <h3>
              <strong>Name: </strong>
              {complaint.name}
            </h3>
            <p>
              <strong>Problem: </strong>
              {complaint.problem}
            </p>
            <small>Phone: {complaint.phone_ne}</small>
            <br />
            <small>Created At: {new Date(complaint.createdAt).toLocaleString()}</small>
            <br />

            {!complaint.completed ? (
              <button onClick={() => handleComplete(complaint.id)}>Mark as Completed</button>
            ) : (
              <span className="completed-label">✅ Completed</span>
            )}

            <button onClick={() => handleDelete(complaint.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComplaintPage;
