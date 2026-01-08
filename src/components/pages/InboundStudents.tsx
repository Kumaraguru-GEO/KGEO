import { useEffect } from 'react';
import { BookOpen, Globe, Users, Briefcase, Lightbulb, MapPin, Clock, Award } from 'lucide-react';
import KGeo3_1 from '../../assets/K-GEO-3 (1).JPG';
import KGeo3_2 from '../../assets/K-GEO-3 (2).JPG';

const Card = ({ icon: Icon, title, items, delay = 0 }: { icon: any; title: string; items: string[]; delay?: number }) => (
  <div className="scroll-animate group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-200" style={{ animationDelay: `${delay}ms` }}>
    <div className="w-12 h-12 bg-gradient-to-br from-[#1565d8] to-[#228be6] rounded-lg flex items-center justify-center mb-4"><Icon className="w-6 h-6 text-white" /></div>
    <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
    <ul className="space-y-2">{items.map((i: string, idx: number) => (<li key={idx} className="flex gap-2"><span className="text-[#1565d8] font-bold">✓</span><span className="text-sm text-gray-700">{i}</span></li>))}</ul>
  </div>
);

export default function InboundStudents() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.scroll-animate').forEach(s => observer.observe(s));
    return () => document.querySelectorAll('.scroll-animate').forEach(s => observer.unobserve(s));
  }, []);

  return (
    <div className="bg-white">
      <style>{`
        .scroll-animate { opacity: 0; transform: translateY(30px); transition: all 0.8s ease-out; }
        .scroll-animate.visible { opacity: 1; transform: translateY(0); }
        @keyframes pop { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
        .pop { animation: pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
      `}</style>

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <img src={KGeo3_1} alt="Inbound" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center text-white">
          <div className="inline-block mb-6 px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 pop"><span className="text-sm tracking-wider uppercase">Study Abroad</span></div>
          <h1 className="text-6xl lg:text-7xl font-bold mb-6 pop" style={{animationDelay:'100ms'}}>Inbound Mobility</h1>
          <p className="text-2xl mb-8 text-white/90 max-w-4xl mx-auto pop" style={{animationDelay:'200ms'}}>Experience Academic Excellence in South India's Innovation Hub</p>
          <div className="flex flex-wrap justify-center gap-4 pop" style={{animationDelay:'300ms'}}>
            <a href="#programs" className="px-8 py-4 bg-white text-[#1565d8] rounded-full hover:bg-gray-100 transition font-semibold">Explore Programs</a>
            <a href="mailto:inbound@kumaraguru.in" className="px-8 py-4 bg-white/10 text-white border-2 border-white/40 rounded-full hover:bg-white/20 transition font-semibold">Get in Touch</a>
          </div>
        </div>
      </section>

      {/* Welcome */}
      <section className="py-20 px-6 bg-gradient-to-b from-white via-blue-50 to-white scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold text-gray-900 mb-6">Welcome to Kumaraguru</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Located in Coimbatore, Tamil Nadu — a city renowned for entrepreneurial spirit, technology clusters, and cultural richness.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card icon={BookOpen} title="Academic Excellence" items={['24 undergraduate programs', '16 postgraduate programs', 'Engineering, Management, Agriculture, Liberal Arts & Design', 'Courses in English', 'Centers of Excellence']} />
            <Card icon={Globe} title="Campus Life" items={['300-acre vibrant campus', '100+ student clubs', 'Sports arenas & innovation labs', 'Community service programs', 'Residential for 3,000 students']} />
            <Card icon={MapPin} title="Coimbatore" items={['"Manchester of South India"', 'Safe, student-friendly', 'Affordable living ($300-400/month)', 'International Airport', 'Gateway to South India']} />
          </div>
          <div className="bg-gradient-to-br from-[#1b2840] to-[#1565d8] rounded-2xl p-10 text-white shadow-2xl">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div><div className="text-5xl font-bold mb-2">24</div><p className="text-white/90">Undergraduate</p></div>
              <div><div className="text-5xl font-bold mb-2">16</div><p className="text-white/90">Postgraduate</p></div>
              <div><div className="text-5xl font-bold mb-2">300</div><p className="text-white/90">Acres</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Program 1 */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div><span className="inline-block px-4 py-1 bg-gradient-to-r from-[#1565d8]/10 to-[#228be6]/10 rounded-full mb-4"><span className="text-[#1565d8] font-bold text-sm">Program 1</span></span><h3 className="text-4xl font-bold text-gray-900 mb-4">Study Abroad (Semester / Year)</h3><p className="text-lg text-gray-700 mb-6">Broaden your classroom and transform your world. Living and learning in a campus blending modern academics with vibrant Indian culture.</p><div className="space-y-3"><div className="flex gap-3"><span className="text-[#1565d8] font-bold text-xl">•</span><span className="text-gray-700">Flexible credit transfer agreements</span></div><div className="flex gap-3"><span className="text-[#1565d8] font-bold text-xl">•</span><span className="text-gray-700">Academic advising for curriculum alignment</span></div><div className="flex gap-3"><span className="text-[#1565d8] font-bold text-xl">•</span><span className="text-gray-700">Orientation week & buddy program</span></div><div className="flex gap-3"><span className="text-[#1565d8] font-bold text-xl">•</span><span className="text-gray-700">Health, counseling, visa support</span></div></div></div>
            <img src={KGeo3_2} alt="Study Abroad" className="rounded-2xl shadow-2xl h-80 w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Study Abroad Details */}
      <section className="py-20 px-6 bg-white scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card icon={BookOpen} title="Academics" items={['Courses in English', 'Flexible credit transfer', 'Academic advising', 'Centers of Excellence']} delay={0} />
            <Card icon={Users} title="Campus Life & Support" items={['Residential facilities', 'Orientation & buddy', 'Health & counseling', 'Visa support']} delay={100} />
            <Card icon={MapPin} title="Living in Coimbatore" items={['"Manchester of South"', 'Safe, student-friendly', 'Affordable living', 'Cultural gateway']} delay={200} />
          </div>
          <div className="bg-gradient-to-r from-[#1565d8]/10 to-[#228be6]/10 rounded-2xl p-10 border border-[#1565d8]/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Apply</h3>
            <ol className="space-y-4 mb-8"><li className="flex gap-4"><span className="w-8 h-8 bg-[#1565d8] text-white rounded-full flex items-center justify-center font-bold">1</span><span className="text-gray-700">Check if your home university is a partner</span></li><li className="flex gap-4"><span className="w-8 h-8 bg-[#1565d8] text-white rounded-full flex items-center justify-center font-bold">2</span><span className="text-gray-700">Submit application (form, transcript, SOP)</span></li><li className="flex gap-4"><span className="w-8 h-8 bg-[#1565d8] text-white rounded-full flex items-center justify-center font-bold">3</span><span className="text-gray-700">Receive admission & visa support</span></li><li className="flex gap-4"><span className="w-8 h-8 bg-[#1565d8] text-white rounded-full flex items-center justify-center font-bold">4</span><span className="text-gray-700">Join orientation & begin</span></li></ol>
            <a href="mailto:inbound@kumaraguru.in" className="inline-block px-8 py-3 bg-gradient-to-r from-[#1565d8] to-[#228be6] text-white font-semibold rounded-full hover:shadow-lg transition">Apply Now</a>
          </div>
        </div>
      </section>

      {/* Program 2 */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <img src={KGeo3_1} alt="Research" className="rounded-2xl shadow-2xl h-80 w-full object-cover order-2 lg:order-1" />
            <div className="order-1 lg:order-2"><span className="inline-block px-4 py-1 bg-gradient-to-r from-[#1565d8]/10 to-[#228be6]/10 rounded-full mb-4"><span className="text-[#1565d8] font-bold text-sm">Program 2</span></span><h3 className="text-4xl font-bold text-gray-900 mb-4">Research Projects (Semester / Year)</h3><p className="text-lg text-gray-700 mb-6">Turn ideas into impact. Coimbatore hosts 50,000+ MSMEs, 1,300+ startups, strong clusters in textiles, automotive, renewable energy, SaaS, and agritech.</p><div className="space-y-3"><div className="flex gap-3"><span className="text-[#1565d8] font-bold text-xl">•</span><span className="text-gray-700">Faculty-led research projects</span></div><div className="flex gap-3"><span className="text-[#1565d8] font-bold text-xl">•</span><span className="text-gray-700">Internships with industry, startups, NGOs</span></div><div className="flex gap-3"><span className="text-[#1565d8] font-bold text-xl">•</span><span className="text-gray-700">Joint supervision by faculty & mentors</span></div></div></div>
          </div>
        </div>
      </section>

      {/* Research Details */}
      <section className="py-20 px-6 bg-white scroll-animate">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Domains & Thematic Areas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card icon={Globe} title="Smart Cities & Sustainability" items={['Collaborate with industry experts', 'Cutting-edge research initiatives', 'Real-world impact projects']} delay={0} />
            <Card icon={Briefcase} title="Textile Innovation & Manufacturing 4.0" items={['Industry partnerships', 'Advanced manufacturing', 'Innovation labs']} delay={100} />
            <Card icon={Lightbulb} title="Renewable Energy & Water" items={['Sustainable solutions', 'Environmental research', 'Field projects']} delay={200} />
            <Card icon={Award} title="Healthcare Tech & Community" items={['Community health initiatives', 'Tech solutions', 'Social impact']} delay={300} />
            <Card icon={BookOpen} title="Agritech & Food Security" items={['Agricultural innovation', 'Food systems research', 'Farmer partnerships']} delay={400} />
            <Card icon={Users} title="Digital Transformation & AI" items={['AI research', 'Digital solutions', 'Tech collaboration']} delay={500} />
          </div>
          <div className="bg-gradient-to-r from-[#1565d8]/10 to-[#228be6]/10 rounded-2xl p-10 border border-[#1565d8]/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Apply</h3>
            <ul className="space-y-3 mb-8"><li className="flex gap-3"><span className="text-[#1565d8] font-bold">→</span><span className="text-gray-700">Submit interest with transcript & project area</span></li><li className="flex gap-3"><span className="text-[#1565d8] font-bold">→</span><span className="text-gray-700">Match with faculty/industry partner</span></li><li className="flex gap-3"><span className="text-[#1565d8] font-bold">→</span><span className="text-gray-700">Receive confirmation & credits agreed</span></li></ul>
            <a href="mailto:inbound@kumaraguru.in" className="inline-block px-8 py-3 bg-gradient-to-r from-[#1565d8] to-[#228be6] text-white font-semibold rounded-full hover:shadow-lg transition">Propose a Project</a>
          </div>
        </div>
      </section>

      {/* Program 3 */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div><span className="inline-block px-4 py-1 bg-gradient-to-r from-[#1565d8]/10 to-[#228be6]/10 rounded-full mb-4"><span className="text-[#1565d8] font-bold text-sm">Program 3</span></span><h3 className="text-4xl font-bold text-gray-900 mb-4">Faculty-Led Programs (1–4 Weeks)</h3><p className="text-lg text-gray-700 mb-6">Your faculty, our campus, a shared journey. Kumaraguru designs faculty-led short-term programs in collaboration with international universities.</p><div className="space-y-3"><div className="flex gap-3"><span className="text-[#1565d8] font-bold text-xl">•</span><span className="text-gray-700">Co-designed syllabi blending goals with India's context</span></div><div className="flex gap-3"><span className="text-[#1565d8] font-bold text-xl">•</span><span className="text-gray-700">Industry visits to MSMEs, IT parks, renewable energy</span></div><div className="flex gap-3"><span className="text-[#1565d8] font-bold text-xl">•</span><span className="text-gray-700">Cultural tours and evening sessions</span></div></div></div>
            <img src={KGeo3_2} alt="Faculty Programs" className="rounded-2xl shadow-2xl h-80 w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Faculty Details */}
      <section className="py-20 px-6 bg-white scroll-animate">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Sample 2-Week Itinerary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-[#1565d8]/5 to-transparent rounded-2xl p-8 border border-[#1565d8]/20"><h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Clock className="w-6 h-6 text-[#1565d8]" />Week 1</h4><ul className="space-y-2"><li className="flex gap-2"><span className="text-[#1565d8] font-bold">•</span><span className="text-gray-700">Morning lectures on core topics</span></li><li className="flex gap-2"><span className="text-[#1565d8] font-bold">•</span><span className="text-gray-700">Afternoon industry visits</span></li><li className="flex gap-2"><span className="text-[#1565d8] font-bold">•</span><span className="text-gray-700">Cultural evenings & networking</span></li></ul></div>
            <div className="bg-gradient-to-br from-[#228be6]/5 to-transparent rounded-2xl p-8 border border-[#228be6]/20"><h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Clock className="w-6 h-6 text-[#228be6]" />Week 2</h4><ul className="space-y-2"><li className="flex gap-2"><span className="text-[#228be6] font-bold">•</span><span className="text-gray-700">Field project immersion</span></li><li className="flex gap-2"><span className="text-[#228be6] font-bold">•</span><span className="text-gray-700">Reflective sessions & discussions</span></li><li className="flex gap-2"><span className="text-[#228be6] font-bold">•</span><span className="text-gray-700">Student presentations & closure</span></li></ul></div>
          </div>
          <div className="bg-gradient-to-r from-[#1565d8]/10 to-[#228be6]/10 rounded-2xl p-10 border border-[#1565d8]/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Plan Your Program</h3>
            <ol className="space-y-4 mb-8"><li className="flex gap-4"><span className="w-8 h-8 bg-[#1565d8] text-white rounded-full flex items-center justify-center font-bold">1</span><span className="text-gray-700">Faculty contacts us with program idea</span></li><li className="flex gap-4"><span className="w-8 h-8 bg-[#1565d8] text-white rounded-full flex items-center justify-center font-bold">2</span><span className="text-gray-700">Co-design syllabus, duration, credits</span></li><li className="flex gap-4"><span className="w-8 h-8 bg-[#1565d8] text-white rounded-full flex items-center justify-center font-bold">3</span><span className="text-gray-700">Confirm logistics & participants</span></li></ol>
            <a href="mailto:inbound@kumaraguru.in" className="inline-block px-8 py-3 bg-gradient-to-r from-[#1565d8] to-[#228be6] text-white font-semibold rounded-full hover:shadow-lg transition">Plan a Program</a>
          </div>
        </div>
      </section>

      {/* Program 4 */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white scroll-animate">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <img src={KGeo3_1} alt="Summer Schools" className="rounded-2xl shadow-2xl h-80 w-full object-cover order-2 lg:order-1" />
            <div className="order-1 lg:order-2"><span className="inline-block px-4 py-1 bg-gradient-to-r from-[#1565d8]/10 to-[#228be6]/10 rounded-full mb-4"><span className="text-[#1565d8] font-bold text-sm">Program 4</span></span><h3 className="text-4xl font-bold text-gray-900 mb-4">Summer & Winter Schools (2–4 Weeks)</h3><p className="text-lg text-gray-700 mb-6">Spend a few weeks in India and gain a lifetime of perspective. Short, intensive, credit-bearing programs combining academics, fieldwork, and cultural immersion.</p><div className="space-y-3"><div className="flex gap-3"><span className="text-[#1565d8] font-bold text-xl">•</span><span className="text-gray-700">Entrepreneurship & Innovation track</span></div><div className="flex gap-3"><span className="text-[#1565d8] font-bold text-xl">•</span><span className="text-gray-700">Design Thinking & Creativity</span></div><div className="flex gap-3"><span className="text-[#1565d8] font-bold text-xl">•</span><span className="text-gray-700">Sustainable Agriculture & Food Systems</span></div></div></div>
          </div>
        </div>
      </section>

      {/* Summer Details */}
      <section className="py-20 px-6 bg-white scroll-animate">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Sample Daily Flow</h3>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              <div className="p-8 bg-gradient-to-br from-[#1565d8]/5 to-transparent"><h4 className="font-bold text-[#1565d8] mb-2">9:00–12:00</h4><p className="text-gray-700 text-sm">Academic session</p></div>
              <div className="p-8 bg-gradient-to-br from-[#228be6]/5 to-transparent"><h4 className="font-bold text-[#228be6] mb-2">12:00–1:00</h4><p className="text-gray-700 text-sm">Lunch & networking</p></div>
              <div className="p-8 bg-gradient-to-br from-[#1565d8]/5 to-transparent"><h4 className="font-bold text-[#1565d8] mb-2">1:30–4:30</h4><p className="text-gray-700 text-sm">Field visits</p></div>
              <div className="p-8 bg-gradient-to-br from-[#228be6]/5 to-transparent"><h4 className="font-bold text-[#228be6] mb-2">6:00–8:00</h4><p className="text-gray-700 text-sm">Cultural immersion</p></div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-[#1565d8]/10 to-[#228be6]/10 rounded-2xl p-10 border border-[#1565d8]/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Apply</h3>
            <ol className="space-y-4 mb-8"><li className="flex gap-4"><span className="w-8 h-8 bg-[#1565d8] text-white rounded-full flex items-center justify-center font-bold">1</span><span className="text-gray-700">Choose your track & session (summer or winter)</span></li><li className="flex gap-4"><span className="w-8 h-8 bg-[#1565d8] text-white rounded-full flex items-center justify-center font-bold">2</span><span className="text-gray-700">Submit application with transcript & SOP</span></li><li className="flex gap-4"><span className="w-8 h-8 bg-[#1565d8] text-white rounded-full flex items-center justify-center font-bold">3</span><span className="text-gray-700">Receive confirmation & visa guidance</span></li></ol>
            <a href="mailto:inbound@kumaraguru.in" className="inline-block px-8 py-3 bg-gradient-to-r from-[#1565d8] to-[#228be6] text-white font-semibold rounded-full hover:shadow-lg transition">Apply for Summer/Winter School</a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#1565d8]/10 to-[#228be6]/10 scroll-animate">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-lg text-gray-700 mb-8">Join thousands of international students who have transformed their academic experience at Kumaraguru Institutions.</p>
          <a href="mailto:inbound@kumaraguru.in" className="inline-block px-10 py-4 bg-gradient-to-r from-[#1565d8] to-[#228be6] text-white font-semibold rounded-full hover:shadow-lg transition transform hover:scale-105">Contact Us Today</a>
        </div>
      </section>
    </div>
  );
}
