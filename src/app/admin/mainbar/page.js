'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import './admin.css';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token'); // access_token is saved as 'token'
    if (!token) {
      router.push('/admin/login'); // redirect to login if not logged in
    }
  }, [router]);

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="admin-grid">
        <Link href="/admin/mainbar/ease-of-living">
          <div className="admin-card ease-of-living">
            <h2 className="card-title">सुकर जीवनमान</h2>
            <p className="card-description">Information on ease of living schemes.</p>
          </div>
        </Link>

        <Link href="/admin/mainbar/cleanliness">
          <div className="admin-card cleanliness">
            <h2 className="card-title">स्वच्छता</h2>
            <p className="card-description">Details about cleanliness initiatives.</p>
          </div>
        </Link>

        <Link href="/admin/mainbar/grievance-redressal">
          <div className="admin-card grievance-redressal">
            <h2 className="card-title">तक्रार निवारण</h2>
            <p className="card-description">Grievance redressal mechanisms and procedures.</p>
          </div>
        </Link>

        <Link href="/admin/mainbar/office-amenities">
          <div className="admin-card office-amenities">
            <h2 className="card-title">कार्यालयीन सोई सुविधा</h2>
            <p className="card-description">Details of office amenities and facilities.</p>
          </div>
        </Link>

        <Link href="/admin/mainbar/visits">
          <div className="admin-card visits">
            <h2 className="card-title">क्षेत्रीय कार्यालयांना भेटी</h2>
            <p className="card-description">Regional office visits and information.</p>
          </div>
        </Link>

        <Link href="/e-office">
          <div className="admin-card e-office">
            <h2 className="card-title">ई-ऑफिस प्रणाली</h2>
            <p className="card-description">Overview of the e-office system.</p>
          </div>
        </Link>

        <Link href="/admin/mainbar/investment-promotion">
          <div className="admin-card investment-promotion">
            <h2 className="card-title">गुंतवणूक प्रोत्साहन</h2>
            <p className="card-description">Information on investment promotion schemes.</p>
          </div>
        </Link>

        <Link href="/admin/mainbar/innovative-initiatives">
          <div className="admin-card innovative-initiatives">
            <h2 className="card-title">नाविन्यपूर्ण उपक्रम</h2>
            <p className="card-description">Details about innovative initiatives.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
