import React, { useState, useEffect } from 'react';
import { TopNavbar } from './components/TopNavbar';
import { HeroSection } from './components/HeroSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AcademicSection } from './components/AcademicSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TerminalModal } from './components/TerminalModal';
import { cyberAudio } from './utils/audio';

export function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Global hotkey: ~ or ` to toggle Terminal CLI
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        const activeTag = document.activeElement?.tagName.toLowerCase();
        if (activeTag !== 'input' && activeTag !== 'textarea') {
          e.preventDefault();
          setTerminalOpen((prev) => {
            if (!prev) {
              cyberAudio.playTerminalOpen();
            } else {
              cyberAudio.playTerminalClose();
            }
            return !prev;
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    cyberAudio.setEnabled(nextVal);
    setSoundEnabled(nextVal);
  };

  const handleOpenContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#131313] text-[#e5e2e1] overflow-x-hidden selection:bg-[#00ff41] selection:text-[#000000]">
      {/* Primary Fixed Top Navigation Bar */}
      <TopNavbar
        onOpenContact={handleOpenContact}
        onOpenTerminal={() => setTerminalOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Page Layout Flow */}
      <main className="relative z-10 flex flex-col">
        {/* Hero Banner Section */}
        <HeroSection onOpenTerminal={() => setTerminalOpen(true)} />

        {/* /DIR/01_CORE_SKILLS */}
        <SkillsSection />

        {/* /DIR/02_RESEARCH_PROJECTS */}
        <ProjectsSection />

        {/* /DIR/03_ACADEMIC_TRACK */}
        <AcademicSection />

        {/* /DIR/04_GET_IN_TOUCH */}
        <ContactSection onOpenTerminal={() => setTerminalOpen(true)} />
      </main>

      {/* Page Footer */}
      <Footer onOpenTerminal={() => setTerminalOpen(true)} />

      {/* Interactive Terminal CLI Overlay */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onToggleSound={handleToggleSound}
      />
    </div>
  );
}

export default App;
