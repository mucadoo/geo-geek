'use client';

import Header from '@/components/Header';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

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

    if (Object.values(newErrors).some((v) => v)) {
      alert('Please fill out all fields.');
      return;
    }

    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  const inputClasses = (hasError: boolean) => `
    w-full bg-white/50 backdrop-blur-sm border-2 rounded-xl h-[48px] px-4
    transition-all duration-300 font-space text-[14px] outline-none text-gray-700
    ${hasError 
      ? 'border-danger focus:ring-4 focus:ring-danger/20 bg-red-50/50' 
      : 'border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/20 hover:border-gray-300'}
  `;

  return (
    <div className="container-custom">
      <Header />
      <main className="animate-in fade-in duration-1000 mt-10">
        <h2 className="title">Contact us</h2>
        <section className="mx-auto max-w-[540px] card">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-6">
              <label htmlFor="contact_name" className="block text-[#1c2e36] text-[15px] font-bold font-oswald uppercase tracking-wider mb-2">
                Name:
              </label>
              <input type="text" id="contact_name" name="name" placeholder="John Doe" className={inputClasses(errors.name)} value={formData.name} onChange={handleChange} onBlur={handleBlur} />
            </div>

            <div className="mb-6">
              <label htmlFor="contact_email" className="block text-[#1c2e36] text-[15px] font-bold font-oswald uppercase tracking-wider mb-2">
                Email:
              </label>
              <input type="email" id="contact_email" name="email" placeholder="john@example.com" className={inputClasses(errors.email)} value={formData.email} onChange={handleChange} onBlur={handleBlur} />
            </div>

            <div className="mb-8">
              <label htmlFor="contact_message" className="block text-[#1c2e36] text-[15px] font-bold font-oswald uppercase tracking-wider mb-2">
                Message:
              </label>
              <textarea id="contact_message" name="message" placeholder="How can we help?" className={`${inputClasses(errors.message)} h-auto min-h-[140px] py-4 leading-relaxed`} value={formData.message} onChange={handleChange} onBlur={handleBlur} />
            </div>

            <div className="text-center">
              <button type="submit" className="btn-primary w-full shadow-lg">Send Message</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
