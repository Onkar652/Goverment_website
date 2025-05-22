'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './ease-of-living.css';

interface FileData {
  id: number;
  name: string;
  description: string;
  file_path: string;
  filepublic_url: string; 
}

const FileDetail = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('https://goverment-website-backend.onrender.com/files')
      .then(res => res.json())
      .then(data => setFiles(data.reverse()))
      .catch(err => console.error('Error fetching files:', err));
  }, []);

const handleDownload = (file: FileData) => {
  const link = document.createElement('a');
  link.href = file.filepublic_url; // ✅ Use the public URL for Firebase Storage
  link.download = file.name;       // You can keep this to suggest a filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  if (files.length === 0) return <p>Loading...</p>;

  return (
    <div className="gov-container">
      <div className="logo-wrapper">
        <img src="/logo.jpg" alt="Government Logo" className="gov-logo" />
      </div>
      <h1>Scheme Documents</h1>
      <div className="table-box">
        <table className="gov-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {files.map(file => (
              <tr key={file.id}>
                <td>
                  <strong>{file.name}</strong>
                  <br />
                  <span className="description-text">{file.description}</span>
                </td>
                <td>
                  <button onClick={() => handleDownload(file)}>Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="back-button" onClick={() => router.back()}>
        Back
      </button>
    </div>
  );
};

export default FileDetail;
