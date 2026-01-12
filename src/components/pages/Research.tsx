import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, GraduationCap, Building2, DollarSign, BookOpen, Lightbulb, Target, CheckCircle2, Globe } from 'lucide-react';
import researchImage from '../../assets/images/overview.jpg';
import { Input } from '@/components/ui/input';

type FormStatus = {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
};

export default function Research() {
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    country: '',
    researchDomain: '',
    preferredMode: '',
    email: '',
    phone: '',
    cv: ''
  });
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: 'idle' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ type: 'loading', message: 'Sending your expression of interest...' });

    try {
      const response = await fetch('/api/research-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus({
          type: 'success',
          message: 'Thank you! Your expression of interest has been received. We will contact you within 24-48 hours.'
        });
        
        setFormData({
          name: '',
          institution: '',
          country: '',
          researchDomain: '',
          preferredMode: '',
          email: '',
          phone: '',
          cv: ''
        });

        // Clear success message after 5 seconds
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
      console.error('Form submission error:', error);
    }
  };

  const researchAreas = [
    'Sustainable Agriculture & Food Systems',
    'Renewable Energy & Environmental Engineering',
    'Water Resource Management & Climate Resilience',
    'Smart Materials, Robotics & Advanced Manufacturing',
    'Digital Agriculture, IoT & Precision Farming',
    'Community Engagement, Rural Development & Public Health',
    'Data Science, AI & Social Analytics',
    'Entrepreneurship, Social Innovation & Impact Studies'
  ];

  const fundingSchemes = [
    'SERB Core Research Grant (CRG / EMR)',
    'VAJRA / GIAN Schemes',
    'ASEAN-India Research Training Fellowship',
    'Junior/Senior Research Fellowships',
    'International Funding Networks',
    'Bilateral/Multilateral Programs'
  ];

  const pastProjects = [
    'Smart irrigation systems in semi-arid zones',
    'Solar-powered cold storage for rural agriculture',
    'Community health survey and intervention',
    'Low-cost water purification units'
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

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={researchImage}
            alt="Research at Kumaraguru"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center text-white">
          <div className="inline-block mb-6 px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="text-white font-semibold text-sm tracking-wider uppercase">
              Research Excellence
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Research at Kumaraguru
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed">
            Where inquiry meets innovation across disciplines, cultures, and institutions
          </p>
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">
            We invite global faculty, scholars, and institutions to partner with us in pushing boundaries, co-creating knowledge, and nurturing the next generation of change-makers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#expression-of-interest"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl font-semibold"
            >
              Partner With Us
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#research-areas"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/40 rounded-full hover:bg-white/20 transition-all font-semibold"
            >
              Explore Research
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-6 py-2 rounded-full mb-4 border-2" style={{ backgroundColor: 'rgb(33, 47, 70)', borderColor: 'rgb(33, 47, 70)' }}>
              <span className="font-bold text-sm tracking-wide uppercase" style={{ color: '#ffffff' }}>🔬 Our Research DNA</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">Innovation Meets Inquiry</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border-2 border-blue-100">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                At Kumaraguru Institutions, research is not an afterthought — it's woven into our DNA. We believe that inquiry and innovation emerge at the intersections of disciplines, cultures, and institutions. Our campus is home to centers of excellence, industry-sponsored labs, and multidisciplinary initiatives.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Over the years, KI faculty and students have engaged in projects ranging from sustainable agriculture, water resource management, smart materials, renewable energy, digital agriculture, to community health, rural development, and data-driven social interventions. We invite global faculty, scholars, and institutions to partner with us in pushing boundaries, co-creating knowledge, and nurturing the next generation of change-makers.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-20 bg-white" id="research-areas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-6 py-2 rounded-full mb-4 border-2" style={{ backgroundColor: 'rgb(33, 47, 70)', borderColor: 'rgb(33, 47, 70)' }}>
              <span className="font-bold text-sm tracking-wide uppercase" style={{ color: '#ffffff' }}>📊 Research Focus</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">Research Areas & Past Highlights</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Drawing from KI's academic breadth across engineering, agriculture, management, and liberal arts
            </p>
          </motion.div>

          {/* Thematic Strengths */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <h3 className="text-3xl font-black text-gray-900 mb-8 text-center">Our Thematic Strengths</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {researchAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 border-2" style={{ borderColor: 'rgb(33, 47, 70)' }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full"></div>
                    </div>
                    <p className="text-gray-800 font-medium leading-relaxed">{area}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Past Projects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-3xl font-black text-gray-900 mb-8 text-center">Past Projects (Illustrative)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {pastProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 border-l-4" style={{ borderLeftColor: 'rgb(33, 47, 70)' }}
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 text-lg">{project}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-center text-gray-600 mt-8 text-lg"
            >
              These projects have resulted in published papers, local pilot implementations, and student dissertations.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Funding Opportunities */}
      <section className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block px-6 py-2 rounded-full mb-4 border-2" style={{ backgroundColor: 'rgb(33, 47, 70)', borderColor: 'rgb(33, 47, 70)' }}>
              <span className="font-bold text-sm tracking-wide uppercase" style={{ color: '#ffffff' }}>💰 Funding & Grants</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">Global Funding Opportunities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access collaborative grant opportunities and funding mechanisms to support joint research initiatives
            </p>
          </motion.div>

          {/* Funding Schemes */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {fundingSchemes.map((scheme, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 border-2" style={{ borderColor: 'rgb(33, 47, 70)' }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-gray-700 text-lg font-medium">{scheme}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Why It Matters & Our Approach */}
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl shadow-2xl p-10 text-white"
            >
              <Lightbulb className="w-12 h-12 mb-6 opacity-90" />
              <h3 className="text-3xl font-black mb-4">Why It Matters</h3>
              <p className="text-lg leading-relaxed opacity-95 mb-4">
                Global funding enables ambitious, large-scale projects with cross-border impact. At KI, we aim to co-develop proposals with international partners to access the best funding schemes — enabling travel, infrastructure, student fellowships, publication, and shared labs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-10 border-2" style={{ borderColor: 'rgb(33, 47, 70)' }}
            >
              <Target className="w-12 h-12 mb-6 text-blue-600" />
              <h3 className="text-3xl font-black text-gray-900 mb-4">Our Approach</h3>
              <ul className="space-y-3 text-gray-700 text-lg">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Co-develop proposals with partner faculty to align strengths and institutional support</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>KI provides matching funds, seed grants, infrastructure assurance, and administrative backing</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>We host workshops and internal grant-writing sessions to help partners propose successfully</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PhD Collaboration */}
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
              <span className="font-bold text-sm tracking-wide uppercase" style={{ color: '#ffffff' }}>🎓 PhD Collaboration</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">Co-Supervision & Doctoral Partnerships</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create dual-expertise mentorships and stronger academic rigor through international PhD collaborations
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-10 mb-12 border-2" style={{ borderColor: 'rgb(33, 47, 70)' }}
          >
            <GraduationCap className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Vision & Opportunity</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              We welcome global faculty to co-supervise PhD scholars with our faculty, creating dual-expertise mentorships and stronger academic rigor. These partnerships increase exposure, publication rates, and student mobility.
            </p>
          </motion.div>

          {/* Support vs Expectations */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-8 border-2" style={{ borderColor: 'rgb(33, 47, 70)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">Support from KI</h3>
              </div>
              <ul className="space-y-4">
                {['Institutional letter of support, IRB / ethics facilitation', 'Travel grants for student mobility', 'Library, computing, and lab access', 'Administrative coordination'].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl shadow-2xl p-8 text-white" style={{ backgroundColor: 'rgb(33, 47, 70)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-black">Global Co-Supervisor Expectations</h3>
              </div>
              <ul className="space-y-4">
                {['Regular engagement in student reviews', 'Academic guidance and publication planning', 'Visit Kumaraguru or host student', 'Co-author and support conferences'].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-white/95 text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl shadow-2xl p-10 text-white" style={{ backgroundColor: 'rgb(33, 47, 70)' }}
          >
            <h3 className="text-3xl font-black mb-6 text-center">Past Experience & Stats</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-black mb-2">50+</div>
                <p className="text-white/90 text-lg">PhDs awarded in past 5 years</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black mb-2">100+</div>
                <p className="text-white/90 text-lg">Publications by PhD scholars</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black mb-2">Multiple</div>
                <p className="text-white/90 text-lg">International research stints</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scholars' Residencies */}
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
              <span className="font-bold text-sm tracking-wide uppercase" style={{ color: '#ffffff' }}>📚 Scholars' Residencies</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">Residential Research Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Academic residency program inviting global scholars to stay at Kumaraguru (2 weeks to 6 months)
            </p>
          </motion.div>

          {/* What It Is */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl shadow-lg p-10 mb-12 border-2" style={{ backgroundColor: 'rgba(33, 47, 70, 0.05)', borderColor: 'rgb(33, 47, 70)' }}
          >
            <BookOpen className="w-12 h-12 text-orange-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">What It Is</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              An academic residency program inviting global scholars to stay at Kumaraguru (2 weeks to 6 months) to conduct research, give seminars, mentor, and collaborate.
            </p>
          </motion.div>

          {/* Support vs Expectations */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-8 border-2" style={{ borderColor: 'rgb(33, 47, 70)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">Support by KI</h3>
              </div>
              <ul className="space-y-4">
                {['Accommodation in visiting scholar housing', 'Travel/honorarium support (where feasible)', 'Visa and administrative support', 'Host department and local mentorship'].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl shadow-2xl p-8 text-white" style={{ backgroundColor: 'rgb(33, 47, 70)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-black">Expectations from Residents</h3>
              </div>
              <ul className="space-y-4">
                {['Deliver a public lecture/seminar', 'Mentor students or host mini-projects', 'Share research outcomes', 'Engage in campus activities'].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-white/95 text-lg">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Global Models */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl shadow-2xl p-10 text-white" style={{ backgroundColor: 'rgb(33, 47, 70)' }}
          >
            <Globe className="w-12 h-12 mb-4" />
            <h3 className="text-3xl font-black mb-4">Global Models</h3>
            <p className="text-white/95 text-lg leading-relaxed">
              Similar to NLU Delhi's Global Scholars-in-Residence Programme, we invite international scholars for residencies with support for airfare, accommodation, office space, and lecture delivery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Expression of Interest Form */}
      <section className="py-20 bg-white" id="expression-of-interest">
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
              Ready to embark on a research collaboration journey? Share your details and we'll connect with you.
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
                <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">
                  Full Name *
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                  placeholder="Dr. Jane Smith"
                />
              </div>

              <div>
                <label htmlFor="institution" className="block text-sm font-bold text-gray-900 mb-2">
                  Institution *
                </label>
                <Input
                  type="text"
                  id="institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                  placeholder="University Name"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="country" className="block text-sm font-bold text-gray-900 mb-2">
                  Country *
                </label>
                <Input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                  placeholder="United States"
                />
              </div>

              <div>
                <label htmlFor="researchDomain" className="block text-sm font-bold text-gray-900 mb-2">
                  Research Domain *
                </label>
                <Input
                  type="text"
                  id="researchDomain"
                  name="researchDomain"
                  value={formData.researchDomain}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                  placeholder="AI, Sustainability, etc."
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="preferredMode" className="block text-sm font-bold text-gray-900 mb-2">
                Preferred Mode of Collaboration *
              </label>
              <select
                id="preferredMode"
                name="preferredMode"
                value={formData.preferredMode}
                onChange={(e) => handleInputChange(e as any)}
                required
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 bg-white"
              >
                <option value="">Select a mode</option>
                <option value="PhD Co-Supervision">PhD Co-Supervision</option>
                <option value="Scholar Residency">Scholar Residency</option>
                <option value="Joint Grant Proposal">Joint Grant Proposal</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                  placeholder="jane.smith@university.edu"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-gray-900 mb-2">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                  placeholder="+1 234 567 8900"
                />
              </div>
            </div>

            <div className="mb-8">
              <label htmlFor="cv" className="block text-sm font-bold text-gray-900 mb-2">
                CV / Profile Link
              </label>
              <Input
                type="text"
                id="cv"
                name="cv"
                value={formData.cv}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                placeholder="https://yourwebsite.com/cv"
              />
            </div>

            <motion.button
              type="submit"
              disabled={formStatus.type === 'loading'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {formStatus.type === 'loading' ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Submit Expression of Interest</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Coimbatore Section */}
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
              <span className="font-bold text-sm tracking-wide uppercase" style={{ color: '#ffffff' }}>🌍 Our Location</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">Coimbatore: Innovation Hub</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              India's Innovation and Industry Capital - Where global engagement translates into real-world impact
            </p>
          </motion.div>

          {/* Description Cards */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-10 border-2" style={{ borderColor: 'rgb(33, 47, 70)' }}
            >
              <Building2 className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-black text-gray-900 mb-4">Industrial Powerhouse</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Coimbatore, often called the "Manchester of South India," is one of India's fastest-growing industrial and educational hubs. Renowned for its entrepreneurial spirit, the city has nurtured a dynamic ecosystem of MSMEs, startups, and global enterprises. It is the second-largest city in Tamil Nadu and a key contributor to the state's economy through textiles, precision engineering, IT, automotive, and aerospace industries.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl shadow-2xl p-10 text-white"
            >
              <GraduationCap className="w-12 h-12 mb-4 opacity-90" />
              <h3 className="text-2xl font-black mb-4">Educational Powerhouse</h3>
              <p className="text-white/95 text-lg leading-relaxed">
                The city is equally celebrated as an educational powerhouse, with over 400 higher education institutions and a strong legacy of innovation-driven learning. Coimbatore hosts multiple technology parks and a rapidly expanding IT/GCC presence, making it a preferred destination for international partnerships.
              </p>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl p-10 border-2" style={{ borderColor: 'rgb(33, 47, 70)' }}
          >
            <h3 className="text-3xl font-black text-gray-900 mb-10 text-center">Coimbatore by the Numbers</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { number: '₹1.2L Cr', text: 'Annual contribution to Tamil Nadu GDP' },
                { number: '#2', text: 'Software exporter in Tamil Nadu' },
                { number: '50,000+', text: 'MSMEs in engineering & manufacturing' },
                { number: '400+', text: 'Higher education institutions' },
                { number: 'Top 10', text: 'Indian startup ecosystems' },
                { number: '15+', text: 'SEZs and IT parks with global companies' },
                { number: '24/7', text: 'International connectivity via airport' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg p-6 text-center border-2 transition-all" style={{ borderColor: 'rgb(33, 47, 70)' }}
                >
                  <div className="text-4xl font-black mb-2" style={{ color: 'rgb(33, 47, 70)' }}>{stat.number}</div>
                  <p className="text-gray-700 font-medium">{stat.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
