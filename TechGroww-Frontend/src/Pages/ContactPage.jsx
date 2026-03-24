import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

export function ContactPage() {
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Too short')
      .max(50, 'Too long')
      .required('Full name is required'),

    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),

    phone: Yup.string()
      .matches(/^[0-9+\-\s()]*$/, 'Invalid phone number')
      .max(15, 'Too long'),

    subject: Yup.string()
      .min(5, 'Too short')
      .max(100, 'Too long')
      .required('Subject is required'),

    message: Yup.string()
      .min(10, 'Message too short')
      .max(1000, 'Message too long')
      .required('Message is required'),
  });

  // ✅ Formik Setup with API Call
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setSubmitStatus({ type: '', message: '' });
      
      try {
        console.log('Submitting form data:', values);
        
        const response = await fetch(`${API_URL}/api/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        
        if (response.ok) {
          console.log('Form submitted successfully:', data);
          setSubmitStatus({ 
            type: 'success', 
            message: 'Message sent successfully! We will get back to you soon.' 
          });
          resetForm();
        } else {
          console.error('Server error:', data);
          setSubmitStatus({ 
            type: 'error', 
            message: data.error || 'Failed to send message. Please try again.' 
          });
        }
      } catch (error) {
        console.error('Network error:', error);
        setSubmitStatus({ 
          type: 'error', 
          message: 'Network error. Please check your connection and try again.' 
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-[#0A0F1E]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Get in Touch
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#94A3B8] max-w-2xl mx-auto">
            Ready to start your next project? Let's talk about how we can help your business grow.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-20 bg-[#0F172A] pt-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* 🔥 FORM */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="bg-[#1A1F2E] rounded-2xl p-8 border border-[#1E293B] shadow-lg">

              <h2 className="text-2xl font-bold text-white mb-6">
                Send us a message
              </h2>

              {/* Status Message */}
              {submitStatus.message && (
                <div className={`mb-4 p-3 rounded-lg text-sm ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500' 
                    : 'bg-red-500/20 text-red-400 border border-red-500'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={formik.handleSubmit} className="space-y-6">

                {/* Name */}
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    {...formik.getFieldProps('name')}
                    className="w-full px-4 py-3 rounded-lg bg-[#0F172A] border border-[#1E293B] text-white focus:ring-2 focus:ring-[#00D4FF] outline-none"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-red-400 text-sm mt-1">{formik.errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    {...formik.getFieldProps('email')}
                    className="w-full px-4 py-3 rounded-lg bg-[#0F172A] border border-[#1E293B] text-white focus:ring-2 focus:ring-[#00D4FF] outline-none"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-400 text-sm mt-1">{formik.errors.email}</p>
                  )}
                </div>

                {/* Phone (Optional) */}
                <div>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number (Optional)"
                    {...formik.getFieldProps('phone')}
                    className="w-full px-4 py-3 rounded-lg bg-[#0F172A] border border-[#1E293B] text-white focus:ring-2 focus:ring-[#00D4FF] outline-none"
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="text-red-400 text-sm mt-1">{formik.errors.phone}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    {...formik.getFieldProps('subject')}
                    className="w-full px-4 py-3 rounded-lg bg-[#0F172A] border border-[#1E293B] text-white focus:ring-2 focus:ring-[#00D4FF] outline-none"
                  />
                  {formik.touched.subject && formik.errors.subject && (
                    <p className="text-red-400 text-sm mt-1">{formik.errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    rows={6}
                    placeholder="Tell us about your project..."
                    {...formik.getFieldProps('message')}
                    className="w-full px-4 py-3 rounded-lg bg-[#0F172A] border border-[#1E293B] text-white resize-none focus:ring-2 focus:ring-[#00D4FF] outline-none"
                  />
                  {formik.touched.message && formik.errors.message && (
                    <p className="text-red-400 text-sm mt-1">{formik.errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-full h-12 bg-[#00D4FF] text-[#0A0F1E] rounded-lg font-medium hover:scale-105 transition disabled:opacity-50"
                >
                  {formik.isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

              </form>
            </motion.div>

            {/* 🔥 CONTACT INFO */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="space-y-8">

              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                <p className="text-[#94A3B8] mb-8">
                  We're here to help and answer any questions you might have.
                </p>
              </div>

              <div className="space-y-6">

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#00D4FF]/10 flex items-center justify-center rounded-lg">
                    <Mail className="text-[#00D4FF]" />
                  </div>
                  <div>
                    <p className="text-white font-bold">Email</p>
                    <a href="mailto:info@techgroww.dev" className="text-[#94A3B8] hover:text-[#00D4FF] transition-colors">
                      info@techgroww.dev
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#00D4FF]/10 flex items-center justify-center rounded-lg">
                    <Phone className="text-[#00D4FF]" />
                  </div>
                  <div>
                    <p className="text-white font-bold">Phone</p>
                    <a href="tel:+919350639255" className="text-[#94A3B8] hover:text-[#00D4FF] transition-colors">
                      (+91) 93506-39255
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#00D4FF]/10 flex items-center justify-center rounded-lg">
                    <MapPin className="text-[#00D4FF]" />
                  </div>
                  <div>
                    <p className="text-white font-bold">Office</p>
                    <p className="text-[#94A3B8]">Sector 63, Noida - 201301, Uttar Pradesh, India</p>
                  </div>
                </div>

              </div>

              {/* Map */}
              <div className="aspect-video bg-linear-to-br from-[#0A1F44] to-[#00D4FF] rounded-xl flex items-center justify-center">
                <MapPin className="w-16 h-16 text-white/30" />
              </div>

            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}