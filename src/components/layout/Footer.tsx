import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, ExternalLink } from 'lucide-react';
import imgLogo from 'figma:asset/af311d09d89dbde5575dc46a338b003dee158233.png';
import imgLinkedinIcon from 'figma:asset/65434bf1e68b7a3af585e5b171383d1f385d4cb2.png';
import imgFacebookIcon from 'figma:asset/5f247d80fb34868c90f66b4f9e2cb0944048ed9e.png';
import imgInstagramIcon from 'figma:asset/978e5beef8cbe3237e10c5ea364b3aea1b21d19c.png';

export function Footer() {
  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Partnerships', path: '#' },
    { label: 'Global Faculty', path: '#' },
    { label: 'Research', path: '#' },
  ];

  const programs = [
    { label: 'Study Abroad', path: '#' },
    { label: 'Student Exchange', path: '#' },
    { label: 'Faculty Mobility', path: '#' },
    { label: 'Joint Research', path: '#' },
    { label: 'International Events', path: '#' },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Address',
      value: 'Kumaraguru College of Technology, Athipalayam Rd, Chinnavedampatti',
      subValue: 'Coimbatore, Tamil Nadu 641035',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 422 2669000',
      link: 'tel:+914222669000',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'global@kumaraguru.in',
      link: 'mailto:global@kumaraguru.in',
    },
    {
      icon: Globe,
      label: 'Website',
      value: 'www.kumaraguru.in',
      link: 'https://kumaraguru.in',
    },
  ];

  // Google Maps embed URL for KCT location - Coimbatore
  const mapEmbedUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.430022362009!2d76.98753257513162!3d11.081293753496238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f81b7514a15f%3A0x155e29f8d14154fc!2sKumaraguru%20College%20of%20Technology!5e0!3m2!1sen!2sin!4v1762361635365!5m2!1sen!2sin';
  
  // Google Maps direct link for KCT
  const googleMapsLink = 'https://www.google.com/maps/place/Kumaraguru+College+of+Technology/@11.081293,76.987532,15z/data=!4m6!3m5!1s0x3ba8f81b7514a15f:0x155e29f8d14154fc!8m2!3d11.081293!4d76.987532';

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        backgroundColor: '#212f46',
      }}
    >
      
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          {/* Brand & Description */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-6">
              <img src={imgLogo} alt="Kumaraguru Institutions" className="h-20 object-contain" />
            </Link>
            <h3
              className="mb-4 text-white"
              style={{ fontSize: '24px', fontWeight: '600', lineHeight: '1.3' }}
            >
              Kumaraguru Global Engagement Office
            </h3>
            <p
              className="mb-6 text-white/80"
              style={{ fontSize: '16px', lineHeight: '1.6', maxWidth: '400px' }}
            >
              Connecting Kumaraguru to the world through international partnerships, student
              mobility, and collaborative research initiatives.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <img
                    src={imgLinkedinIcon}
                    alt="LinkedIn"
                    className="w-6 h-6 opacity-90 group-hover:opacity-100"
                  />
                </div>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <img
                    src={imgFacebookIcon}
                    alt="Facebook"
                    className="w-6 h-6 opacity-90 group-hover:opacity-100"
                  />
                </div>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <img
                    src={imgInstagramIcon}
                    alt="Instagram"
                    className="w-6 h-6 opacity-90 group-hover:opacity-100"
                  />
                </div>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4
              className="mb-6 text-white"
              style={{ fontSize: '18px', fontWeight: '600', letterSpacing: '0.5px' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  {link.path.startsWith('#') ? (
                    <a
                      href={link.path}
                      className="text-white/70 hover:text-white hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-200"
                      style={{ fontSize: '15px' }}
                    >
                      <span className="w-1 h-1 rounded-full bg-[#228be6]"></span>
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-white hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-200"
                      style={{ fontSize: '15px' }}
                    >
                      <span className="w-1 h-1 rounded-full bg-[#228be6]"></span>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className="lg:col-span-2">
            <h4
              className="mb-6 text-white"
              style={{ fontSize: '18px', fontWeight: '600', letterSpacing: '0.5px' }}
            >
              Programs
            </h4>
            <ul className="space-y-3">
              {programs.map((program, index) => (
                <li key={index}>
                  <a
                    href={program.path}
                    className="text-white/70 hover:text-white hover:translate-x-1 inline-flex items-center gap-2 transition-all duration-200"
                    style={{ fontSize: '15px' }}
                  >
                    <span className="w-1 h-1 rounded-full bg-[#228be6]"></span>
                    {program.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4">
            <h4
              className="mb-6 text-white"
              style={{ fontSize: '18px', fontWeight: '600', letterSpacing: '0.5px' }}
            >
              Contact Information
            </h4>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(34, 139, 230, 0.15)' }}
                  >
                    <info.icon className="w-5 h-5 text-[#228be6]" />
                  </div>
                  <div>
                    <p
                      className="text-white/50 mb-1"
                      style={{ fontSize: '12px', fontWeight: '500', letterSpacing: '0.5px' }}
                    >
                      {info.label}
                    </p>
                    {info.link ? (
                      <a
                        href={info.link}
                        target={info.link.startsWith('http') ? '_blank' : undefined}
                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-white hover:text-[#228be6] transition-colors inline-flex items-center gap-1"
                        style={{ fontSize: '15px', fontWeight: '500' }}
                      >
                        {info.value}
                        {info.link.startsWith('http') && (
                          <ExternalLink className="w-3 h-3" />
                        )}
                      </a>
                    ) : (
                      <>
                        <p
                          className="text-white"
                          style={{ fontSize: '15px', fontWeight: '500', lineHeight: '1.4' }}
                        >
                          {info.value}
                        </p>
                        {info.subValue && (
                          <p
                            className="text-white/80"
                            style={{ fontSize: '14px', lineHeight: '1.4' }}
                          >
                            {info.subValue}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Google Map Section */}
        <div className="mb-12">
          <div
            className="rounded-[20px] overflow-hidden shadow-[0px_8px_24px_0px_rgba(0,0,0,0.3)]"
            style={{ border: '2px solid rgba(34, 139, 230, 0.2)' }}
          >
            <div className="bg-white/5 backdrop-blur-sm px-6 py-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#228be6]" />
                  <h4 className="text-white" style={{ fontSize: '18px', fontWeight: '600' }}>
                    Find Us on Map
                  </h4>
                </div>
                <a
                  href={googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#228be6] hover:bg-[#1565d8] text-white transition-colors"
                  style={{ fontSize: '14px', fontWeight: '500' }}
                >
                  Open in Google Maps
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="relative" style={{ height: '400px' }}>
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kumaraguru College of Technology Location"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-center md:text-left" style={{ fontSize: '14px' }}>
              © {new Date().getFullYear()} Kumaraguru Institutions. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
                style={{ fontSize: '14px' }}
              >
                Privacy Policy
              </a>
              <span className="text-white/30">•</span>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
                style={{ fontSize: '14px' }}
              >
                Terms of Service
              </a>
              <span className="text-white/30">•</span>
              <a
                href="#"
                className="text-white/60 hover:text-white transition-colors"
                style={{ fontSize: '14px' }}
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

          </footer>
  );
}
