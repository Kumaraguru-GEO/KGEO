import { Mail, Linkedin, ArrowRight, Globe, Users, BookOpen, Target, Handshake, TrendingUp, Building2, GraduationCap, Award, MapPin } from 'lucide-react';
import { useEffect } from 'react';
import heroImage1 from '../../assets/LISS 2023 _ 002.jpeg';
import heroImage2 from '../../assets/NUS 2024.jpg';
import institutionsLogo from '../../assets/Kct_product.jpeg';

export function AboutPage() {
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
  const statistics = [
    { 
      value: '300', 
      label: 'Acres across three campuses',
      description: 'Designed to nurture inquiry and creativity',
      icon: MapPin
    },
    { 
      value: '42', 
      label: 'Programs',
      description: 'Shaping scholars and practitioners across disciplines',
      icon: BookOpen
    },
    { 
      value: '800+', 
      label: 'Faculty and Staff',
      description: 'Combining academic depth with research-driven innovation',
      icon: Users
    },
    { 
      value: '12+', 
      label: 'Centres of Excellence',
      description: 'Industry-Sponsored Labs bridging academia and industry',
      icon: Award
    },
    { 
      value: '9,000+', 
      label: 'Students Annually',
      description: 'Experiencing holistic education with real-world engagement',
      icon: GraduationCap
    },
    { 
      value: '4,000', 
      label: 'Residential Students',
      description: 'Across 10 blocks with vibrant student centres',
      icon: Building2
    },
    { 
      value: '34,000+', 
      label: 'Global Alumni',
      description: 'A community of leaders and changemakers worldwide',
      icon: Globe
    },
  ];

  const pillars = [
    {
      title: 'Expand Global Partnerships',
      desc: 'We build enduring partnerships with leading universities, research centers, and global networks, creating avenues for shared learning, dual degrees, and international projects.',
      icon: Handshake
    },
    {
      title: "Students' Global Mobility",
      desc: 'Through study abroad, exchange programs, and short-term immersions, we ensure our students experience diverse academic cultures, global perspectives, and cross-border friendships.',
      icon: Users
    },
    {
      title: 'Global Research',
      desc: 'We foster collaborative research with international scholars to address challenges of sustainability, technology, health, and society, ensuring our campuses remain hubs of knowledge creation.',
      icon: BookOpen
    },
    {
      title: 'Internationalization on Campus',
      desc: 'By welcoming international students, faculty, and delegations, and by embedding intercultural learning in our curriculum, we create a truly global campus environment.',
      icon: Globe
    },
    {
      title: 'Joint Programs',
      desc: 'From joint degrees to summer schools and co-taught courses, we design innovative learning formats that combine academic rigor with cultural exchange.',
      icon: Target
    },
    {
      title: 'Global Outreach',
      desc: 'Our engagement goes beyond academics—through conferences, cultural collaborations, and community projects, we extend Kumaraguru\'s impact to international communities.',
      icon: TrendingUp
    },
  ];

  const teamMembers = [
    {
      name: 'Dr. Global Lead',
      role: 'Director, Global Engagement',
      email: 'global@kumaraguru.in',
    },
    {
      name: 'Dr. International Coordinator',
      role: 'Associate Director',
      email: 'intl@kumaraguru.in',
    },
    {
      name: 'Dr. Partnership Manager',
      role: 'Manager, Global Partnerships',
      email: 'partnerships@kumaraguru.in',
    },
  ];

  const schoolAnchors = [
    { name: 'Dr. Thirumal PC', school: 'Computing Sciences' },
    { name: 'Dr. Suganthi ST', school: 'Electrical Sciences' },
    { name: 'Dr. Samuel Ratna Kumar PS', school: 'Mechanical Sciences' },
    { name: 'Dr. Saminathan N', school: 'Textile & Apparels' },
    { name: 'Dr. Arul H', school: 'Applied Sciences' },
    { name: 'Dr. Venkatesh', school: 'Business School' },
  ];

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

      {/* Hero Section - Kumaraguru Institutions */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage1}
            alt="Kumaraguru Institutions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center text-white">
          <div className="inline-block mb-6 px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="text-white font-semibold text-sm tracking-wider uppercase">
              Established 1984
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Kumaraguru Institutions
          </h1>
          <p className="text-xl sm:text-2xl mb-4 text-white/90 leading-relaxed max-w-4xl mx-auto">
            A Legacy of Vision and Purpose
          </p>
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">
            Offering education that is exceptional, inspirational, and transformative since 1984
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#legacy"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1565d8] rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl font-semibold"
            >
              Our Legacy
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#kgeo"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/40 rounded-full hover:bg-white/20 transition-all font-semibold"
            >
              Discover K-GEO
            </a>
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section id="legacy" className="py-20 px-6 bg-white scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Four Decades of Excellence
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Kumaraguru Institutions (KI) was founded in 1984 with the establishment of Kumaraguru College of Technology (KCT), and has since grown into a constellation of institutions that embody a singular vision: to offer education that is exceptional, inspirational, and transformative.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Over the years, this vision has flourished into the KCT Business School, the Kumaraguru Institute of Agriculture, and the Kumaraguru College of Liberal Arts and Science. Together, they represent the enduring commitment of the Sakthi Group of Companies and the profound foresight of the Founder Chairman, Arutchelvar Dr. N. Mahalingam.
              </p>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border-l-4 border-[#1565d8]">
                <p className="text-gray-800 italic text-lg leading-relaxed">
                  "The founding vision was not merely to impart knowledge, but to expand intellectual horizons and cultivate empowered, conscientious citizens."
                </p>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Rooted in this philosophy, Kumaraguru has become more than an academic space — it is a living ecosystem of learning, innovation, and character-building.
              </p>
            </div>
            
            {/* Institutions Logo */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-xl border border-gray-200">
                <img
                  src={institutionsLogo}
                  alt="Kumaraguru Institutions"
                  className="w-full h-auto rounded-2xl"
                />
                <p className="text-center mt-6 text-gray-600 font-medium">
                  The Kumaraguru Family of Institutions
                </p>
              </div>
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-[#1565d8] to-[#228be6] text-white px-6 py-3 rounded-full shadow-lg">
                <span className="font-bold text-lg">Since 1984</span>
              </div>
            </div>
          </div>
          
          {/* Strategic Location */}
          <div className="mt-16 bg-gradient-to-r from-[#1b2840] to-[#1565d8] rounded-3xl p-10 text-white">
            <div className="flex items-center gap-4 mb-4">
              <MapPin className="w-8 h-8" />
              <h3 className="text-2xl font-bold">Strategic Location</h3>
            </div>
            <p className="text-lg leading-relaxed text-white/90">
              KI is strategically located in Coimbatore, one of India's fastest-growing educational and entrepreneurial hubs. This synergy enables cross-disciplinary learning, fostering the kind of integrated knowledge that today's world demands.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section - The Scale of Kumaraguru */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              The Scale of Kumaraguru
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive educational ecosystem nurturing inquiry, creativity, and global excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {statistics.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1565d8] to-[#228be6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  
                  {/* Icon */}
                  <div className="w-14 h-14 bg-gradient-to-br from-[#1565d8]/10 to-[#228be6]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-[#1565d8]" />
                  </div>
                  
                  {/* Number */}
                  <p className="text-3xl font-bold bg-gradient-to-r from-[#1565d8] to-[#228be6] bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </p>
                  
                  {/* Label */}
                  <p className="text-gray-900 font-semibold text-sm mb-2">
                    {stat.label}
                  </p>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* K-GEO Introduction Section */}
      <section id="kgeo" className="py-20 px-6 bg-gradient-to-br from-[#1b2840] to-[#1565d8] text-white scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Kumaraguru Global Engagement Office (K-GEO)
            </h2>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto text-white/90">
              At Kumaraguru Institutions, global engagement is not an initiative—it is a mission. We believe that education must transcend borders, disciplines, and cultures to prepare students for a rapidly transforming world.
            </p>
            <p className="text-lg mt-6 leading-relaxed max-w-4xl mx-auto text-white/80">
              Through K-GEO, we invite universities, researchers, and institutions worldwide to co-create pathways of learning, research, and impact.
            </p>
          </div>
          
          {/* Images Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage1}
                alt="Global Collaboration"
                className="w-full h-[300px] object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage2}
                alt="International Partnership"
                className="w-full h-[300px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Pillars Section */}
      <section className="py-20 px-6 bg-white scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Our Six Pillars of Global Engagement
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Defining how we expand horizons and deepen international collaborations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={index}
                  className="group relative p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#1565d8]/5 to-[#228be6]/5 rounded-full blur-3xl"></div>
                  <div className="relative">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#1565d8] to-[#228be6] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="bg-gradient-to-r from-[#1565d8] to-[#228be6] text-white text-2xl font-bold w-10 h-10 rounded-full flex items-center justify-center">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {pillar.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals driving global engagement and international collaboration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 text-center overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1565d8] to-[#228be6]"></div>
                <div className="w-28 h-28 rounded-full mx-auto mb-6 flex items-center justify-center text-white bg-gradient-to-br from-[#1565d8] to-[#228be6] shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl font-bold">
                    {member.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h4>
                <p className="text-gray-600 mb-6">
                  {member.role}
                </p>
                <div className="flex justify-center gap-3">
                  <a
                    href={`mailto:${member.email}`}
                    className="w-12 h-12 rounded-full bg-gray-100 hover:bg-[#1565d8] flex items-center justify-center transition-all group/icon"
                  >
                    <Mail className="w-5 h-5 text-gray-600 group-hover/icon:text-white transition-colors" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full bg-gray-100 hover:bg-[#228be6] flex items-center justify-center transition-all group/icon"
                  >
                    <Linkedin className="w-5 h-5 text-gray-600 group-hover/icon:text-white transition-colors" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* School Anchors */}
          <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              School Anchors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schoolAnchors.map((anchor, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border border-transparent hover:border-[#1565d8]"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1565d8] to-[#228be6] flex items-center justify-center flex-shrink-0 text-white font-bold shadow-lg">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold text-sm">
                      {anchor.name}
                    </p>
                    <p className="text-gray-600 text-xs">
                      {anchor.school}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Partner With Us */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50 scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1b2840] via-[#1565d8] to-[#228be6] p-16 text-center shadow-2xl">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="inline-block mb-6 px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="text-white font-semibold text-sm tracking-wider uppercase">
                  Partnership Opportunities
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Welcome to Partner with Us
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
                We invite universities, institutions, and networks worldwide to collaborate with Kumaraguru Institutions. Together, we can create transformative opportunities for students, advance meaningful research, and build bridges across borders.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:global@kumaraguru.in"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1565d8] rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl font-semibold"
                >
                  Start Collaboration
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="https://kumaraguru.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/40 rounded-full hover:bg-white/20 transition-all font-semibold"
                >
                  Visit Kumaraguru.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
