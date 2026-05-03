'use client';

import Header from '@/components/Header';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: false, email: false, message: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value !== '') setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (value === '') setErrors((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { name: formData.name === '', email: formData.email === '', message: formData.message === '' };
    setErrors(newErrors);

    if (Object.values(newErrors).some((v) => v)) return;
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container-custom flex-grow animate-in fade-in duration-1000 mt-10 flex flex-col items-center">
        <h1 className="text-[36px] font-medium text-[#2c3e50] tracking-tight mb-12">Get in touch</h1>
        
        <form onSubmit={handleSubmit} noValidate className="w-full max-w-[500px] bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100">
          <div className="mb-6">
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              className={`pill-input ${errors.name ? '!border-danger bg-red-50/30' : ''}`} 
              value={formData.name} onChange={handleChange} onBlur={handleBlur} 
            />
          </div>

          <div className="mb-6">
            <input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              className={`pill-input ${errors.email ? '!border-danger bg-red-50/30' : ''}`} 
              value={formData.email} onChange={handleChange} onBlur={handleBlur} 
            />
          </div>

          <div className="mb-8">
            <textarea 
              name="message" 
              placeholder="Your Message" 
              className={`pill-input h-auto min-h-[140px] py-4 rounded-[25px] resize-none ${errors.message ? '!border-danger bg-red-50/30' : ''}`} 
              value={formData.message} onChange={handleChange} onBlur={handleBlur} 
            />
          </div>

          <button type="submit" className="btn-primary w-full h-[50px] text-[15px]">
            SEND MESSAGE
          </button>
        </form>
      </main>
    </div>
  );
}
