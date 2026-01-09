import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import researchImage from '../../assets/images/MADE 2.0 _ 2.jpeg';
import collaborateImage from '../../assets/images/DSC02970.jpg';

export default function Research() {
  const [isVisible, setIsVisible] = useState<boolean[]>([]);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionsRef.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setIsVisible((prev) => {
                const newVisible = [...prev];
                newVisible[index] = true;
                return newVisible;
              });
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px 0px -100px 0px' }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current[index] = el;
    }
  };

  const fadeInVariants = (index: number) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: index * 0.1 },
    },
  });

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
    <div className="min-h-screen bg-gray-50">
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
              href="mailto:global@kumaraguru.in"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1565d8] rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl font-semibold"
            >
              Contact Us
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

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            ref={(el) => addToRefs(el, 0)}
            initial="hidden"
            animate={isVisible[0] ? "visible" : "hidden"}
            variants={fadeInVariants(0)}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              At Kumaraguru Institutions, research is not an afterthought — it's woven into our DNA. We believe that inquiry and innovation emerge at the intersections of disciplines, cultures, and institutions. Our campus is home to centers of excellence, industry-sponsored labs, and multidisciplinary initiatives.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              We invite global faculty, scholars, and institutions to partner with us in pushing boundaries, co-creating knowledge, and nurturing the next generation of change-makers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            ref={(el) => addToRefs(el, 1)}
            initial="hidden"
            animate={isVisible[1] ? "visible" : "hidden"}
            variants={fadeInVariants(1)}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Research Areas & Past Highlights</h2>
            
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6 text-blue-800">Our Thematic Strengths</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {researchAreas.map((area, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <p className="ml-3 text-gray-700">{area}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6 text-blue-800">Past Projects</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {pastProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-600"
                  >
                    <p className="text-gray-700">• {project}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Funding Opportunities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            ref={(el) => addToRefs(el, 2)}
            initial="hidden"
            animate={isVisible[2] ? "visible" : "hidden"}
            variants={fadeInVariants(2)}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Global Funding & Collaborative Grant Opportunities</h2>
            
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">Why It Matters</h3>
              <p className="text-gray-700 mb-8">
                Global funding enables ambitious, large-scale projects with cross-border impact. At KI, we aim to co-develop proposals with international partners to access the best funding schemes — enabling travel, infrastructure, student fellowships, publication, and shared labs.
              </p>
              
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">Prominent Funding Schemes</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {fundingSchemes.map((scheme, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="p-4 bg-blue-50 rounded-lg border border-blue-100"
                  >
                    <p className="text-blue-800 font-medium">{scheme}</p>
                  </motion.div>
                ))}
              </div>
              
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">Our Approach</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>We co-develop proposals with partner faculty to align strengths and institutional support.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>KI provides matching funds, seed grants, infrastructure assurance, and administrative backing.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>We host workshops and internal grant-writing sessions to help partners propose successfully.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PhD Collaboration */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            ref={(el) => addToRefs(el, 3)}
            initial="hidden"
            animate={isVisible[3] ? "visible" : "hidden"}
            variants={fadeInVariants(3)}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">PhD Co-Supervision & Doctoral Collaboration</h2>
            
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">Vision & Opportunity</h3>
              <p className="text-gray-700 mb-8">
                We welcome global faculty to co-supervise PhD scholars with our faculty, creating dual-expertise mentorships and stronger academic rigor. These partnerships increase exposure, publication rates, and student mobility.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-blue-800">Support from KI</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Institutional letter of support, IRB / ethics facilitation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Travel grants for student mobility</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Library, computing, and lab access</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Administrative coordination</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-blue-800">Global Co-Supervisor Expectations</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Regular engagement in student reviews</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Academic guidance and publication planning</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Visit Kumaraguru or host student</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Co-author and support conferences</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h4 className="text-xl font-semibold mb-3 text-blue-800">Past Experience & Stats</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Over 50+ PhDs awarded in the past 5 years across disciplines</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Publications in high-impact journals with international co-authors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Successful international research stints for PhD scholars</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scholars' Residencies */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            ref={(el) => addToRefs(el, 4)}
            initial="hidden"
            animate={isVisible[4] ? "visible" : "hidden"}
            variants={fadeInVariants(4)}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Scholars' Residencies at Kumaraguru</h2>
            
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">What It Is</h3>
              <p className="text-gray-700 mb-8">
                An academic residency program inviting global scholars to stay at Kumaraguru (2 weeks to 6 months) to conduct research, give seminars, mentor, and collaborate.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-blue-800">Support by KI</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Accommodation in visiting scholar housing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Travel/honorarium support (where feasible)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Visa and administrative support</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Host department and local mentorship</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-blue-800">Expectations from Residents</h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Deliver a public lecture/seminar</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Mentor students or host mini-projects</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Share research outcomes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Engage in campus activities</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h4 className="text-xl font-semibold mb-3 text-blue-800">Global Models</h4>
                <p className="text-gray-700">
                  Similar to NLU Delhi's Global Scholars-in-Residence Programme, we invite international scholars for residencies with support for airfare, accommodation, office space, and lecture delivery.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={collaborateImage}
            alt="Research Collaboration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            ref={(el) => addToRefs(el, 5)}
            initial="hidden"
            animate={isVisible[5] ? "visible" : "hidden"}
            variants={fadeInVariants(5)}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-8">Ready to Collaborate?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join us in pushing the boundaries of knowledge and creating meaningful impact through research.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/contact"
                className="bg-white text-blue-900 hover:bg-blue-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                Contact Us
              </Link>
              <a
                href="#"
                className="border-2 border-white hover:bg-white hover:bg-opacity-10 font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                Download Brochure
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coimbatore Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            ref={(el) => addToRefs(el, 6)}
            initial="hidden"
            animate={isVisible[6] ? "visible" : "hidden"}
            variants={fadeInVariants(6)}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">About Coimbatore</h2>
            <h3 className="text-2xl font-semibold mb-4 text-blue-800">Coimbatore: India's Innovation and Industry Capital</h3>
            <p className="text-gray-700 mb-6">
              Coimbatore, often called the "Manchester of South India," is one of India's fastest-growing industrial and educational hubs. Renowned for its entrepreneurial spirit, the city has nurtured a dynamic ecosystem of MSMEs, startups, and global enterprises. It is the second-largest city in Tamil Nadu and a key contributor to the state's economy through textiles, precision engineering, IT, automotive, and aerospace industries. With its proximity to the Western Ghats, sustainable energy and agritech sectors are also thriving, creating unique opportunities for research and collaboration.
            </p>
            <p className="text-gray-700 mb-8">
              The city is equally celebrated as an educational powerhouse, with over 400 higher education institutions and a strong legacy of innovation-driven learning. Coimbatore hosts multiple technology parks and a rapidly expanding IT/GCC (Global Capability Centre) presence, making it a preferred destination for international partnerships. Its unique blend of industry, entrepreneurship, and academia positions Coimbatore as a city where global engagement translates into real-world impact.
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">Coimbatore by the Numbers</h3>
              <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><span className="font-semibold">₹1.2 lakh crore</span> annual contribution to Tamil Nadu's GDP</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Second largest <span className="font-semibold">software exporter</span> in Tamil Nadu</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Home to <span className="font-semibold">50,000+ MSMEs</span> in engineering and manufacturing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><span className="font-semibold">400+ higher education</span> institutions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Ranked among <span className="font-semibold">Top 10 Indian startup</span> ecosystems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><span className="font-semibold">15+ SEZs and IT parks</span> with global companies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><span className="font-semibold">24/7 international connectivity</span> through Coimbatore International Airport</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
