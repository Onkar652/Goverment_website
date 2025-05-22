'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const [data, setData] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Access localStorage only in useEffect (client-side)
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      router.push('/admin/login');
    } else {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetch('https://goverment-website-backend.onrender.com/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(setData)
        .catch((err) => console.error(err));
    }
  }, [token]);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>{data.message}</p>
    </div>
  );
};

export default AdminDashboard;
