import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Globe, Users, BookOpen, Briefcase, GraduationCap, Video } from 'lucide-react';
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

  return (
    <div className="bg-white overflow-x-hidden">
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
        .hero-title {
          font-size: clamp(32px, 7vw, 80px);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.01em;
          color: white;
          text-shadow: 0px 4px 30px rgba(0, 0, 0, 0.9), 0px 2px 10px rgba(0, 0, 0, 1);
          margin: 0 auto;
          max-width: 1400px;
        }
        @media (max-width: 640px) {
          .hero-title {
            font-size: clamp(28px, 8vw, 40px);
            line-height: 1.3;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }
      `}</style>
      
      {/* Hero Section - HomePage Style Carousel */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Slider Container */}
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
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/40"></div>
            </div>
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/40 hover:bg-white/60 w-2'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen py-20">
          <div className="max-w-7xl mx-auto text-center">
            <div className="animate-fadeInUp">
              {currentSlide === 0 ? (
                <>
                  <div className="inline-block mb-6 px-6 py-2 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40">
                    <span className="text-white font-semibold text-sm tracking-widest uppercase">
                      🌍 Global Faculty Network
                    </span>
                  </div>
                  <h1 className="hero-title mb-6">{slides[0].subtitle}</h1>
                  <p className="text-white text-xl sm:text-2xl lg:text-3xl font-light mb-10 max-w-4xl mx-auto">
                    Collaborate with Kumaraguru Institutions to shape the future of education and research through international teaching partnerships
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <button
                      onClick={scrollToContact}
                      className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-md text-white border-2 border-white/40 rounded-full hover:bg-white/30 transition-all transform hover:scale-105 shadow-xl"
                      style={{ fontSize: '18px', fontWeight: '600' }}
                    >
                      Explore Opportunities
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={scrollToContact}
                      className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black border-2 border-white rounded-full hover:bg-white/90 transition-all transform hover:scale-105 shadow-xl"
                      style={{ fontSize: '18px', fontWeight: '600' }}
                    >
                      Get in Touch
                    </button>
                  </div>
                </>
              ) : (
                <div className="hero-title">
                  <div className="block">Join Our Globally</div>
                  <div className="block">Networked Campus</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="bg-gradient-to-b from-white via-slate-50 to-white py-20" id="engagement">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-6 py-2 rounded-full mb-4 border-2" style={{ backgroundColor: 'rgb(33, 47, 70)', borderColor: 'rgb(33, 47, 70)' }}>
              <span className="font-bold text-sm tracking-wide uppercase" style={{ color: '#ffffff' }}>🌍 Engagement Options</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">Choose Your Path</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Six flexible engagement models designed to match your expertise, availability, and impact goals
            </p>
          </motion.div>

          {/* Overview Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 mb-16 scroll-section"
          >
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundImage: 'linear-gradient(135deg, rgb(33, 47, 70), #228be6)' }}>
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900">Global Faculty Network</h3>
                </div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Kumaraguru Institutions (KI) is committed to creating a globally networked campus where ideas, expertise, and innovation cross borders. Each year, we invite distinguished academics, researchers, and professionals from around the world to collaborate with us through teaching, mentoring, and knowledge-sharing engagements.
                </p>
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="p-6 rounded-2xl shadow-lg text-white text-center hover:shadow-2xl transition-all" style={{ backgroundImage: 'linear-gradient(135deg, rgb(33, 47, 70), #228be6)' }}>
                    <div className="text-3xl sm:text-4xl font-black mb-1">120+</div>
                    <h4 className="text-sm font-bold mb-1">Faculty</h4>
                    <p className="text-xs text-white/90">From 30+ countries</p>
                  </div>
                  <div className="p-6 rounded-2xl shadow-lg text-white text-center hover:shadow-2xl transition-all" style={{ backgroundImage: 'linear-gradient(135deg, rgb(33, 47, 70), #1a3a52)' }}>
                    <div className="text-3xl sm:text-4xl font-black mb-1">5</div>
                    <h4 className="text-sm font-bold mb-1">Years</h4>
                    <p className="text-xs text-white/90">Collaborations</p>
                  </div>
                  <div className="p-6 rounded-2xl shadow-lg text-white text-center hover:shadow-2xl transition-all" style={{ backgroundImage: 'linear-gradient(135deg, rgb(33, 47, 70), #228be6)' }}>
                    <div className="text-3xl sm:text-4xl font-black mb-1">1000+</div>
                    <h4 className="text-sm font-bold mb-1">Students</h4>
                    <p className="text-xs text-white/90">Impacted</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img 
                  src="/src/assets/images/overview.jpg" 
                  alt="Global Faculty Overview" 
                  className="w-full h-auto object-cover rounded-2xl shadow-2xl border-4 border-blue-100"
                />
              </div>
            </div>
          </motion.div>

          {/* Engagement Options Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Masterclass Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all p-8 scroll-section border-2 border-blue-50"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundImage: 'linear-gradient(135deg, rgb(33, 47, 70), #228be6)' }}>
                  <Video className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">Online Masterclasses</h3>
              </div>
              <p className="font-semibold mb-3" style={{ color: 'rgb(33, 47, 70)' }}>1-2 Hours</p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Short, high-impact online lectures or workshops where global faculty deliver cutting-edge knowledge in their area of expertise — typically 60-120 minutes.
              </p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    How It Works
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 ml-4">
                    <li>• Conducted via Zoom / MS Teams</li>
                    <li>• Integrated into department seminars, clubs, or course enrichment</li>
                    <li>• Audience: undergraduate/graduate students + faculty</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl border-l-4 mb-6" style={{ backgroundColor: 'rgba(33, 47, 70, 0.05)', borderLeftColor: 'rgb(33, 47, 70)' }}>
                <p className="text-sm italic text-gray-700">"My masterclass on Sustainable Cities at Kumaraguru connected me to bright young minds who asked global questions with local insight."</p>
                <p className="text-xs text-gray-600 mt-2">– Prof. Maria Lopez, Spain</p>
              </div>

              <button 
                onClick={scrollToContact}
                className="w-full text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
                style={{ backgroundImage: 'linear-gradient(90deg, rgb(33, 47, 70), #228be6)' }}
              >
                Offer a Masterclass
              </button>
            </motion.div>

            {/* Virtual Teaching Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all p-8 scroll-section border-2 border-blue-50"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundImage: 'linear-gradient(135deg, rgb(33, 47, 70), #228be6)' }}>
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">Virtual Teaching</h3>
              </div>
              <p className="font-semibold mb-3" style={{ color: 'rgb(33, 47, 70)' }}>Part of a Module</p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Global faculty virtually teach selected lectures or units within an existing Kumaraguru course (3-6 sessions).
              </p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    How It Works
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 ml-4">
                    <li>• Planned with Kumaraguru faculty to align learning outcomes</li>
                    <li>• Delivered synchronously (live) or asynchronously (recorded)</li>
                    <li>• Credits remain within Kumaraguru's program</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl border-l-4 mb-6" style={{ backgroundColor: 'rgba(33, 47, 70, 0.05)', borderLeftColor: 'rgb(33, 47, 70)' }}>
                <p className="text-sm italic text-gray-700">"Teaching virtually for the International Business module was seamless — the co-teaching model with Kumaraguru faculty made the integration smooth."</p>
                <p className="text-xs text-gray-600 mt-2">– Dr. Andrew Clarke, UK</p>
              </div>

              <button 
                onClick={scrollToContact}
                className="w-full text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
                style={{ backgroundImage: 'linear-gradient(90deg, rgb(33, 47, 70), #228be6)' }}
              >
                Become a Virtual Instructor
              </button>
            </motion.div>

            {/* COIL Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all p-8 scroll-section border-2 border-blue-50"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundImage: 'linear-gradient(135deg, rgb(33, 47, 70), #228be6)' }}>
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">COIL Program</h3>
              </div>
              <p className="font-semibold mb-3" style={{ color: 'rgb(33, 47, 70)' }}>Collaborative Online International Learning</p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                COIL connects Kumaraguru students with international peers to co-learn and co-create under joint facilitation by both institutions' faculty.
              </p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'rgb(33, 47, 70)' }}></span>
                    How It Works
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 ml-4">
                    <li>• Co-designed course modules with faculty from both institutions</li>
                    <li>• Collaborative projects, group discussions, virtual presentations</li>
                    <li>• Duration: 4-8 weeks within a semester</li>
                  </ul>
                </div>
              </div>

              <div className="p-6 rounded-2xl mb-6 text-white" style={{ backgroundImage: 'linear-gradient(135deg, rgb(33, 47, 70), #1a3a52)' }}>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-black">15+</div>
                    <div className="text-xs opacity-90">COIL modules</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black">400+</div>
                    <div className="text-xs opacity-90">Students</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black">10+</div>
                    <div className="text-xs opacity-90">Disciplines</div>
                  </div>
                </div>
              </div>

              <button 
                onClick={scrollToContact}
                className="w-full text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
                style={{ backgroundImage: 'linear-gradient(90deg, rgb(33, 47, 70), #228be6)' }}
              >
                Start a COIL Program
              </button>
            </motion.div>

            {/* Visiting Faculty Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all p-8 scroll-section border-2 border-blue-50"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundImage: 'linear-gradient(135deg, rgb(33, 47, 70), #228be6)' }}>
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">Visiting Faculty</h3>
              </div>
              <p className="font-semibold mb-3" style={{ color: 'rgb(33, 47, 70)' }}>Block Teaching</p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Faculty spend 1-4 weeks on campus delivering block teaching (intensive modules) within a course.
              </p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'rgb(33, 47, 70)' }}></span>
                    How It Works
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 ml-4">
                    <li>• Faculty visit Coimbatore to deliver 8-20 hours of lectures/workshops</li>
                    <li>• Integrated into undergraduate or postgraduate programs</li>
                    <li>• May include guest seminars, workshops, and student mentoring</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl border-l-4 mb-6" style={{ backgroundColor: 'rgba(33, 47, 70, 0.05)', borderLeftColor: 'rgb(33, 47, 70)' }}>
                <p className="text-sm italic text-gray-700">"My two weeks at Kumaraguru were unforgettable — the energy of the students, the hospitality, and the academic openness made it a rich exchange."</p>
                <p className="text-xs text-gray-600 mt-2">– Prof. Keiko Tanaka, Japan</p>
              </div>

              <button 
                onClick={scrollToContact}
                className="w-full text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
                style={{ backgroundImage: 'linear-gradient(90deg, rgb(33, 47, 70), #228be6)' }}
              >
                Plan Your Visit
              </button>
            </motion.div>

            {/* Adjunct Faculty Card - Full Width */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="lg:col-span-2 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all p-8 scroll-section border-2 border-blue-50"
            >
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundImage: 'linear-gradient(135deg, rgb(33, 47, 70), #228be6)' }}>
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900">Adjunct Faculty</h3>
                  </div>
                  <p className="font-semibold mb-3" style={{ color: 'rgb(33, 47, 70)' }}>Hybrid Teaching</p>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Global faculty appointed as Adjunct Faculty, co-owning full courses with Kumaraguru. Teaching is a hybrid model: some sessions online, some delivered in person during campus visits.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'rgb(33, 47, 70)' }}></span>
                        How It Works
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600 ml-4">
                        <li>• Semester-long teaching (full 3-credit or 4-credit courses)</li>
                        <li>• Course designed jointly with Kumaraguru department</li>
                        <li>• Faculty may visit once during the semester for in-person teaching</li>
                      </ul>
                    </div>
                  </div>

                  <button 
                    onClick={scrollToContact}
                    className="w-full text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105"
                    style={{ backgroundImage: 'linear-gradient(90deg, rgb(33, 47, 70), #228be6)' }}
                  >
                    Become an Adjunct Faculty
                  </button>
                </div>
                
                <div className="p-6 rounded-xl border-l-4 flex items-center" style={{ backgroundColor: 'rgba(33, 47, 70, 0.05)', borderLeftColor: 'rgb(33, 47, 70)' }}>
                  <p className="text-gray-700 italic">"As an Adjunct Faculty, I've been able to guide students over an entire semester, building meaningful academic relationships." <br/><span className="text-gray-600 text-sm not-italic">– Dr. Miguel Fernandez, Spain</span></p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* How to Partner Section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-12 my-20 text-white shadow-2xl"
            style={{ backgroundImage: 'linear-gradient(90deg, rgb(33, 47, 70), #228be6, rgb(33, 47, 70))' }}
          >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-black mb-4">How to Partner With Us</h2>
          <p className="text-lg text-white/90 mb-12">Simple, streamlined process to start your collaboration</p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div whileHover={{ y: -10 }} className="bg-white/15 backdrop-blur-sm border border-white/30 p-8 rounded-2xl hover:bg-white/25 transition-all">
              <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center text-white font-black text-2xl mx-auto mb-4">1</div>
              <h3 className="text-2xl font-bold mb-3">Explore</h3>
              <p className="text-white/90">Choose the engagement type that matches your expertise and availability.</p>
            </motion.div>
            
            <motion.div whileHover={{ y: -10 }} className="bg-white/15 backdrop-blur-sm border border-white/30 p-8 rounded-2xl hover:bg-white/25 transition-all">
              <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center text-white font-black text-2xl mx-auto mb-4">2</div>
              <h3 className="text-2xl font-bold mb-3">Submit</h3>
              <p className="text-white/90">Fill out our Expression of Interest form with your details.</p>
            </motion.div>
            
            <motion.div whileHover={{ y: -10 }} className="bg-white/15 backdrop-blur-sm border border-white/30 p-8 rounded-2xl hover:bg-white/25 transition-all">
              <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center text-white font-black text-2xl mx-auto mb-4">3</div>
              <h3 className="text-2xl font-bold mb-3">Connect</h3>
              <p className="text-white/90">Our team will reach out to discuss the next steps.</p>
            </motion.div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToContact}
            className="bg-white text-[#1565d8] hover:bg-blue-50 px-10 py-4 rounded-full font-black text-lg shadow-xl transition-all"
          >
            Submit Expression of Interest
          </motion.button>
        </div>
      </motion.section>

          {/* Contact Form */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl p-10 my-12 border-2 border-blue-100"
            id="contact"
          >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#1565d8]/10 to-[#228be6]/10 rounded-full mb-4">
              <span className="font-bold text-sm" style={{ color: 'rgb(33, 47, 70)' }}>GET IN TOUCH</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-gray-900">
              Let's Start Your
              <span className="block bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, rgb(33, 47, 70), #228be6)' }}>
                Global Journey
              </span>
            </h2>
            <p className="text-xl text-gray-600">Have questions? Our team is here to help you with your global faculty journey.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {formStatus.type !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg ${
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                <Input 
                  id="name" 
                  placeholder="Your name" 
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 transition-all"
                  style={{ '--tw-ring-color': 'rgb(33, 47, 70)', '--tw-border-opacity': '1' } as any}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgb(33, 47, 70)';
                    e.target.style.boxShadow = '0 0 0 2px rgba(33, 47, 70, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your.email@institution.edu" 
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 transition-all"
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgb(33, 47, 70)';
                    e.target.style.boxShadow = '0 0 0 2px rgba(33, 47, 70, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="institution" className="block text-sm font-bold text-gray-700 mb-2">Institution *</label>
                <Input 
                  id="institution" 
                  placeholder="Your institution" 
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 transition-all"
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgb(33, 47, 70)';
                    e.target.style.boxShadow = '0 0 0 2px rgba(33, 47, 70, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                  value={formData.institution}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-bold text-gray-700 mb-2">Country *</label>
                <Input 
                  id="country" 
                  placeholder="Your country" 
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 transition-all"
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgb(33, 47, 70)';
                    e.target.style.boxShadow = '0 0 0 2px rgba(33, 47, 70, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="expertise" className="block text-sm font-bold text-gray-700 mb-2">Area of Expertise *</label>
              <Input 
                id="expertise" 
                placeholder="Your field of expertise" 
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 transition-all"
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgb(33, 47, 70)';
                  e.target.style.boxShadow = '0 0 0 2px rgba(33, 47, 70, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
                value={formData.expertise}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Type of Engagement (Select all that apply) *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-6 rounded-xl" style={{ backgroundColor: 'rgba(33, 47, 70, 0.05)' }}>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="masterclass" 
                    className="w-5 h-5 rounded cursor-pointer"
                    style={{ accentColor: 'rgb(33, 47, 70)' }} 
                    checked={formData.engagement.includes('masterclass')}
                    onChange={handleCheckboxChange}
                  />
                  <span className="font-medium text-gray-700">Online Masterclass</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="virtual" 
                    className="w-5 h-5 rounded cursor-pointer"
                    style={{ accentColor: 'rgb(33, 47, 70)' }}
                    checked={formData.engagement.includes('virtual')}
                    onChange={handleCheckboxChange}
                  />
                  <span className="font-medium text-gray-700">Virtual Teaching</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="coil" 
                    className="w-5 h-5 rounded cursor-pointer"
                    style={{ accentColor: 'rgb(33, 47, 70)' }}
                    checked={formData.engagement.includes('coil')}
                    onChange={handleCheckboxChange}
                  />
                  <span className="font-medium text-gray-700">COIL Program</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="visiting" 
                    className="w-5 h-5 rounded cursor-pointer"
                    style={{ accentColor: 'rgb(33, 47, 70)' }}
                    checked={formData.engagement.includes('visiting')}
                    onChange={handleCheckboxChange}
                  />
                  <span className="font-medium text-gray-700">Visiting Faculty</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="adjunct" 
                    className="w-5 h-5 rounded cursor-pointer"
                    style={{ accentColor: 'rgb(33, 47, 70)' }}
                    checked={formData.engagement.includes('adjunct')}
                    onChange={handleCheckboxChange}
                  />
                  <span className="font-medium text-gray-700">Adjunct Faculty</span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">Your Message *</label>
              <Textarea
                id="message"
                placeholder="Tell us about your interest in collaborating with us..."
                className="min-h-[140px] px-4 py-3 rounded-xl border-2 border-gray-200 transition-all"
                style={{}}
                onFocus={(e) => {
                  (e.target as any).style.borderColor = 'rgb(33, 47, 70)';
                  (e.target as any).style.boxShadow = '0 0 0 2px rgba(33, 47, 70, 0.1)';
                }}
                onBlur={(e) => {
                  (e.target as any).style.borderColor = '#e5e7eb';
                  (e.target as any).style.boxShadow = 'none';
                }}
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>

            <motion.button 
              type="submit"
              disabled={formStatus.type === 'loading'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-white font-bold py-4 px-12 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all transform disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
          </form>
        </div>
      </motion.section>
        </div>
      </div>
    </div>
  );
}
