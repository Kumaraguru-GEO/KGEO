import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { default as PartnershipsPage } from './components/pages/Partnerships';
import { KIOutbound } from './components/pages/KIOutbound';
import { default as InboundStudents } from './components/pages/InboundStudents';
import Research from './components/pages/Research';
import GlobalFaculty from './components/pages/GlobalFaculty';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/partnerships" element={<PartnershipsPage />} />
            <Route path="/ki-outbound" element={<KIOutbound />} />
            <Route path="/inbound-students" element={<InboundStudents />} />
            <Route path="/research" element={<Research />} />
            <Route path="/global-faculty" element={<GlobalFaculty />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
