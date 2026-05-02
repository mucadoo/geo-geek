'use client';

import Header from '@/components/Header';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value !== '') {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (value === '') {
      setErrors((prev) => ({ ...prev, [name]: true }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      name: formData.name === '',
      email: formData.email === '',
      message: formData.message === '',
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((v) => v)) {
      alert('Preencha todos os campos do formulário antes de submeter');
      return;
    }

    alert('Message sent (simulated)');
    setFormData({ name: '', email: '', message: '' });
  };

  const inputClasses = (hasError: boolean) => `
    w-full bg-white border rounded-[3px] shadow-inner h-[36px] px-[10px] 
    transition-all duration-500 font-raleway text-[13px] outline-none
    ${hasError 
      ? 'border-[#c92e2a] shadow-[inset_0_1px_1px_rgba(0,0,0,0.15),0_0_8px_rgba(201,46,42,0.7)]' 
      : 'border-[#bbb] focus:border-[#6baced] focus:shadow-[inset_0_1px_1px_rgba(0,0,0,0.15),0_0_8px_rgba(82,168,236,0.7)]'}
  `;

  return (
    <div className="container mx-auto">
      <Header />
      <main className="animate-in fade-in duration-1000">
        <h2 className="title">Contact us</h2>
        <section className="mx-auto w-[460px]">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label htmlFor="contact_name" className="block text-[#333] text-[15px] tracking-wider mb-[5px] font-raleway">
                Name:
              </label>
              <input
                type="text"
                id="contact_name"
                name="name"
                placeholder="Insert your name"
                className={inputClasses(errors.name)}
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="contact_email" className="block text-[#333] text-[15px] tracking-wider mb-[5px] font-raleway">
                Email:
              </label>
              <input
                type="email"
                id="contact_email"
                name="email"
                placeholder="Insert your email"
                className={inputClasses(errors.email)}
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="contact_message" className="block text-[#333] text-[15px] tracking-wider mb-[5px] font-raleway">
                Message:
              </label>
              <textarea
                id="contact_message"
                name="message"
                placeholder="Insert your message"
                className={`${inputClasses(errors.message)} h-auto min-h-[140px] py-[10px] leading-[20px]`}
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <div className="mt-[15px] text-left">
              <button
                type="submit"
                className="inline-block px-[10px] py-[4px] text-[14px] leading-[20px] text-center align-middle cursor-pointer rounded-[4px] border border-black/10 text-white shadow-inner bg-[#49afcd] bg-gradient-to-b from-[#4e9bdf] to-[#3e7cb3] hover:bg-[#3e7cb3] transition-all duration-100"
              >
                Send
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
