import { useEffect, useState } from 'react';
import { CheckCircle, Mail, MapPin } from 'lucide-react';
import heroImage from '../../assets/NUS 2024.jpg';
import image1 from '../../assets/K-GEO-3 (1).JPG';

export function KIOutbound() {
  const [activeSection, setActiveSection] = useState('study-abroad');
  const [isNavFixed, setIsNavFixed] = useState(false);
  const [programSearch, setProgramSearch] = useState('');
  const [showProgramDropdown, setShowProgramDropdown] = useState(false);
  const [formData, setFormData] = useState({
    name: '', program: '', year: '', email: '', areaOfInterest: '', attachment: null as File | null,
    additionalNotes: '',
    destination: '', semesterOption: '', projectArea: '', immersionTheme: '', interest: ''
  });
  const [formStatus, setFormStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({
    type: 'idle',
    message: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          const id = entry.target.getAttribute('id');
          if (id) setActiveSection(id);
        }
      });
    }, { threshold: 0.3, rootMargin: '-100px 0px -50px 0px' });

    document.querySelectorAll('.scroll-animate').forEach(section => observer.observe(section));

    const handleScroll = () => {
      const heroHeight = document.querySelector('.hero-section')?.clientHeight || 0;
      setIsNavFixed(window.scrollY > heroHeight - 100);
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.program-dropdown-container')) {
        setShowProgramDropdown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const programs = [
    'Aeronautical Engineering', 'Automobile Engineering', 'Artificial Intelligence and Data Science',
    'Biotechnology', 'Civil Engineering', 'Computer Science Engineering', 'Electrical and Electronics Engineering',
    'Electronics and Communication Engineering', 'Electronics and Instrumentation Engineering', 'Fashion Technology',
    'Information Technology', 'Textile Technology', 'Mechanical Engineering', 'Mechatronics Engineering',
    'Computer Application', 'Management Studies', 'Business Administration', 'Business Administration (International Business)',
    'Commerce', 'Commerce (Professional Accounting)', 'Data Science', 'Economics', 'Political Science',
    'Psychology', 'Visual Communication', 'Tamil (CW)', 'Social Work', 'Agriculture'
  ];

  const sections = [
    { id: 'study-abroad', label: 'Study Abroad' },
    { id: 'projects-internships', label: 'Projects & Internships' },
    { id: 'short-term', label: 'Short-Term Programs' },
    { id: 'summer-programs', label: 'Summer Programs' },
    { id: 'counseling', label: 'Counseling' }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  const studyAbroadTestimonials = [
    { text: "My semester in Germany taught me to think like a global citizen.", author: "Ananya, BBA" },
    { text: "The friendships I formed in Spain are still my global family.", author: "Rohit, CSE" }
  ];

  const shortTermTestimonials = [
    { text: "In Japan, I learned design thinking in 10 days — and made friends for life.", author: "Harini, Mechanical Engg" },
    { text: "Korea's exchange gave me insights into culture and technology I couldn't have imagined.", author: "Arjun, MBA" }
  ];

  const summerTestimonials = [
    { text: "My summer in Poland opened my eyes to European culture and innovation. I made friends I still talk to daily.", author: "Shreya, BBA" },
    { text: "Singapore's summer school gave me a real taste of global business and tech ecosystems — all in four weeks!", author: "Rahul, CSE" }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, attachment: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ type: 'loading', message: 'Submitting your request...' });

    try {
      let attachmentPayload: { name: string; size: number; type: string; data: string } | null = null;

      if (formData.attachment) {
        const file = formData.attachment;
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            const stripped = result.includes(',') ? result.split(',')[1] : result;
            resolve(stripped);
          };
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(file);
        });

        attachmentPayload = {
          name: file.name,
          size: file.size,
          type: file.type,
          data: base64,
        };
      }

      const payload = {
        name: formData.name,
        program: formData.program,
        year: formData.year,
        email: formData.email,
        areaOfInterest: formData.areaOfInterest,
        additionalNotes: formData.additionalNotes,
        attachment: attachmentPayload,
      };

      const response = await fetch('/api/counseling-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit counseling request');
      }

      setFormStatus({
        type: 'success',
        message: 'Thank you! Your counseling request has been submitted successfully. We will contact you soon.'
      });

      // Reset form
      setFormData({
        name: '', program: '', year: '', email: '', areaOfInterest: '', attachment: null,
        additionalNotes: '',
        destination: '', semesterOption: '', projectArea: '', immersionTheme: '', interest: ''
      });

      // Clear file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error('Submission error:', error);
      setFormStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to submit request. Please try again.'
      });
    }
  };

  const filteredPrograms = programs.filter(prog => 
    prog.toLowerCase().includes(programSearch.toLowerCase())
  );

  const selectProgram = (prog: string) => {
    setFormData(prev => ({ ...prev, program: prog }));
    setProgramSearch(prog);
    setShowProgramDropdown(false);
  };

  return (
    <div className="bg-white">
      <style>{`.scroll-animate{opacity:0;transform:translateY(30px);transition:all 0.8s cubic-bezier(0.4,0,0.2,1)}.scroll-animate.visible{opacity:1;transform:translateY(0)}`}</style>

      {/* Hero */}
      <section className="hero-section relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="KI Outbound" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center text-white">
          <div className="inline-block mb-6 px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="text-white font-semibold text-sm tracking-wider uppercase">Global Opportunities</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">KI Outbound Programs</h1>
          <p className="text-xl sm:text-2xl mb-8 text-white/90 leading-relaxed max-w-4xl mx-auto">
            Broaden Your Classroom, Transform Your World
          </p>
        </div>
      </section>

      {/* Vertical Side Navigation - Only shows when hero is scrolled past */}
      {isNavFixed && (
        <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-[#1565d8]/20 p-3">
            <div className="flex flex-col gap-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`group relative px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-[#1565d8] to-[#228be6] text-white shadow-lg'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-[#1565d8]'
                  }`}
                  title={section.label}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold ${activeSection === section.id ? 'text-white' : 'text-[#1565d8]'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className={`h-1 w-1 rounded-full ${activeSection === section.id ? 'bg-white' : 'bg-[#1565d8]'}`} />
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute left-full ml-4 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {section.label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-900" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Study Abroad */}
      <section id="study-abroad" className="py-20 px-6 bg-white scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#1565d8]/10 to-[#228be6]/10 rounded-full">
                <span className="text-[#1565d8] font-semibold text-sm">Study Abroad</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">Study Abroad <br></br>(Semester / Year)</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Imagine walking into a lecture hall in Paris, Berlin, or Melbourne; debating ideas with peers from across continents. A semester or year abroad is not just a chapter in your education — it's a story you'll tell for life.
              </p>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border-l-4 border-[#1565d8]">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What We Offer</h3>
                <ul className="space-y-3">
                  {['Credit transfers with partner universities', 'Pre-departure & visa support', 
                    'Accommodation + health & safety care', 'Mentorship & academic advising'].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#1565d8] mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Do It?</h3>
                <ul className="space-y-4">
                  {['Experience diverse teaching & research systems', 'Build adaptability, intercultural communication',
                    'Gain CV credibility with global experience', 'Build international friendships & networks'].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#228be6] mr-3 text-xl">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#1b2840] to-[#1565d8] p-8 rounded-2xl text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-6">How It Works</h3>
                {['Apply through K-GEO portal', 'Attend pre-departure orientation', 
                  'Travel, study, and immerse yourself', 'Return & integrate credits'].map((step, i) => (
                  <div key={i} className="flex items-start mb-4">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="font-bold">{i + 1}</span>
                    </div>
                    <p className="text-white/90">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <a href="#counseling-form" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#1565d8] to-[#228be6] hover:from-[#1b4965] hover:to-[#1565d8] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Book Your Counseling Slot
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#1565d8] to-transparent rounded-full" />
      </div>

      {/* Student Voices - Study Abroad */}
      <section className="py-16 px-6 bg-gradient-to-b from-gray-50 to-white scroll-animate">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Student Voices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studyAbroadTestimonials.map((testimonial, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                <p className="text-lg text-gray-700 italic mb-4">"{testimonial.text}"</p>
                <p className="text-[#1565d8] font-semibold">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#1565d8] to-transparent rounded-full" />
      </div>

      {/* Projects/Internship Section */}
      <section id="projects-internships" className="py-20 px-6 bg-white scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#1565d8]/10 to-[#228be6]/10 rounded-full mb-4">
              <span className="text-[#1565d8] font-semibold text-sm">Projects & Internships</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Projects / Internship (Semester / Year)</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Collaborate Across Borders on Real Challenges</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                The world's biggest challenges — climate change, digital disruption, inequality — don't stop at borders. Why should learning? Through international project collaborations, you'll work with peers and faculty abroad to co-create solutions that matter.
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border-l-4 border-[#1565d8]">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What We Offer</h3>
                <ul className="space-y-3">
                  {['Joint projects with global faculty mentorship', 'Access to labs, resources, and datasets abroad',
                    'Cross-institutional teamwork', 'Funding & publication opportunities'].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#1565d8] mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Why Do It?</h3>
                <ul className="space-y-3">
                  {['Deepen expertise through applied, real-world research', 'Gain global teamwork and project management skills',
                    'Publish, present, and co-create new knowledge', 'Build credentials that open doors to PhD or global careers'].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#228be6] mr-3 text-xl">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <img src={image1} alt="International Projects" className="w-full h-80 object-cover transform hover:scale-105 transition-transform duration-500" />
              </div>

              <div className="bg-gradient-to-br from-[#1b2840] to-[#1565d8] p-8 rounded-2xl text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-6">How It Works</h3>
                {['Submit project proposal via K-GEO (faculty support required)', 'Work in cross-country teams (on-site/virtual)',
                  'Interim reviews with mentors', 'Final showcase / publication'].map((step, i) => (
                  <div key={i} className="flex items-start mb-4">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="font-bold">{i + 1}</span>
                    </div>
                    <p className="text-white/90">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Urban Pollution Project</h4>
              <p className="text-gray-600">India + Germany → joint mitigation plans</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-lg border border-gray-200">
              <h4 className="text-lg font-bold text-gray-900 mb-2">Digital Health</h4>
              <p className="text-gray-600">App designed with Latin American university tested across two campuses</p>
            </div>
          </div>

          <div className="text-center">
            <a href="#counseling-form" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#1565d8] to-[#228be6] hover:from-[#1b4965] hover:to-[#1565d8] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Book Your Counseling Slot
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#228be6] to-transparent rounded-full" />
      </div>

      {/* Customized Courses Section */}
      <section id="short-term" className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#1565d8]/10 to-[#228be6]/10 rounded-full mb-4">
              <span className="text-[#1565d8] font-semibold text-sm">Short-Term Programs</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Customized Courses (1–3 Weeks)</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Immerse, Explore, Experience — Globally in Weeks</p>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto mb-12">
            1 – 3 weeks. One city. The course will be aligned with a module of your study with concentrated doses of global learning: morning classes, afternoon cultural visits, evenings with new friends, and weekends exploring a new country.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {title: 'Academic Workshops', desc: 'Short courses & specialized training'},
              {title: 'Industry Visits', desc: 'Field exposure & practical learning'},
              {title: 'Cultural Trips', desc: 'Homestays & campus life abroad'},
              {title: 'Peer Interaction', desc: 'Connect with local students'}
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-2">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div className="bg-gradient-to-br from-[#1b2840] to-[#1565d8] p-8 rounded-2xl text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Why Do It?</h3>
              <ul className="space-y-4">
                {['Try global learning without semester-long commitment', 'Boost your CV with short international exposure',
                  'Build confidence and intercultural awareness', 'Gateway to longer study abroad journeys'].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-white/90 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-l-4 border-[#1565d8]">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h3>
              {['Choose immersion program (1–3 weeks)', 'Apply with short essay + faculty reference',
                'Attend pre-departure cultural briefing', 'Fly out, learn, explore, and return with memories + reflections'].map((step, i) => (
                <div key={i} className="flex items-start mb-4">
                  <div className="w-8 h-8 bg-[#1565d8] text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="font-bold text-sm">{i + 1}</span>
                  </div>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Student Voices - Short-Term Programs */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-10 rounded-2xl border-l-4 border-[#1565d8]">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Student Voices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {shortTermTestimonials.map((testimonial, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-md">
                  <p className="text-base text-gray-700 italic mb-3">"{testimonial.text}"</p>
                  <p className="text-[#1565d8] font-semibold text-sm">— {testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <a href="#counseling-form" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#1565d8] to-[#228be6] hover:from-[#1b4965] hover:to-[#1565d8] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Book Your Counseling Slot
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#1565d8] to-transparent rounded-full" />
      </div>

      {/* International Summer Schools Section */}
      <section id="summer-programs" className="py-20 px-6 bg-white scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#1565d8]/10 to-[#228be6]/10 rounded-full mb-4">
              <span className="text-[#1565d8] font-semibold text-sm">Summer Programs</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">International Summer Schools</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Spend Your Summer Abroad. Learn, Travel, Transform.</p>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto mb-12">
            Imagine spending your summer at a leading university overseas — attending classes in the morning, exploring historic streets in the afternoon, and making friends from across the globe at night. International Summer Schools are your chance to combine academics, travel, and culture in a 2–6 week program hosted by Kumaraguru's global partners.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {title: 'Thematic Courses', desc: 'Entrepreneurship, Sustainability, Culture, AI, Innovation, Policy, Design'},
              {title: 'Global Exposure', desc: 'Study with peers from Europe, Asia, and beyond'},
              {title: 'Partner Universities', desc: 'Top institutions in UK, Germany, Singapore, Poland, South Korea'},
              {title: 'End-to-End Support', desc: 'Application guidance, visa help, travel coordination'},
              {title: 'Accommodation & Safety', desc: 'On-campus housing or homestays with 24/7 support'},
              {title: 'Why Join?', desc: 'Experience global classroom, add credentials, explore cultures'}
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-2">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-[#1b2840] to-[#1565d8] p-10 rounded-2xl text-white shadow-2xl mb-12">
            <h3 className="text-3xl font-bold mb-8 text-center">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                {num: '1', title: 'Explore Programs', desc: 'Browse summer school offerings'},
                {num: '2', title: 'Apply via K-GEO', desc: 'Submit application, SOP, transcript'},
                {num: '3', title: 'Get Prepared', desc: 'Pre-departure orientation'},
                {num: '4', title: 'Travel & Learn', desc: 'Academic + cultural immersion'},
                {num: '5', title: 'Return & Reflect', desc: 'Share learnings back home'}
              ].map((step, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">{step.num}</span>
                  </div>
                  <h4 className="font-bold mb-2">{step.title}</h4>
                  <p className="text-white/80 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Student Voices - Summer Programs */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-10 rounded-2xl border-l-4 border-[#228be6]">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Student Voices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {summerTestimonials.map((testimonial, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-md">
                  <p className="text-base text-gray-700 italic mb-3">"{testimonial.text}"</p>
                  <p className="text-[#228be6] font-semibold text-sm">— {testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <a href="#counseling-form" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#1565d8] to-[#228be6] hover:from-[#1b4965] hover:to-[#1565d8] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Book Your Counseling Slot
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="h-1 bg-gradient-to-r from-transparent via-[#228be6] to-transparent rounded-full" />
      </div>

      {/* Global Future Centre Section */}
      <section id="counseling" className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#1565d8]/10 to-[#228be6]/10 rounded-full mb-4">
              <span className="text-[#1565d8] font-semibold text-sm">Counseling & Support</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Global Future Centre</h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">Let's Talk. Let's Connect. Let's Dream Together.</p>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto mb-12">
            Every global journey begins with a conversation. Whether you're dreaming of Paris, Singapore, or Toronto, the first step is meeting us. Our team at K-GEO will help you navigate your options, your questions, and your masters pathway.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              {title: '1:1 Counseling', desc: 'Personal guidance tailored to your goals'},
              {title: 'Info Sessions', desc: 'Explore destinations, funding, timelines'},
              {title: 'Peer Panels', desc: 'Hear directly from seniors who studied abroad'},
              {title: 'Pre-Application Training', desc: 'SOP writing, resume prep, visa workshops'}
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-2">
                <h3 className="text-lg font-bold text-[#1565d8] mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-[#1b2840] to-[#1565d8] p-8 rounded-2xl text-white shadow-xl mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">How to Join</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {['Register on K-GEO portal (choose counseling slot)', 'Upload basic profile (CV, transcripts if ready)',
                'Meet us — in person or virtually', 'Begin your mobility journey!'].map((step, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold">{i + 1}</span>
                  </div>
                  <p className="text-white/90 text-sm">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="counseling-form" className="bg-gradient-to-br from-white via-blue-50 to-white p-10 rounded-3xl shadow-2xl border-2 border-[#1565d8]/20">
            <div className="text-center mb-8">
              <div className="inline-block px-6 py-2 bg-gradient-to-r from-[#1565d8] to-[#228be6] rounded-full mb-4">
                <span className="text-white font-bold text-sm tracking-wider uppercase">Get Started</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Book Your Counseling Slot</h3>
              <p className="text-gray-600">Fill out the form below and our team will get back to you within 24 hours</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Enter your full name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#1565d8] focus:border-[#1565d8] transition-all"
                />
              </div>

              {/* Year */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Year *</label>
                <select 
                  name="year" 
                  value={formData.year} 
                  onChange={handleChange} 
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#1565d8] focus:border-[#1565d8] transition-all bg-white appearance-none cursor-pointer hover:border-[#1565d8]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%231565d8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="">Select your year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

              {/* Program - Searchable */}
              <div className="relative program-dropdown-container">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Program *</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="programSearch"
                    placeholder="Search and select your program" 
                    value={programSearch || formData.program}
                    onChange={(e) => {
                      setProgramSearch(e.target.value);
                      setShowProgramDropdown(true);
                    }}
                    onFocus={() => setShowProgramDropdown(true)}
                    required={!formData.program}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#1565d8] focus:border-[#1565d8] transition-all pr-10"
                  />
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {showProgramDropdown && filteredPrograms.length > 0 && (
                  <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
                    {filteredPrograms.map((prog, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => selectProgram(prog)}
                        className="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-[#1565d8]/10 hover:to-[#228be6]/10 transition-all border-b border-gray-100 last:border-0"
                      >
                        <span className="text-gray-700 hover:text-[#1565d8] font-medium">{prog}</span>
                      </button>
                    ))}
                  </div>
                )}
                {formData.program && (
                  <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-[#1565d8] to-[#228be6] text-white text-sm rounded-full">
                    <span>{formData.program}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, program: '' }));
                        setProgramSearch('');
                      }}
                      className="hover:bg-white/20 rounded-full p-0.5"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Area of Interest */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Area of Interest *</label>
                <select 
                  name="areaOfInterest" 
                  value={formData.areaOfInterest} 
                  onChange={handleChange} 
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#1565d8] focus:border-[#1565d8] transition-all bg-white appearance-none cursor-pointer hover:border-[#1565d8]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%231565d8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="">Select area of interest</option>
                  <option value="Study Abroad">📚 Study Abroad</option>
                  <option value="Projects / Internship">💼 Projects / Internship</option>
                  <option value="Customized Courses">🎓 Customized Courses</option>
                  <option value="Summer Programs">☀️ Summer Programs</option>
                </select>
              </div>

              {/* Additional Notes */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  name="additionalNotes"
                  placeholder="Share goals, questions, or specific universities you're targeting"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#1565d8] focus:border-[#1565d8] transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="your.email@example.com" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#1565d8] focus:border-[#1565d8] transition-all"
                />
              </div>

              {/* Attachment */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Attachment (Optional)</label>
                <div className="relative">
                  <input 
                    type="file" 
                    name="attachment"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#1565d8] focus:border-[#1565d8] transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#1565d8] file:text-white hover:file:bg-[#1b4965] file:cursor-pointer"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Upload resume, transcript, or any reference document (PDF, DOC, JPG - Max 5MB)</p>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2">
                <button 
                  type="submit" 
                  disabled={formStatus.type === 'loading'}
                  className="w-full bg-gradient-to-r from-[#1565d8] to-[#228be6] hover:from-[#1b4965] hover:to-[#1565d8] text-white font-bold py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus.type === 'loading' ? 'Sending...' : 'Send Request'}
                </button>
              </div>

              {/* Status Messages */}
              {formStatus.type !== 'idle' && (
                <div className="md:col-span-2">
                  <div className={`p-4 rounded-lg ${
                    formStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
                    formStatus.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' :
                    'bg-blue-50 text-blue-800 border border-blue-200'
                  }`}>
                    <p className="text-center font-medium">{formStatus.message}</p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#1b2840] to-[#1565d8] text-white scroll-animate">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Go Global?</h2>
          <p className="text-xl mb-8">Connect with K-GEO to explore your international opportunities</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
            <div className="flex items-center justify-center gap-3">
              <Mail className="w-6 h-6" />
              <span>global@kumaraguru.in</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <MapPin className="w-6 h-6" />
              <span>K-GEO Office, Kumaraguru Campus</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
