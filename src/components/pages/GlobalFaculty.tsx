import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  institution: string;
  country: string;
  expertise: string;
  engagement: string[];
  message: string;
}

interface EngagementCardProps {
  title: string;
  subtitle: string;
  description: string;
  howItWorks: string[];
  support: string[];
  expectations: string[];
  testimonial: string;
  stats?: Array<{ value: string; label: string }>;
  ctaText: string;
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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="bg-white">
      {/* Hero Section - Global Faculty Engagement */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/src/assets/images/global-faculty-main.jpg"
            alt="Global Faculty Engagement"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center text-white">
          <div className="inline-block mb-6 px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="text-white font-semibold text-sm tracking-wider uppercase">
              Global Faculty Network
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Global Faculty Engagement
          </h1>
          <p className="text-xl sm:text-2xl mb-4 text-white/90 leading-relaxed max-w-4xl mx-auto">
            Join Our Globally Networked Campus
          </p>
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">
            Collaborate with Kumaraguru Institutions to shape the future of education and research through international teaching partnerships
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#engagement"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1565d8] rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl font-semibold"
            >
              Explore Opportunities
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/40 rounded-full hover:bg-white/20 transition-all font-semibold"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="engagement">

      {/* Engagement Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="flex w-full overflow-x-auto pb-2 mb-8 scrollbar-hide">
          <TabsTrigger 
            value="overview" 
            className="px-4 py-2 text-sm font-medium whitespace-nowrap"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="masterclass" 
            className="px-4 py-2 text-sm font-medium whitespace-nowrap"
          >
            Online Masterclass
          </TabsTrigger>
          <TabsTrigger 
            value="virtual" 
            className="px-4 py-2 text-sm font-medium whitespace-nowrap"
          >
            Virtual Teaching
          </TabsTrigger>
          <TabsTrigger 
            value="coil" 
            className="px-4 py-2 text-sm font-medium whitespace-nowrap"
          >
            COIL Program
          </TabsTrigger>
          <TabsTrigger 
            value="visiting" 
            className="px-4 py-2 text-sm font-medium whitespace-nowrap"
          >
            Visiting Faculty
          </TabsTrigger>
          <TabsTrigger 
            value="adjunct" 
            className="px-4 py-2 text-sm font-medium whitespace-nowrap"
          >
            Adjunct Faculty
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-white rounded-lg shadow-lg p-8 mb-12"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold mb-6">Join Our Global Faculty Network</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Kumaraguru Institutions (KI) is committed to creating a globally networked campus where ideas, expertise, and innovation cross borders. Each year, we invite distinguished academics, researchers, and professionals from around the world to collaborate with us through teaching, mentoring, and knowledge-sharing engagements.
                </p>
                <div className="grid md:grid-cols-3 gap-8 mt-10">
                  <StatCard number="120+" label="International Faculty" description="From 30+ countries" />
                  <StatCard number="5" label="Years" description="Of successful global collaborations" />
                  <StatCard number="1000+" label="Students Impacted" description="Through global learning" />
                </div>
              </div>
              <div className="order-1 md:order-2 flex items-start justify-center">
                <img 
                  src="/src/assets/images/overview.jpg" 
                  alt="Global Faculty Overview" 
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="masterclass">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-white rounded-lg shadow-lg p-8 mb-12"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold mb-6">Online Masterclasses (1-2 Hours)</h2>
                <p className="text-xl text-gray-600 mb-4">A window to your expertise, for our students anywhere in the world.</p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Short, high-impact online lectures or workshops where global faculty deliver cutting-edge knowledge in their area of expertise — typically 60-120 minutes.
                </p>
                
                <div className="grid md:grid-cols-1 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      How It Works
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Conducted via Zoom / MS Teams</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Integrated into department seminars, clubs, or course enrichment</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Audience: undergraduate/graduate students + faculty</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Support by KI
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Technical setup and IT support</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Publicity to ensure strong student turnout</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Certificates of appreciation issued</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Expectations
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>A well-prepared presentation/workshop</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Interactive Q&A engagement</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Sharing slides/reading materials post-session</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500 mb-8 mt-8">
                  <p className="italic text-gray-700">"My masterclass on Sustainable Cities at Kumaraguru connected me to bright young minds who asked global questions with local insight."</p>
                  <p className="text-sm text-gray-600 mt-2">– Prof. Maria Lopez, Spain</p>
                </div>

                {/* CTA Button */}
                <div className="text-center">
                  <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">
                    Offer a Masterclass
                  </Button>
                </div>
              </div>
              
              <div className="order-1 md:order-2 flex items-start justify-center">
                <img 
                  src="/src/assets/images/online-masterclass.JPG" 
                  alt="Online Masterclass Session" 
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="virtual">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-white rounded-lg shadow-lg p-8 mb-12"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold mb-6">Virtual Teaching (Part of a Module)</h2>
                <p className="text-xl text-gray-600 mb-4">Teach across continents, seamlessly integrated into our curriculum.</p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Global faculty virtually teach selected lectures or units within an existing Kumaraguru course (3-6 sessions).
                </p>
                
                <div className="grid md:grid-cols-1 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      How It Works
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Planned with Kumaraguru faculty to align learning outcomes</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Delivered synchronously (live classes) or asynchronously (recorded lectures)</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Credits remain within Kumaraguru's program, with your contribution highlighted</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Support by KI
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Course integration support</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Scheduling across time zones</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Co-teaching model with Kumaraguru faculty</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center">
                      <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Expectations
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Deliver 2-4 weeks of course content</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Provide learning materials and assessments for your segment</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Participate in reflection/discussion with students</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500 mb-8 mt-8">
                  <p className="italic text-gray-700">"Teaching virtually for the International Business module was seamless — the co-teaching model with Kumaraguru faculty made the integration smooth."</p>
                  <p className="text-sm text-gray-600 mt-2">– Dr. Andrew Clarke, UK</p>
                </div>

                {/* CTA Button */}
                <div className="text-center">
                  <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">
                    Become a Virtual Instructor
                  </Button>
                </div>
              </div>
              
              <div className="order-1 md:order-2 flex items-start justify-center">
                <img 
                  src="/src/assets/images/visiting-faculty.jpg" 
                  alt="Virtual Teaching Session" 
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="coil">
          <EngagementCard 
            title="COIL (Collaborative Online International Learning)"
            subtitle="Two classrooms. Two countries. One shared learning journey."
            description="COIL connects Kumaraguru students with international peers to co-learn and co-create under joint facilitation by both institutions' faculty."
            howItWorks={[
              "Co-designed course modules with faculty from both institutions",
              "Collaborative projects, group discussions, virtual presentations",
              "Duration: 4-8 weeks within a semester"
            ]}
            support={[
              "Curriculum co-design support",
              "IT platforms for collaboration",
              "Student facilitators for coordination"
            ]}
            expectations={[
              "Joint planning and alignment of learning outcomes",
              "Regular virtual check-ins",
              "Assessment of collaborative deliverables"
            ]}
            stats={[
              { value: "15+", label: "COIL modules" },
              { value: "400+", label: "Students impacted" },
              { value: "10+", label: "Disciplines" }
            ]}
            testimonial={`"Our COIL program on Digital Cultures had students in India and Canada working as one team. The cross-cultural collaboration was eye-opening." 
– Prof. James Robinson, Canada`}
            ctaText="Start a COIL Program"
          />
        </TabsContent>

        <TabsContent value="visiting">
          <EngagementCard 
            title="Visiting Faculty (Block Teaching)"
            subtitle="Come to Coimbatore. Teach, immerse, and collaborate."
            description="Faculty spend 1-4 weeks on campus delivering block teaching (intensive modules) within a course."
            howItWorks={[
              "Faculty visit Coimbatore to deliver 8-20 hours of lectures/workshops",
              "Integrated into undergraduate or postgraduate programs",
              "May include guest seminars, workshops, and student mentoring"
            ]}
            support={[
              "Travel, visa, and accommodation assistance",
              "Campus facilities, office space, and teaching support",
              "Cultural immersion opportunities (city tours, heritage visits)"
            ]}
            expectations={[
              "Deliver part of a module or a short course",
              "Mentor students and collaborate with Kumaraguru faculty",
              "Share teaching materials for continuity"
            ]}
            testimonial={"\"My two weeks at Kumaraguru were unforgettable — the energy of the students, the hospitality, and the academic openness made it a rich exchange.\" \n– Prof. Keiko Tanaka, Japan"}
            ctaText="Plan Your Visit"
          />
        </TabsContent>

        <TabsContent value="adjunct">
          <EngagementCard 
            title="Adjunct Faculty (Hybrid Teaching)"
            subtitle="Shape entire courses with a blend of on-campus and online teaching."
            description="Global faculty appointed as Adjunct Faculty, co-owning full courses with Kumaraguru. Teaching is a hybrid model: some sessions online, some delivered in person during campus visits."
            howItWorks={[
              "Semester-long teaching (full 3-credit or 4-credit courses)",
              "Course designed jointly with Kumaraguru department",
              "Faculty may visit once during the semester for in-person teaching"
            ]}
            support={[
              "Administrative appointment as Adjunct Faculty",
              "Assistance with curriculum design, student assessments, and grading",
              "Long-term research and collaboration opportunities"
            ]}
            expectations={[
              "Design & deliver full course (hybrid)",
              "Mentor students, assess assignments, and engage in academic life",
              "Collaborate on research/publications with Kumaraguru peers"
            ]}
            testimonial={"\"As an Adjunct Faculty, I've been able to guide students over an entire semester, building meaningful academic relationships.\" \n– Dr. Miguel Fernandez, Spain"}
            ctaText="Become an Adjunct Faculty"
          />
        </TabsContent>
      </Tabs>

      {/* How to Partner Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 my-12"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">How to Partner With Us</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <StepCard 
              number="1" 
              title="Explore" 
              description="Choose the engagement type that matches your expertise and availability." 
            />
            <StepCard 
              number="2" 
              title="Submit" 
              description="Fill out our Expression of Interest form with your details." 
            />
            <StepCard 
              number="3" 
              title="Connect" 
              description="Our team will reach out to discuss the next steps." 
            />
          </div>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Submit Expression of Interest
          </Button>
        </div>
      </motion.section>

      {/* Contact Form */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="bg-white rounded-2xl shadow-lg p-8 my-12"
        id="contact"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
          <p className="text-gray-600 mb-8">Have questions? Our team is here to help you with your global faculty journey.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <Input 
                  id="name" 
                  placeholder="Your name" 
                  className="w-full" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your.email@institution.edu" 
                  className="w-full" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                <Input 
                  id="institution" 
                  placeholder="Your institution" 
                  className="w-full" 
                  value={formData.institution}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <Input 
                  id="country" 
                  placeholder="Your country" 
                  className="w-full" 
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 mb-1">Area of Expertise</label>
              <Input 
                id="expertise" 
                placeholder="Your field of expertise" 
                className="w-full" 
                value={formData.expertise}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label htmlFor="engagement" className="block text-sm font-medium text-gray-700 mb-1">
                Type of Engagement (Select all that apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="masterclass" 
                    className="rounded border-gray-300" 
                    checked={formData.engagement.includes('masterclass')}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="masterclass" className="text-sm">Online Masterclass</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="virtual" 
                    className="rounded border-gray-300"
                    checked={formData.engagement.includes('virtual')}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="virtual" className="text-sm">Virtual Teaching</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="coil" 
                    className="rounded border-gray-300"
                    checked={formData.engagement.includes('coil')}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="coil" className="text-sm">COIL Program</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="visiting" 
                    className="rounded border-gray-300"
                    checked={formData.engagement.includes('visiting')}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="visiting" className="text-sm">Visiting Faculty</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="adjunct" 
                    className="rounded border-gray-300"
                    checked={formData.engagement.includes('adjunct')}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="adjunct" className="text-sm">Adjunct Faculty</label>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
              <Textarea
                id="message"
                placeholder="Tell us about your interest in collaborating with us..."
                className="min-h-[120px]"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </motion.section>
      </div>
    </div>
  );
};

// Reusable Components
function StatCard({ number, label, description }: { number: string; label: string; description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-xl shadow-md text-center"
    >
      <div className="text-4xl font-bold text-blue-600 mb-2">{number}</div>
      <h3 className="text-lg font-semibold mb-1">{label}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
}

function EngagementCard({ 
  title, 
  subtitle, 
  description, 
  howItWorks, 
  support, 
  expectations, 
  testimonial, 
  stats = [],
  ctaText 
}: EngagementCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12"
    >
      <div className="p-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="pr-4">
            <p className="text-gray-700 leading-relaxed mb-6">{description}</p>
            
            <div className="grid md:grid-cols-1 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  How It Works
                </h3>
                <ul className="space-y-2 text-gray-600">
                  {howItWorks.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Support by KI
                </h3>
                <ul className="space-y-2 text-gray-600">
                  {support.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Expectations
                </h3>
                <ul className="space-y-2 text-gray-600">
                  {expectations.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex items-start justify-center">
            {/* Masterclass Image */}
            {title.includes('Masterclass') && (
              <img 
                src="/src/assets/images/online-masterclass.JPG" 
                alt="Online Masterclass Session" 
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            )}
            
            {/* Virtual Teaching Image */}
            {title.includes('Virtual Teaching') && (
              <img 
                src="/src/assets/images/visiting-faculty.jpg" 
                alt="Virtual Teaching Session" 
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            )}
          </div>
        </div>

        {stats && (
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h4 className="font-medium text-lg mb-4 text-center">Impact at a Glance</h4>
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {testimonial && (
          <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500 mb-8">
            <p className="italic text-gray-700">"{testimonial}"</p>
          </div>
        )}

        <div className="text-center">
          <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">
            {ctaText}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-xl shadow-md"
    >
      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl mb-4 mx-auto">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </motion.div>
  );
}
