'use client';
import { useState, useEffect } from 'react';
import './ease-of-living.css';

export default function EaseOfLiving() {
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchFiles = async () => {
      const res = await fetch('https://goverment-website-backend.onrender.com/files');
      const data = await res.json();
      setFiles(data);
    };
    fetchFiles();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', fileName);
    formData.append('description', description);

    setIsUploading(true);

    const res = await fetch('https://goverment-website-backend.onrender.com/files', {
      method: 'POST',
      body: formData,
    });

    setIsUploading(false);

    if (res.ok) {
      const newFile = await res.json();
      setFiles([...files, newFile]);
      setFile(null);
      setFileName('');
      setDescription('');
    } else {
      alert('Error adding file');
    }
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`https://goverment-website-backend.onrender.com/files/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setFiles(files.filter((file) => file.id !== id));
    } else {
      alert('Error deleting file');
    }
  };

  return (
    <div className="ease-of-living-container">
      <h1 className="page-title">Ease of Living</h1>
      <p className="intro-text">Welcome to the Ease of Living page!</p>

      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="file" className="label">Select File</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="fileName" className="label">File Name</label>
          <input
            type="text"
            id="fileName"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="label">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field"
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isUploading}>
          {isUploading ? (
            <div className="spinner"></div>
          ) : (
            'Add File'
          )}
        </button>
      </form>

      <div className="files-list">
        <h2 className="uploaded-files-title">Uploaded Files</h2>
        <ul>
          {files.map((file) => (
            <li key={file.id} className="file-item">
              <div>
                <h3 className="file-name">{file.name}</h3>
                <p className="file-description">{file.description}</p>
                <p className="file-details">{`File Path: ${file.file_path}`}</p>
                <p className="file-details">{`Size: ${file.file_size} bytes`}</p>
                <p className="file-details">{`Type: ${file.file_type}`}</p>
                <p className="file-details">{`Uploaded At: ${new Date(file.uploaded_at).toLocaleString()}`}</p>
              </div>
              <button
                onClick={() => handleDelete(file.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
