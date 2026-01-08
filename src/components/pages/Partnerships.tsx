import { useEffect, useState } from 'react';
import { Users, BookOpen, Target, GraduationCap, Award } from 'lucide-react';
import KGeo3_1 from '../../assets/K-GEO-3 (1).JPG';
import KGeo3_2 from '../../assets/K-GEO-3 (2).JPG';

const PartnershipCard = ({ title, items, color = 'black' }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200">
    <h3 className={`text-xl font-bold mb-4 ${color === 'blue' ? 'text-[#1565d8]' : 'text-gray-900'}`}>
      {title}
    </h3>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <span className="text-[#1565d8] mr-2 font-bold">•</span>
          <span className="text-gray-600 text-sm">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const PartnershipOpportunity = ({ title, opportunities, icon: Icon }: { title: string; opportunities: string[]; icon: any }) => (
  <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200">
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#1565d8]/5 to-[#228be6]/5 rounded-full blur-3xl"></div>
    <div className="relative">
      <div className="w-16 h-16 bg-gradient-to-br from-[#1565d8] to-[#228be6] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h4 className="text-xl font-bold text-gray-900 mb-4">{title}</h4>
      <ul className="space-y-2">
        {opportunities.map((opp, i) => (
          <li key={i} className="flex items-start">
            <span className="text-[#228be6] mr-2">→</span>
            <span className="text-gray-600 text-sm leading-relaxed">{opp}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default function Partnerships() {
  // Scroll animation observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.scroll-animate');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  const regions = {
    'North America': ['University of Example 1', 'University of Example 2'],
    'UK & Europe': ['University of Example 3', 'University of Example 4'],
    'Africa & Middle East': ['University of Example 5', 'University of Example 6'],
    'Asia-Pacific': ['University of Example 7', 'University of Example 8']
  };

  const partnershipTypes = [
    {
      title: 'Student Mobility',
      icon: GraduationCap,
      items: [
        'Exchange programs',
        'Study abroad',
        'Projects and Internships',
        'Summer/winter schools',
        'Immersions & cultural Exchanges'
      ]
    },
    {
      title: 'Faculty Mobility',
      icon: Users,
      items: [
        'Visiting Faculty',
        'Online guest faculty',
        'Faculty training & development'
      ]
    },
    {
      title: 'Joint Research & Innovation',
      icon: BookOpen,
      items: [
        'Matching Grants - Collaborative Projects',
        'International Conferences',
        'Joint Research Centers',
        'Joint Supervision of Doctoral / Graduate students'
      ]
    },
    {
      title: 'Joint Academic Programs',
      icon: Award,
      items: [
        'Certifications Programs',
        'Twinning Programs',
        'Hybrid/Online Programs'
      ]
    },
    {
      title: 'Specialized Collaborations',
      icon: Target,
      items: [
        'COIL',
        'Volunteering and Service Learning',
        'Joint Student Events / Competitions',
        'Academic Centres'
      ]
    }
  ];

  const [formData, setFormData] = useState({
    institution: '',
    country: '',
    contactPerson: '',
    designation: '',
    email: '',
    phone: '',
    interests: {
      studentMobility: false,
      facultyMobility: false,
      jointResearch: false,
      academicPrograms: false,
      specializedCollab: false
    },
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        interests: {
          ...prev.interests,
          [name]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-white">
      {/* Global Styles for Scroll Animations */}
      <style>{`
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .scroll-animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={KGeo3_1}
            alt="Global Partnerships"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center text-white">
          <div className="inline-block mb-6 px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="text-white font-semibold text-sm tracking-wider uppercase">
              Global Engagement
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Global Partnerships
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-white/90 leading-relaxed max-w-4xl mx-auto">
            Building Bridges, Creating Impact Through Global Collaboration
          </p>
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">
            At Kumaraguru Institutions, we welcome universities, research centers, and organizations across the world to collaborate through meaningful partnerships
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#opportunities"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1565d8] rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl font-semibold"
            >
              Explore Opportunities
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="mailto:global@kumaraguru.in?subject=Partnership Inquiry - Kumaraguru Institutions"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/40 rounded-full hover:bg-white/20 transition-all font-semibold"
            >
              Partner With Us
            </a>
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-20 px-6 bg-gradient-to-b from-white via-blue-50 to-white scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-[#1565d8]/10 to-[#228be6]/10 rounded-full mb-6">
              <span className="text-[#1565d8] font-semibold text-sm tracking-wider uppercase">Global Network</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
              Our Global Partners
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Collaborating with 31 leading institutions across 20+ countries worldwide
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="text-5xl font-bold text-[#1565d8] mb-2">31</div>
              <p className="text-gray-600 font-semibold">Partner Universities</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="text-5xl font-bold text-[#228be6] mb-2">20+</div>
              <p className="text-gray-600 font-semibold">Countries Represented</p>
            </div>          </div>

          {/* Partner Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {no: 1, name: 'Asia Pacific University of Technology and Innovation', country: 'Malaysia', region: 'Asia'},
              {no: 2, name: 'Ara Institute of Canterbury', country: 'New Zealand', region: 'Oceania'},
              {no: 3, name: 'BGMEA University of Fashion and Technology', country: 'Bangladesh', region: 'Asia'},
              {no: 4, name: 'Colorado State University', country: 'USA', region: 'North America'},
              {no: 5, name: 'Dresden International University', country: 'Germany', region: 'Europe'},
              {no: 6, name: 'University of Huddersfield', country: 'UK', region: 'Europe'},
              {no: 7, name: 'James Cook University', country: 'Singapore', region: 'Asia'},
              {no: 8, name: 'Northern Illinois University', country: 'USA', region: 'North America'},
              {no: 9, name: 'Manchester Metropolitan University', country: 'UK', region: 'Europe'},
              {no: 10, name: 'MAHSA University', country: 'Malaysia', region: 'Asia'},
              {no: 11, name: 'Management Development Institute of Singapore', country: 'Singapore', region: 'Asia'},
              {no: 12, name: 'National Dong Hwa University', country: 'Taiwan', region: 'Asia'},
              {no: 13, name: 'PKFokam Institute of Excellence', country: 'Cameroon', region: 'Africa'},
              {no: 14, name: 'Rochester Institute of Technology', country: 'USA', region: 'North America'},
              {no: 15, name: 'RWTH Aachen University – ITA', country: 'Germany', region: 'Europe'},
              {no: 16, name: 'RWTH Aachen University – International Academy', country: 'Germany', region: 'Europe'},
              {no: 17, name: 'Swinburne University of Technology – Sarawak', country: 'Malaysia', region: 'Asia'},
              {no: 18, name: 'Skyline University College', country: 'UAE', region: 'Middle East'},
              {no: 19, name: 'Texas Tech University', country: 'USA', region: 'North America'},
              {no: 20, name: 'Technical University of Liberec', country: 'Czech Republic', region: 'Europe'},
              {no: 21, name: 'University of Leeds', country: 'UK', region: 'Europe'},
              {no: 22, name: "Taylor's University", country: 'Malaysia', region: 'Asia'},
              {no: 23, name: 'upGrad Connect', country: 'Australia', region: 'Oceania'},
              {no: 24, name: 'Sri Lanka Institute of Textile and Apparel (SLITA)', country: 'Sri Lanka', region: 'Asia'},
              {no: 25, name: 'Multimedia University', country: 'Malaysia', region: 'Asia'},
              {no: 26, name: 'Tianjin University', country: 'China', region: 'Asia'},
              {no: 27, name: 'Universiti Teknologi Brunei', country: 'Brunei', region: 'Asia'},
              {no: 28, name: 'University of Seoul', country: 'South Korea', region: 'Asia'},
              {no: 29, name: 'École de Design – Intuit Lab', country: 'France', region: 'Europe'},
              {no: 30, name: 'University of Nottingham', country: 'UK', region: 'Europe'},
              {no: 31, name: 'Ben-Gurion University', country: 'Israel', region: 'Middle East'}
            ].map((partner, index) => (
              <div key={index} className="group relative bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl hover:border-[#1565d8] transition-all duration-300 hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#1565d8]/5 to-[#228be6]/5 rounded-full blur-2xl group-hover:from-[#1565d8]/10 group-hover:to-[#228be6]/10 transition-all"></div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#1565d8]/10 to-[#228be6]/10 rounded-full">
                      <span className="text-xs font-bold text-[#1565d8]">{partner.region}</span>
                    </span>
                    <span className="text-2xl font-bold text-gray-200 group-hover:text-[#1565d8] transition-colors">{String(partner.no).padStart(2, '0')}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#1565d8] transition-colors">
                    {partner.name}
                  </h3>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-sm text-gray-600 font-semibold">{partner.country}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Regional Distribution */}
          <div className="bg-gradient-to-br from-[#1b2840] to-[#1565d8] rounded-2xl p-10 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-8 text-center">Regional Distribution</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {region: 'Asia', count: 12, color: 'from-blue-400 to-blue-600'},
                {region: 'Europe', count: 9, color: 'from-indigo-400 to-indigo-600'},
                {region: 'North America', count: 4, color: 'from-cyan-400 to-cyan-600'},
                {region: 'Others', count: 6, color: 'from-purple-400 to-purple-600'}
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className={`bg-gradient-to-br ${item.color} rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                    <span className="text-3xl font-bold">{item.count}</span>
                  </div>
                  <p className="font-semibold text-white/90">{item.region}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Partnership Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              At Kumaraguru Institutions, we believe that true global engagement is built on meaningful, sustainable, and future-oriented partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnershipTypes.map((type) => (
              <PartnershipOpportunity
                key={type.title}
                title={type.title}
                icon={type.icon}
                opportunities={type.items}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner With Us */}
      <section className="py-20 px-6 bg-white scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Why Partner With Us?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                These partnership pathways represent the many ways Kumaraguru is already connected with leading global universities and institutions — driving impact through mobility, research, and innovation.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Situated in Coimbatore, one of South India's most dynamic educational and industrial hubs, Kumaraguru offers partners a gateway to one of the fastest-growing regions in the country.
              </p>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border-l-4 border-[#1565d8]">
                <h3 className="text-xl font-bold text-gray-900 mb-4">By partnering with Kumaraguru, you gain access to:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-[#1565d8] mr-3 text-2xl font-bold">✓</span>
                    <span className="text-gray-700">A vibrant student and faculty community eager for global engagement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#1565d8] mr-3 text-2xl font-bold">✓</span>
                    <span className="text-gray-700">A dynamic entrepreneurial and industrial ecosystem in South India</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#1565d8] mr-3 text-2xl font-bold">✓</span>
                    <span className="text-gray-700">A legacy of academic excellence combined with forward-looking innovation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#1565d8] mr-3 text-2xl font-bold">✓</span>
                    <span className="text-gray-700">Opportunities to expand your institution's presence in one of India's fastest-growing regions</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src={KGeo3_1} 
                  alt="Kumaraguru Campus" 
                  className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src={KGeo3_2} 
                  alt="Kumaraguru Students" 
                  className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white scroll-animate">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Partner With Us
            </h2>
            <p className="text-xl text-gray-600">
              Let's explore how we can work together. Fill out the form below and our team will get back to you soon.
            </p>
          </div>

          <form 
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">
                  Institution / Organization Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1565d8] focus:border-transparent transition duration-200"
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1565d8] focus:border-transparent transition duration-200"
                />
              </div>
              <div>
                <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Person <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="contactPerson"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1565d8] focus:border-transparent transition duration-200"
                />
              </div>
              <div>
                <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
                  Designation/Role <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1565d8] focus:border-transparent transition duration-200"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1565d8] focus:border-transparent transition duration-200"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone (with country code) <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1565d8] focus:border-transparent transition duration-200"
                />
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Areas of Interest</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="studentMobility"
                    checked={formData.interests.studentMobility}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Student Mobility (Exchange, Study Abroad, Projects, Internships, Schools, Immersions)</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="facultyMobility"
                    checked={formData.interests.facultyMobility}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Faculty Mobility (Visiting Faculty, Online Guest Lectures, Training & Development)</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="jointResearch"
                    checked={formData.interests.jointResearch}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Joint Research & Innovation (Projects, Publications, Conferences, Centres, Supervision)</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="academicPrograms"
                    checked={formData.interests.academicPrograms}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Joint Academic Programs (Dual Degrees, Certifications, Twinning, Online/Hybrid)</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="specializedCollab"
                    checked={formData.interests.specializedCollab}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Specialized Collaborations (COIL, Service Learning, Student Competitions, Centres)</span>
                </label>
              </div>
            </div>

            <div className="mb-8">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes / Proposal Outline (if any)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={5}
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="Tell us more about your institution and how you'd like to collaborate..."
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#1565d8] to-[#228be6] hover:from-[#1b4965] hover:to-[#1565d8] text-white font-semibold py-4 px-10 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Let's Collaborate
              </button>
              <p className="mt-4 text-sm text-gray-500">
                Thank you for your interest in partnering with Kumaraguru. Our Global Engagement team will connect with you shortly to explore possibilities together.
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
