import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { ArrowRight, Globe, Users, BookOpen, Award, Calendar, MapPin, Mail, X, Send } from 'lucide-react';
import heroImage from '../../assets/slide1.png';
import heroImage2 from '../../assets/silde2.jpg';
import teamImage from '../../assets/d058fd6bad7846c52f47d21d8a1bbce8947440de.png';
import SplitText from '../animations/SplitText';
import { CounterAnimation } from '../animations/CounterAnimation';
import { useState, useEffect } from 'react';

export function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterName, setNewsletterName] = useState('');
  const slides = [
    {
      image: heroImage,
      title: 'K-GEO',
      subtitle: 'Kumaraguru Global Engagement Office',
      buttonText: 'Know More',
      buttonLink: '/about'
    },
    {
      image: heroImage2,
      title: 'Connecting Kumaraguru\nto the world',
      subtitle: '',
      buttonText: '',
      buttonLink: ''
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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

    // Observe all sections with scroll animation classes
    const sections = document.querySelectorAll('.scroll-section, .scroll-section-left, .scroll-section-right, .scroll-section-scale');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  const features = [
    {
      icon: Globe,
      title: 'Global Partnerships',
      desc: '25+ university partners across 10+ countries',
    },
    {
      icon: Users,
      title: 'Student Mobility',
      desc: '300+ students in exchange programs annually',
    },
    {
      icon: BookOpen,
      title: 'Joint Programs',
      desc: 'Dual degrees and collaborative academic offerings',
    },
    {
      icon: Award,
      title: 'Research Excellence',
      desc: '10+ international research collaborations',
    },
  ];

  const programs = [
    {
      title: 'Study Abroad',
      desc: 'Semester exchange programs with leading global universities',
      image:
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    },
    {
      title: 'International Faculty',
      desc: 'Visiting professors and collaborative teaching initiatives',
      image:
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    },
    {
      title: 'Global Research',
      desc: 'Joint research projects addressing worldwide challenges',
      image:
        'https://images.unsplash.com/photo-1532094349884-543bc11b234d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    },
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      {/* Global Responsive Styles and Scroll Animations */}
      <style>{`
        * {
          box-sizing: border-box;
        }
        body {
          overflow-x: hidden;
        }
        .container {
          width: 100%;
          padding-left: 1rem;
          padding-right: 1rem;
        }
        @media (min-width: 640px) {
          .container {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }
        @media (min-width: 1024px) {
          .container {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }
        
        /* Scroll Animation Classes */
        .scroll-section {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .scroll-section.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .scroll-section-left {
          opacity: 0;
          transform: translateX(-50px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .scroll-section-left.visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .scroll-section-right {
          opacity: 0;
          transform: translateX(50px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .scroll-section-right.visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .scroll-section-scale {
          opacity: 0;
          transform: scale(0.9);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .scroll-section-scale.visible {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>
      {/* Hero Section - Professional Slider */}
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
                  <h1 className="hero-title mb-6">{slides[0].title}</h1>
                  <p className="text-white text-xl sm:text-2xl lg:text-3xl font-light mb-10 max-w-4xl mx-auto">
                    {slides[0].subtitle}
                  </p>
                  {slides[0].buttonText && (
                    <Link
                      to={slides[0].buttonLink}
                      className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-md text-white border-2 border-white/40 rounded-full hover:bg-white/30 transition-all transform hover:scale-105 shadow-xl"
                      style={{ fontSize: '18px', fontWeight: '600' }}
                    >
                      {slides[0].buttonText}
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  )}
                </>
              ) : (
                <div className="hero-title">
                  <div className="block">Connecting Kumaraguru</div>
                  <div className="block">to the world</div>
                </div>
              )}
            </div>
            <style>{`
              .hero-title {
                font-size: clamp(32px, 7vw, 80px);
                font-weight: 800;
                line-height: 1.2;
                letter-spacing: -0.01em;
                color: white;
                text-shadow: 0px 4px 30px rgba(0, 0, 0, 0.9), 0px 2px 10px rgba(0, 0, 0, 1);
                margin: 0 auto;
                max-width: 1400px;
                word-spacing: 0.1em;
                hyphens: none;
                overflow-wrap: normal;
              }
              @media (max-width: 640px) {
                .hero-title {
                  font-size: clamp(28px, 8vw, 40px);
                  line-height: 1.3;
                  word-spacing: normal;
                }
              }
              @media (min-width: 641px) and (max-width: 1024px) {
                .hero-title {
                  font-size: clamp(40px, 6vw, 60px);
                  line-height: 1.25;
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
          </div>
        </div>

        {/* Add CSS Animations */}
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-12px);
            }
          }

          @keyframes expandWidth {
            from {
              width: 0;
              opacity: 0;
            }
            to {
              width: 100%;
              opacity: 1;
            }
          }

          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}</style>

              </section>

      {/* Mission Statement Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white -mt-1 scroll-section">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Left - Image */}
            <div className="relative w-full order-2 lg:order-1">
              <div className="relative rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <ImageWithFallback
                  src={teamImage}
                  alt="K-GEO Team"
                  className="w-full h-[280px] sm:h-[380px] lg:h-[480px] object-cover"
                />
              </div>
            </div>

            {/* Right - Content */}
            <div
              className="relative p-6 sm:p-8 lg:p-12 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl order-1 lg:order-2"
              style={{ background: 'linear-gradient(135deg, #0d3b66 0%, #1b4965 100%)' }}
            >
              <h2
                className="mb-4 sm:mb-6 text-white"
                style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: '700', lineHeight: '1.3' }}
              >
                In a world defined by interconnection, the greatest challenges and opportunities
                lie beyond borders.
              </h2>
              <div className="space-y-4 sm:space-y-6 text-white/90" style={{ fontSize: 'clamp(14px, 2vw, 16px)', lineHeight: '1.7' }}>
                <p>
                  <strong className="text-white" style={{ fontSize: 'clamp(16px, 2.2vw, 18px)' }}>
                    Kumaraguru Global Engagement Office (K-GEO)
                  </strong>{' '}
                  exists to remove barriers between people, institutions, and nations — so that
                  knowledge can flow freely, ideas can merge across cultures, and innovation can
                  rise from collaboration.
                </p>
                <p>
                  We empower our community to engage with diverse perspectives, solve problems that
                  matter, and create futures that are globally relevant yet locally rooted.
                </p>
                <p>
                  K-GEO was created with a singular conviction that eliminating barriers between
                  institutions and communities worldwide is essential to creating new knowledge and
                  innovative solutions to humanity's most pressing problems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Footprints Section - Modern Infographic Design */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-section bg-[#0a1929]">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(#1565d8 1px, transparent 1px), linear-gradient(90deg, #1565d8 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Animated Dots */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-2 h-2 bg-[#1565d8] rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-[#228be6] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-[#1565d8] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-[#228be6] rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-[#1565d8]/10 backdrop-blur-sm rounded-full border border-[#1565d8]/30">
              <div className="w-2 h-2 bg-[#1565d8] rounded-full animate-pulse"></div>
              <span className="text-[#228be6] font-semibold text-xs tracking-wider uppercase">Statistical Overview</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              Global Footprints — Measurable Impact, Trusted Reach
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Driving international collaboration through measurable outcomes
            </p>
          </div>

          {/* Stats Grid - Modern Infographic Style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stat 1 - Global University Partners */}
            <div className="group relative bg-[#0f2942] rounded-2xl p-6 border border-[#1565d8]/20 hover:border-[#1565d8]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#1565d8]/20">
              {/* Top Label */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#1565d8]/20 rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1565d8" strokeWidth="2">
                      <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>
                    </svg>
                  </div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Partners</span>
                </div>
                <div className="px-2 py-1 bg-[#1565d8]/10 rounded text-xs text-[#228be6] font-semibold">
                  Active
                </div>
              </div>

              {/* Main Number */}
              <div className="mb-4">
                <CounterAnimation 
                  end={25} 
                  suffix="+"
                  className="text-5xl font-bold bg-gradient-to-r from-[#1565d8] to-[#228be6] bg-clip-text text-transparent"
                />
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Global University Partners
              </p>

              {/* Progress Bar */}
              <div className="relative h-2 bg-[#1565d8]/10 rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#1565d8] to-[#228be6] rounded-full w-4/5 animate-pulse"></div>
              </div>

              {/* Small Stats */}
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-gray-500">Coverage</span>
                <span className="text-[#228be6] font-semibold">10+ Countries</span>
              </div>
            </div>

            {/* Stat 2 - Students in Mobility */}
            <div className="group relative bg-[#0f2942] rounded-2xl p-6 border border-[#228be6]/20 hover:border-[#228be6]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#228be6]/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#228be6]/20 rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#228be6" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Students</span>
                </div>
                <div className="px-2 py-1 bg-[#228be6]/10 rounded text-xs text-[#228be6] font-semibold">
                  Enrolled
                </div>
              </div>
              <div className="mb-4">
                <CounterAnimation 
                  end={300} 
                  suffix="+"
                  className="text-5xl font-bold bg-gradient-to-r from-[#228be6] to-[#1565d8] bg-clip-text text-transparent"
                />
              </div>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Students in Mobility programs
              </p>
              <div className="relative h-2 bg-[#228be6]/10 rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#228be6] to-[#1565d8] rounded-full w-3/4 animate-pulse"></div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-gray-500">Participation</span>
                <span className="text-[#228be6] font-semibold">75% Active</span>
              </div>
            </div>

            {/* Stat 3 - Online Visiting Faculty */}
            <div className="group relative bg-[#0f2942] rounded-2xl p-6 border border-[#1565d8]/20 hover:border-[#1565d8]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#1565d8]/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#1565d8]/20 rounded-lg flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1565d8" strokeWidth="2">
                      <path d="M23 7l-7 5 7 5V7z"/>
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                    </svg>
                  </div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Faculty</span>
                </div>
                <div className="px-2 py-1 bg-[#1565d8]/10 rounded text-xs text-[#228be6] font-semibold">
                  Online
                </div>
              </div>
              <div className="mb-4">
                <CounterAnimation 
                  end={100} 
                  suffix="+"
                  className="text-5xl font-bold bg-gradient-to-r from-[#1565d8] to-[#228be6] bg-clip-text text-transparent"
                />
              </div>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Online visiting faculty
              </p>
              <div className="relative h-2 bg-[#1565d8]/10 rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#1565d8] to-[#228be6] rounded-full w-2/3 animate-pulse"></div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-gray-500">Engagement</span>
                <span className="text-[#228be6] font-semibold">67% Teaching</span>
              </div>
            </div>

            {/* Stat 4 - Countries Engaged */}
            <div className="group relative bg-[#0f2942] rounded-2xl p-6 border border-[#228be6]/20 hover:border-[#228be6]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#228be6]/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#228be6]/20 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-[#228be6]" />
                  </div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Global</span>
                </div>
                <div className="px-2 py-1 bg-[#228be6]/10 rounded text-xs text-[#228be6] font-semibold">
                  Expanding
                </div>
              </div>
              <div className="mb-4">
                <CounterAnimation 
                  end={10} 
                  suffix="+"
                  className="text-5xl font-bold bg-gradient-to-r from-[#228be6] to-[#1565d8] bg-clip-text text-transparent"
                />
              </div>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Countries Engaged
              </p>
              <div className="relative h-2 bg-[#228be6]/10 rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#228be6] to-[#1565d8] rounded-full w-1/2 animate-pulse"></div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-gray-500">Reach</span>
                <span className="text-[#228be6] font-semibold">5 Continents</span>
              </div>
            </div>

            {/* Stat 5 - Global Activities */}
            <div className="group relative bg-[#0f2942] rounded-2xl p-6 border border-[#1565d8]/20 hover:border-[#1565d8]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#1565d8]/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#1565d8]/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-[#1565d8]" />
                  </div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Events</span>
                </div>
                <div className="px-2 py-1 bg-[#1565d8]/10 rounded text-xs text-[#228be6] font-semibold">
                  Annual
                </div>
              </div>
              <div className="mb-4">
                <CounterAnimation 
                  end={250} 
                  suffix="+"
                  className="text-5xl font-bold bg-gradient-to-r from-[#1565d8] to-[#228be6] bg-clip-text text-transparent"
                />
              </div>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Global activities
              </p>
              <div className="relative h-2 bg-[#1565d8]/10 rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#1565d8] to-[#228be6] rounded-full w-4/5 animate-pulse"></div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-gray-500">Frequency</span>
                <span className="text-[#228be6] font-semibold">Weekly Events</span>
              </div>
            </div>

            {/* Stat 6 - Joint Research Projects */}
            <div className="group relative bg-[#0f2942] rounded-2xl p-6 border border-[#228be6]/20 hover:border-[#228be6]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#228be6]/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#228be6]/20 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-[#228be6]" />
                  </div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Research</span>
                </div>
                <div className="px-2 py-1 bg-[#228be6]/10 rounded text-xs text-[#228be6] font-semibold">
                  Ongoing
                </div>
              </div>
              <div className="mb-4">
                <CounterAnimation 
                  end={10} 
                  suffix="+"
                  className="text-5xl font-bold bg-gradient-to-r from-[#228be6] to-[#1565d8] bg-clip-text text-transparent"
                />
              </div>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Joint Research Projects
              </p>
              <div className="relative h-2 bg-[#228be6]/10 rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#228be6] to-[#1565d8] rounded-full w-1/3 animate-pulse"></div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-gray-500">Collaboration</span>
                <span className="text-[#228be6] font-semibold">Multi-Institutional</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section - Professional Grid Layout */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 scroll-section">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-10 lg:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Quick Links</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#1565d8] to-[#228be6] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Coimbatore Link */}
            <a href="#" className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1565d8] to-[#228be6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1565d8]/10 to-[#228be6]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-8 h-8 text-[#1565d8]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Coimbatore, India</h3>
                <p className="text-gray-600 text-sm mb-4">Discover our vibrant campus city and its rich cultural heritage</p>
                <div className="flex items-center text-[#1565d8] font-semibold">
                  <span className="text-sm">Explore</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </a>

            {/* Newsletter Link */}
            <button 
              onClick={() => setShowNewsletterModal(true)}
              className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 w-full text-left"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1565d8] to-[#228be6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1565d8]/10 to-[#228be6]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-8 h-8 text-[#1565d8]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Newsletter</h3>
                <p className="text-gray-600 text-sm mb-4">Stay updated with our latest news and opportunities</p>
                <div className="flex items-center text-[#1565d8] font-semibold">
                  <span className="text-sm">Subscribe</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </button>

            {/* Events Link */}
            <a href="#" className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1565d8] to-[#228be6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1565d8]/10 to-[#228be6]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-8 h-8 text-[#1565d8]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Upcoming Events</h3>
                <p className="text-gray-600 text-sm mb-4">Join our international conferences and workshops</p>
                <div className="flex items-center text-[#1565d8] font-semibold">
                  <span className="text-sm">View Calendar</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </a>

            {/* Visitors Link */}
            <a href="#" className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1565d8] to-[#228be6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <div className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1565d8]/10 to-[#228be6]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-[#1565d8]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">International Visitors</h3>
                <p className="text-gray-600 text-sm mb-4">Information for our global guests and partners</p>
                <div className="flex items-center text-[#1565d8] font-semibold">
                  <span className="text-sm">Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white scroll-section">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose K-GEO?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive support for international engagement and global learning experiences
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#1565d8]/10 to-[#228be6]/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#1565d8]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden scroll-section"
      >
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto max-w-4xl text-center text-white relative z-10">
          <Calendar className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Go Global?
          </h2>
          <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto opacity-95">
            Connect with our team to explore international opportunities and take your education to
            the next level
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 px-4">
            <a
              href="mailto:global@kumaraguru.in"
              className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#1565d8] rounded-[10px] hover:bg-gray-100 transition-all w-full sm:w-auto"
              style={{ fontSize: 'clamp(16px, 2.2vw, 18px)', fontWeight: '600' }}
            >
              Contact Us
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-[10px] hover:bg-white/10 transition-all w-full sm:w-auto"
              style={{ fontSize: 'clamp(16px, 2.2vw, 18px)', fontWeight: '600' }}
            >
              About K-GEO
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 scroll-section">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Latest Updates
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed about our latest partnerships, events, and opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                date: 'Oct 15, 2025',
                title: 'New Partnership with European Universities',
                desc: 'Exciting collaboration opportunities for students and faculty',
              },
              {
                date: 'Oct 10, 2025',
                title: 'Study Abroad Fair 2025',
                desc: 'Meet representatives from partner universities worldwide',
              },
              {
                date: 'Oct 5, 2025',
                title: 'International Research Symposium',
                desc: 'Showcasing collaborative research projects and findings',
              },
            ].map((update, index) => (
              <div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <p className="text-sm font-semibold text-[#1565d8] uppercase tracking-wide mb-4">
                  {update.date}
                </p>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {update.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-6 line-clamp-3">
                  {update.desc}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-[#1565d8] hover:gap-3 transition-all"
                  style={{ fontSize: '16px', fontWeight: '500' }}
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Modal - Impressive Popup */}
      {showNewsletterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowNewsletterModal(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-scaleIn">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#1565d8]/20 to-[#228be6]/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#228be6]/20 to-[#1565d8]/20 rounded-full blur-3xl -z-10"></div>

            {/* Close Button */}
            <button
              onClick={() => setShowNewsletterModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Header */}
            <div className="relative p-5 sm:p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1565d8] to-[#228be6] rounded-2xl mb-3 shadow-xl">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-gray-600 text-sm max-w-md mx-auto">
                Get the latest updates on global opportunities and events
              </p>
            </div>

            {/* Form */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                console.log('Newsletter subscription:', { newsletterName, newsletterEmail });
                // Add your submission logic here
                setShowNewsletterModal(false);
                setNewsletterName('');
                setNewsletterEmail('');
              }}
              className="px-6 sm:px-8 pb-6 space-y-4"
            >
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={newsletterName}
                  onChange={(e) => setNewsletterName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#1565d8] focus:ring-4 focus:ring-[#1565d8]/10 transition-all outline-none text-gray-900 placeholder-gray-400"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-[#1565d8] focus:ring-4 focus:ring-[#1565d8]/10 transition-all outline-none text-gray-900 placeholder-gray-400"
                />
              </div>

              {/* Benefits */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#1565d8]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  What you'll receive:
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#1565d8] mt-0.5">•</span>
                    <span>Weekly updates on global opportunities and scholarships</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1565d8] mt-0.5">•</span>
                    <span>Exclusive invites to international events and webinars</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#1565d8] mt-0.5">•</span>
                    <span>Success stories from students abroad</span>
                  </li>
                </ul>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#1565d8] to-[#228be6] hover:from-[#1b4965] hover:to-[#1565d8] text-white font-bold py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 text-lg"
              >
                <Send className="w-5 h-5" />
                Subscribe Now
              </button>

              <p className="text-center text-xs text-gray-500">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
