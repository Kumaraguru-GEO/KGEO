import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import imgLogo from '../../assets/af311d09d89dbde5575dc46a338b003dee158233.png';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStudentDropdownOpen, setIsStudentDropdownOpen] = useState(false);
  const [isMobileStudentOpen, setIsMobileStudentOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsStudentDropdownOpen(false);
      }
    };

    if (isStudentDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isStudentDropdownOpen]);

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-[#1565d8] font-bold' : 'text-[#1b2840]';
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link to="/">
              <img
                src={imgLogo}
                alt="Kumaraguru Institutions"
                className="h-14 object-contain"
              />
            </Link>
            <div className="hidden lg:flex items-center gap-6">
              <Link
                to="/"
                className={`${isActive('/')} hover:text-[#228be6] transition-colors`}
                style={{ fontSize: '16px', fontWeight: '500' }}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`${isActive('/about')} hover:text-[#228be6] transition-colors`}
                style={{ fontSize: '16px', fontWeight: '500' }}
              >
                About Us
              </Link>
              <Link
                to="/partnerships"
                className={`${isActive('/partnerships')} hover:text-[#228be6] transition-colors`}
                style={{ fontSize: '16px', fontWeight: '500' }}
              >
                Partnerships
              </Link>
              <Link
                to="/global-faculty"
                className={`${isActive('/global-faculty')} hover:text-[#228be6] transition-colors`}
                style={{ fontSize: '16px', fontWeight: '500' }}
              >
                Global Faculty
              </Link>
              <Link
                to="/research"
                className={`${isActive('/research')} hover:text-[#228be6] transition-colors`}
                style={{ fontSize: '16px', fontWeight: '500' }}
              >
                Research
              </Link>
              
              {/* Student Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsStudentDropdownOpen(!isStudentDropdownOpen)}
                  className="flex items-center gap-1 text-[#1b2840] hover:text-[#228be6] transition-colors"
                  style={{ fontSize: '16px', fontWeight: '500' }}
                >
                  Student
                  <ChevronDown className={`w-4 h-4 transition-transform ${isStudentDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isStudentDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                    <Link
                      to="/ki-outbound"
                      className="block px-4 py-3 text-[#1b2840] hover:bg-[#1565d8] hover:text-white transition-colors"
                      style={{ fontSize: '15px', fontWeight: '500' }}
                    >
                      KI Outbound Student
                    </Link>
                    <Link
                      to="/inbound-students"
                      className="block px-4 py-3 text-[#1b2840] hover:bg-[#1565d8] hover:text-white transition-colors border-t border-gray-100"
                      style={{ fontSize: '15px', fontWeight: '500' }}
                    >
                      Inbound Student
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <button 
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-[#1b2840]" />
            ) : (
              <Menu className="w-6 h-6 text-[#1b2840]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className={`${isActive('/')} hover:text-[#228be6] transition-colors py-2`}
                style={{ fontSize: '16px', fontWeight: '500' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`${isActive('/about')} hover:text-[#228be6] transition-colors py-2`}
                style={{ fontSize: '16px', fontWeight: '500' }}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/partnerships"
                className={`${isActive('/partnerships')} hover:text-[#228be6] transition-colors py-2`}
                style={{ fontSize: '16px', fontWeight: '500' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Partnerships
              </Link>
              <Link
                to="/global-faculty"
                className="text-[#1b2840] hover:text-[#228be6] transition-colors py-2"
                style={{ fontSize: '16px', fontWeight: '500' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Global Faculty
              </Link>
              <Link
                to="/research"
                className="text-[#1b2840] hover:text-[#228be6] transition-colors py-2"
                style={{ fontSize: '16px', fontWeight: '500' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Research
              </Link>
              
              {/* Mobile Student Dropdown */}
              <div>
                <button
                  onClick={() => setIsMobileStudentOpen(!isMobileStudentOpen)}
                  className="flex items-center justify-between w-full text-[#1b2840] hover:text-[#228be6] transition-colors py-2"
                  style={{ fontSize: '16px', fontWeight: '500' }}
                >
                  Student
                  <ChevronDown className={`w-4 h-4 transition-transform ${isMobileStudentOpen ? 'rotate-180' : ''}`} />
                </button>
                {isMobileStudentOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link
                      to="/ki-outbound"
                      className="block text-[#1b2840] hover:text-[#228be6] transition-colors py-2"
                      style={{ fontSize: '15px', fontWeight: '500' }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      KI Outbound Student
                    </Link>
                    <Link
                      to="/inbound-students"
                      className="block text-[#1b2840] hover:text-[#228be6] transition-colors py-2"
                      style={{ fontSize: '15px', fontWeight: '500' }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Inbound Student
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
