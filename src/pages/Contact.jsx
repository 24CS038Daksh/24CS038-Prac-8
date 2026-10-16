import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: 'Daksh Karangiya',
    studentId: '24CS038',
    email: '24cs038@charusat.edu.in',
    subject: 'Practical 8 Evaluation Inquiry',
    message: 'Testing route-based lazy loading chunk Contact.chunk.js with minimum-delay fallback.'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page-container">
      <div className="card">
        <div className="card-header">
          <div>
            <h2>Contact &amp; Student Information Form</h2>
            <p className="subtitle">
              Lazy Loaded Component (<code>Contact.chunk.js</code> ~12 KB) | Student ID: <strong>24CS038</strong>
            </p>
          </div>
          <span className="badge-pill lazy">Contact Chunk Active</span>
        </div>

        {submitted ? (
          <div className="alert-success">
            <h4>Inquiry Received Successfully!</h4>
            <p>Thank you, <strong>{formData.name}</strong> (Roll: <strong>{formData.studentId}</strong>). Your submission was logged.</p>
            <button className="btn btn-outline btn-sm" onClick={() => setSubmitted(false)}>Send Another Message</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-col">
                <label>Student Name:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-text"
                  required
                />
              </div>
              <div className="form-col">
                <label>Student ID / Roll No:</label>
                <input
                  type="text"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  className="input-text"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-col">
                <label>Email Address:</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-text"
                  required
                />
              </div>
              <div className="form-col">
                <label>Subject:</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="input-text"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Message / Notes on Code Splitting:</label>
              <textarea
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="input-textarea"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">Submit Form</button>
          </form>
        )}
      </div>
    </div>
  );
}
