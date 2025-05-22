'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const [data, setData] = useState<any>(null);
  const router = useRouter();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      router.push('/admin/login');
    } else {
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
