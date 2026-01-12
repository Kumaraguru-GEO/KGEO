import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Globe, Users, BookOpen, Briefcase, GraduationCap, Video, CheckCircle2 } from 'lucide-react';
import heroImage1 from '../../assets/images/global-faculty-main.jpg';
import heroImage2 from '../../assets/images/overview.jpg';

type FormStatus = { type: 'idle' | 'loading' | 'success' | 'error'; message?: string; };

interface FormData {
  name: string;
  email: string;
  institution: string;
  country: string;
  expertise: string;
  engagement: string[];
  message: string;
}

export default function GlobalFaculty() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    institution: '',
    country: '',
    expertise: '',
    engagement: [],
    message: ''
  });

  const [formStatus, setFormStatus] = useState<FormStatus>({ type: 'idle' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      engagement: checked
        ? [...prev.engagement, id]
        : prev.engagement.filter(item => item !== id)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ type: 'loading', message: 'Sending your inquiry...' });

    try {
      const response = await fetch('/api/global-faculty-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: 'Thank you! Your inquiry has been received. We will contact you within 24-48 hours.'
        });

        setFormData({
          name: '',
          email: '',
          institution: '',
          country: '',
          expertise: '',
          engagement: [],
          message: ''
        });

        setTimeout(() => setFormStatus({ type: 'idle' }), 5000);
      } else {
        setFormStatus({
          type: 'error',
          message: data.message || 'Failed to submit. Please try again.'
        });
      }
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: heroImage1,
      title: 'Global Faculty Network',
      subtitle: 'Shape the Future of Global Education'
    },
    {
      image: heroImage2,
      title: 'Join Our Globally\nNetworked Campus',
      subtitle: ''
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const engagementOptions = [
    {
      id: 'masterclass',
      title: 'Online Masterclasses',
      duration: '1-2 Hours',
      description: 'Short, high-impact online lectures or workshops where global faculty deliver cutting-edge knowledge.',
      features: ['Conducted via Zoom / MS Teams', 'Integrated into seminars or courses', 'Audience: undergraduate/graduate students']
    },
    {
      id: 'virtual',
      title: 'Virtual Teaching',
      duration: 'Part of a Module',
      description: 'Global faculty virtually teach selected lectures or units within an existing Kumaraguru course.',
      features: ['3-6 sessions per course', 'Synchronous or asynchronous delivery', 'Credits within KI program']
    },
    {
      id: 'coil',
      title: 'COIL Program',
      duration: '4-8 Weeks',
      description: 'Collaborative Online International Learning connecting students from both institutions.',
      features: ['Co-designed course modules', 'Collaborative projects & discussions', '10+ disciplines involved']
    },
    {
      id: 'visiting',
      title: 'Visiting Faculty',
      duration: '1-4 Weeks',
      description: 'Faculty spend time on campus delivering block teaching intensive modules.',
      features: ['8-20 hours of lectures/workshops', 'In-person engagement', 'Guest seminars & mentoring']
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <style>{`
        .scroll-section {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .scroll-section.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* Hero Section with Carousel */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
            </div>
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/40 w-2'
              }`}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-6 px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-white font-semibold text-sm tracking-wider uppercase">
                🌍 Global Faculty Network
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {currentSlide === 0 ? 'Shape the Future of Global Education' : 'Join Our Globally\nNetworked Campus'}
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-8 max-w-3xl mx-auto">
              Collaborate with Kumaraguru Institutions through flexible teaching partnerships that create global impact.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl font-semibold"
              >
                Explore Opportunities
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/40 rounded-full hover:bg-white/20 transition-all font-semibold"
              >
                Get in Touch
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-6 py-2 rounded-full mb-4 border-2" style={{ backgroundColor: 'rgb(33, 47, 70)', borderColor: 'rgb(33, 47, 70)' }}>
              <span className="font-bold text-sm tracking-wide uppercase" style={{ color: '#ffffff' }}>🌍 Global Faculty Network</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">Build Meaningful Partnerships</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Six flexible engagement models designed to match your expertise, availability, and impact goals
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border-2 mb-16" style={{ borderColor: 'rgb(33, 47, 70)' }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundImage: 'linear-gradient(135deg, rgb(33, 47, 70), #228be6)' }}>
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900">Global Faculty Network</h3>
                </div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Kumaraguru Institutions is committed to creating a globally networked campus where ideas, expertise, and innovation cross borders. Each year, we invite distinguished academics and professionals from around the world to collaborate through teaching, mentoring, and knowledge-sharing.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-6 rounded-2xl shadow-lg text-white text-center" style={{ backgroundImage: 'linear-gradient(135deg, rgb(33, 47, 70), #228be6)' }}>
                    <div className="text-3xl sm:text-4xl font-black mb-1">120+</div>
                    <p className="text-xs">Global Faculty</p>
                  </div>
                  <div className="p-6 rounded-2xl shadow-lg text-white text-center" style={{ backgroundImage: 'linear-gradient(135deg, rgb(33, 47, 70), #1a3a52)' }}>
                    <div className="text-3xl sm:text-4xl font-black mb-1">5+</div>
                    <p className="text-xs">Years Active</p>
                  </div>
                  <div className="p-6 rounded-2xl shadow-lg text-white text-center" style={{ backgroundImage: 'linear-gradient(135deg, rgb(33, 47, 70), #228be6)' }}>
                    <div className="text-3xl sm:text-4xl font-black mb-1">1K+</div>
                    <p className="text-xs">Students Impact</p>
                  </div>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-2xl overflow-hidden shadow-2xl"
              >
                <img 
                  src={heroImage2}
                  alt="Global Faculty Overview" 
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Engagement Options */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-6 py-2 rounded-full mb-4 border-2" style={{ backgroundColor: 'rgb(33, 47, 70)', borderColor: 'rgb(33, 47, 70)' }}>
              <span className="font-bold text-sm tracking-wide uppercase" style={{ color: '#ffffff' }}>🤝 Engagement Models</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">Choose Your Engagement</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From short workshops to full-semester courses, find the right fit for your schedule and expertise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {engagementOptions.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 border-2" style={{ borderColor: 'rgb(33, 47, 70)' }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundImage: 'linear-gradient(135deg, rgb(33, 47, 70), #228be6)' }}>
                    {option.id === 'masterclass' && <Video className="w-6 h-6 text-white" />}
                    {option.id === 'virtual' && <BookOpen className="w-6 h-6 text-white" />}
                    {option.id === 'coil' && <Users className="w-6 h-6 text-white" />}
                    {option.id === 'visiting' && <Briefcase className="w-6 h-6 text-white" />}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900">{option.title}</h3>
                    <p className="font-semibold mt-1" style={{ color: 'rgb(33, 47, 70)' }}>{option.duration}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">{option.description}</p>
                <ul className="space-y-3 mb-6">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'rgb(33, 47, 70)' }}></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={scrollToContact}
                  className="w-full text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
                  style={{ backgroundImage: 'linear-gradient(90deg, rgb(33, 47, 70), #228be6)' }}
                >
                  Learn More
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Partner */}
      <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-12 text-white shadow-2xl"
            style={{ backgroundImage: 'linear-gradient(90deg, rgb(33, 47, 70), #228be6, rgb(33, 47, 70))' }}
          >
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl sm:text-5xl font-black mb-4">How to Partner With Us</h2>
              <p className="text-lg text-white/90 mb-12">Simple, streamlined process to start your collaboration</p>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { num: '1', title: 'Explore', desc: 'Choose the engagement type that matches your expertise.' },
                  { num: '2', title: 'Submit', desc: 'Fill out our Expression of Interest form.' },
                  { num: '3', title: 'Connect', desc: 'Our team will reach out to discuss next steps.' }
                ].map((step, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -10 }}
                    className="p-8 rounded-2xl transition-all"
                    style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-2xl mx-auto mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}>
                      {step.num}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-white/90">{step.desc}</p>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToContact}
                className="mt-12 bg-white text-gray-900 hover:bg-gray-100 px-10 py-4 rounded-full font-black text-lg shadow-xl transition-all"
              >
                Submit Expression of Interest
              </motion.button>
            </div>
          </motion.section>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white" id="contact">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-6 py-2 rounded-full mb-4 border-2" style={{ backgroundColor: 'rgb(33, 47, 70)', borderColor: 'rgb(33, 47, 70)' }}>
              <span className="font-bold text-sm tracking-wide uppercase" style={{ color: '#ffffff' }}>✉️ Get Started</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">Expression of Interest</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to shape the future of global education? Share your details and we'll connect with you.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 border-2" style={{ borderColor: 'rgb(33, 47, 70)' }}
          >
            {formStatus.type !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-lg ${
                  formStatus.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : formStatus.type === 'error'
                    ? 'bg-red-50 text-red-800 border border-red-200'
                    : 'bg-blue-50 text-blue-800 border border-blue-200'
                }`}
              >
                {formStatus.message}
              </motion.div>
            )}

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">Full Name *</label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gray-600 focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">Email *</label>
                <Input
                  type="email"
                  id="email"
                  placeholder="your.email@institution.edu"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gray-600 focus:ring-2 focus:ring-gray-200"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="institution" className="block text-sm font-bold text-gray-900 mb-2">Institution *</label>
                <Input
                  type="text"
                  id="institution"
                  placeholder="Your institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gray-600 focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-bold text-gray-900 mb-2">Country *</label>
                <Input
                  type="text"
                  id="country"
                  placeholder="Your country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gray-600 focus:ring-2 focus:ring-gray-200"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="expertise" className="block text-sm font-bold text-gray-900 mb-2">Area of Expertise *</label>
              <Input
                type="text"
                id="expertise"
                placeholder="Your field of expertise"
                value={formData.expertise}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gray-600 focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-900 mb-3">Type of Engagement (Select all that apply) *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-6 rounded-xl" style={{ backgroundColor: 'rgba(33, 47, 70, 0.05)' }}>
                {['masterclass', 'virtual', 'coil', 'visiting'].map((type) => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      id={type}
                      checked={formData.engagement.includes(type)}
                      onChange={handleCheckboxChange}
                      className="w-5 h-5 rounded cursor-pointer"
                      style={{ accentColor: 'rgb(33, 47, 70)' }}
                    />
                    <span className="font-medium text-gray-700">
                      {type === 'masterclass' && 'Online Masterclass'}
                      {type === 'virtual' && 'Virtual Teaching'}
                      {type === 'coil' && 'COIL Program'}
                      {type === 'visiting' && 'Visiting Faculty'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2">Your Message *</label>
              <Textarea
                id="message"
                placeholder="Tell us about your interest in collaborating with us..."
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gray-600 focus:ring-2 focus:ring-gray-200 min-h-[140px]"
              />
            </div>

            <motion.button
              type="submit"
              disabled={formStatus.type === 'loading'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ backgroundImage: 'linear-gradient(90deg, rgb(33, 47, 70), #228be6)' }}
            >
              {formStatus.type === 'loading' ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
