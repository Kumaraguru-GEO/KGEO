import { useEffect, useState } from 'react';
import { Mail, MapPin } from 'lucide-react';
import heroImage from '../../assets/NUS 2024.jpg';

export function KIOutbound() {
  const [activeSection, setActiveSection] = useState('study-abroad');
  const [isNavFixed, setIsNavFixed] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    program: '',
    year: '',
    email: '',
    areaOfInterest: '',
    attachment: null as File | null,
    destination: '',
    semesterOption: '',
    projectArea: '',
    immersionTheme: '',
    interest: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const id = entry.target.getAttribute('id');
            if (id) setActiveSection(id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -50px 0px' }
    );

    document
      .querySelectorAll('.scroll-animate')
      .forEach(section => observer.observe(section));

    const handleScroll = () => {
      const heroHeight =
        document.querySelector('.hero-section')?.clientHeight || 0;
      setIsNavFixed(window.scrollY > heroHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const sections = [
    { id: 'study-abroad', label: '01 – Study Abroad' },
    { id: 'projects-internships', label: '02 – Projects & Internships' },
    { id: 'short-term', label: '03 – Short-Term Programs' },
    { id: 'summer-programs', label: '04 – Summer Schools' },
    { id: 'counseling', label: '05 – Global Future Centre' }
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 100;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top - offset, behavior: 'smooth' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-white">
      <style>{`
        .scroll-animate{opacity:0;transform:translateY(30px);transition:all 0.8s cubic-bezier(0.4,0,0.2,1)}
        .scroll-animate.visible{opacity:1;transform:translateY(0)}
      `}</style>

      {/* Hero */}
      <section className="hero-section relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="KI Outbound"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="relative z-10 text-center text-white max-w-4xl px-6">
          <h1 className="text-5xl font-bold mb-6">KI Outbound Programs</h1>
          <p className="text-xl">
            Broaden Your Classroom, Transform Your World
          </p>
        </div>
      </section>

      {/* Side Nav */}
      {isNavFixed && (
        <nav className="fixed left-6 top-1/2 -translate-y-1/2 hidden lg:block z-50">
          <div className="bg-white rounded-xl shadow-lg p-2">
            {sections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={`block px-4 py-2 my-1 rounded-lg text-sm font-semibold ${
                  activeSection === s.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {String(i + 1).padStart(2, '0')} – {s.label}
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Study Abroad */}
      <section id="study-abroad" className="py-20 px-6 bg-white scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#1565d8]/10 to-[#228be6]/10 rounded-full mb-4">
              <span className="text-[#1565d8] font-semibold text-sm">Study Abroad</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Study Abroad (Semester / Year)</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">Broaden Your Classroom, Transform Your World</p>
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto mb-12">
              Studying abroad isn't just about changing your classroom; it's about changing way you see the world. Imagine walking into a lecture hall in Paris, Berlin, or Melbourne; debating ideas with peers from across continents; living in a city where every street corner teaches you something new. A semester or year abroad is not just a chapter in your education — it's a story you'll tell for life.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-l-4 border-[#1565d8]">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h3>
                <ul className="space-y-4">
                  {['Credit transfers with partner universities', 'Pre-departure & visa support', 
                    'Accommodation + health & safety care', 'Mentorship & academic advising'].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-500 mr-3 text-xl">✔️</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

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
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#1b2840] to-[#1565d8] p-8 rounded-2xl text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-6">How It Works</h3>
                {['Apply through K-GEO portal', 'Attend pre-departure orientation', 
                  'Travel, study, and immerse yourself', 'Return & integrate credits into your degree'].map((step, i) => (
                  <div key={i} className="flex items-start mb-4">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="font-bold">{i + 1}</span>
                    </div>
                    <p className="text-white/90">{step}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-l-4 border-[#1565d8]">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Apply Form</h3>
                <div className="space-y-4">
                  {['Name', 'Program at KCT/KCLAS/KIA', 'Preferred Destination', 'Semester/Year Option', 'Upload Transcript', 'Submit'].map((field, i) => (
                    <div key={i} className="flex items-center">
                      <span className="text-[#1565d8] mr-3">[{field}]</span>
                      <div className="flex-1 h-px bg-gray-300"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-10 rounded-2xl border-l-4 border-[#228be6] mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Student Voices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { text: "My semester in Germany taught me to think like a global citizen.", author: "Ananya, BBA" },
                { text: "The friendships I formed in Spain are still my global family.", author: "Rohit, CSE" }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-md">
                  <p className="text-base text-gray-700 italic mb-3">"{testimonial.text}"</p>
                  <p className="text-[#1565d8] font-semibold">— {testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects/Internship Section */}
      <section id="projects-internships" className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#1565d8]/10 to-[#228be6]/10 rounded-full mb-4">
              <span className="text-[#1565d8] font-semibold text-sm">Projects & Internships</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Projects / Internship (Semester / Year)</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">Collaborate Across Borders on Real Challenges</p>
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto mb-12">
              The world's biggest challenges — climate change, digital disruption, inequality — don't stop at borders. Why should learning? Through international project collaborations, you'll work with peers and faculty abroad to co-create solutions that matter.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-l-4 border-[#1565d8]">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h3>
                <ul className="space-y-4">
                  {['Joint projects with global faculty mentorship', 'Access to labs, resources, and datasets abroad',
                    'Cross-institutional teamwork', 'Funding & publication opportunities'].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-500 mr-3 text-xl">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Do It?</h3>
                <ul className="space-y-4">
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
              <div className="bg-gradient-to-br from-[#1b2840] to-[#1565d8] p-8 rounded-2xl text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-6">How It Works (Project Lifecycle)</h3>
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

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-l-4 border-[#1565d8]">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Apply Form</h3>
                <div className="space-y-4">
                  {['Name', 'Department/Program', 'Project Interest Area', 'Upload Proposal Draft / CV', 'Submit'].map((field, i) => (
                    <div key={i} className="flex items-center">
                      <span className="text-[#1565d8] mr-3">[{field}]</span>
                      <div className="flex-1 h-px bg-gray-300"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-10 rounded-2xl border-l-4 border-[#228be6] mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Student Voices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Urban Pollution Project</h4>
                <p className="text-gray-600">India + Germany → joint mitigation plans</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Digital Health</h4>
                <p className="text-gray-600">App designed with Latin American university tested across two campuses</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customized Courses Section */}
      <section id="short-term" className="py-20 px-6 bg-white scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#1565d8]/10 to-[#228be6]/10 rounded-full mb-4">
              <span className="text-[#1565d8] font-semibold text-sm">Short-Term Programs</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Customized Courses (1–3 Weeks)</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">Immerse, Explore, Experience — Globally in Weeks</p>
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto mb-12">
              1 – 3 weeks. One city. The course will be aligned with a module of your study with concentrated doses of global learning: morning classes, afternoon cultural visits, evenings with new friends, and weekends exploring a new country.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {title: 'Academic Workshops', desc: 'Short courses & specialized training'},
              {title: 'Industry Visits', desc: 'Field exposure & practical learning'},
              {title: 'Cultural Trips', desc: 'Homestays & campus life abroad'},
              {title: 'Peer Interaction', desc: 'Connect with local students'}
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-2">
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
                    <span className="text-green-500 mr-3 text-xl">•</span>
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

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-10 rounded-2xl border-l-4 border-[#228be6] mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Student Voices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { text: "In Japan, I learned design thinking in 10 days — and made friends for life.", author: "Harini, Mechanical Engg" },
                { text: "Korea's exchange gave me insights into culture and technology I couldn't have imagined.", author: "Arjun, MBA" }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-md">
                  <p className="text-base text-gray-700 italic mb-3">"{testimonial.text}"</p>
                  <p className="text-[#1565d8] font-semibold text-sm">— {testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-l-4 border-[#1565d8]">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Apply Form</h3>
            <div className="space-y-4">
              {['Name', 'Year & Course', 'Preferred Immersion Theme: Sustainability / Culture / Innovation', 'Submit'].map((field, i) => (
                <div key={i} className="flex items-center">
                  <span className="text-[#1565d8] mr-3">[{field}]</span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* International Summer Schools Section */}
      <section id="summer-programs" className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#1565d8]/10 to-[#228be6]/10 rounded-full mb-4">
              <span className="text-[#1565d8] font-semibold text-sm">Summer Programs</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">International Summer Schools</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">Spend Your Summer Abroad. Learn, Travel, Transform.</p>
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto mb-12">
              Imagine spending your summer at a leading university overseas — attending classes in morning, exploring historic streets in afternoon, and making friends from across the globe at night. International Summer Schools are your chance to combine academics, travel, and culture in a 2–6 week program hosted by Kumaraguru's global partners.
            </p>
          </div>

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

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-10 rounded-2xl border-l-4 border-[#228be6] mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Student Voices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { text: "My summer in Poland opened my eyes to European culture and innovation. I made friends I still talk to daily.", author: "Shreya, BBA" },
                { text: "Singapore's summer school gave me a real taste of global business and tech ecosystems — all in four weeks!", author: "Rahul, CSE" }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-md">
                  <p className="text-base text-gray-700 italic mb-3">"{testimonial.text}"</p>
                  <p className="text-[#228be6] font-semibold text-sm">— {testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-l-4 border-[#1565d8]">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Expression of Interest Form</h3>
              <p className="text-gray-600 mb-4">Fill out this form to express your interest in summer programs</p>
            </div>
          </div>
        </div>
      </section>

      {/* COUNSELING SECTION */}
      <section
        id="counseling"
        className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white scroll-animate"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Global Future Centre</h2>
            <p className="text-gray-600 text-lg">
              Let's Talk. Let's Connect. Let's Dream Together.
            </p>
          </div>

          {/* ✅ FIXED FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-10 rounded-2xl shadow-xl border"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Course & Year
                </label>
                <input
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Area of Interest
                </label>
                <select
                  name="areaOfInterest"
                  value={formData.areaOfInterest}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-xl"
                >
                  <option value="">Select</option>
                  <option value="study-abroad">Study Abroad</option>
                  <option value="internship">Projects / Internships</option>
                  <option value="immersion">Short-Term / Immersion</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-xl"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">
                  Preferred Slot
                </label>
                <input
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  placeholder="Preferred date & time"
                  required
                  className="w-full px-4 py-3 border rounded-xl"
                />
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                type="submit"
                className="px-10 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition"
              >
                Submit Form
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-8 rounded-xl border-l-4 border-blue-600">
            <h3 className="text-2xl font-bold mb-4">Connect with us</h3>
            <div className="flex items-center mb-3">
              <Mail className="w-5 h-5 text-blue-600 mr-3" />
              <span>K-GEO mail id</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-blue-600 mr-3" />
              <span>Office location</span>
            </div>
          </div>

          <div className="bg-indigo-50 p-8 rounded-xl border-l-4 border-indigo-500">
            <h3 className="text-2xl font-bold mb-4">Single Application</h3>
            <p className="text-gray-600">
              All programs can be accessed through one unified application form.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
