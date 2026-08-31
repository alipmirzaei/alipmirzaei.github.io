import React, { useState, useEffect } from 'react';
import { Mail, Menu, X, Terminal, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { ScrambleSpan } from './ScrambleSpan';
import { cyberAudio } from '../utils/audio';

interface TopNavbarProps {
  onOpenContact: () => void;
  onOpenTerminal: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onOpenContact,
  onOpenTerminal,
  soundEnabled,
  onToggleSound,
}) => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'skills', 'projects', 'academic', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'projects', label: 'RESEARCH' },
    { id: 'academic', label: 'ACADEMIC' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (id: string) => {
    cyberAudio.playClick();
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        id="main-navbar"
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#131313]/95 backdrop-blur-md border-b border-[#353534] shadow-[0_4px_20px_rgba(0,0,0,0.7)]'
            : 'bg-[#131313]/85 backdrop-blur-sm border-b border-[#353534]/60'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 flex justify-between items-center h-16">
          {/* Logo / Brand Header */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center gap-2.5 group cursor-pointer shrink-0 min-w-0"
          >
            <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse shrink-0 shadow-[0_0_8px_#00ff41]" />
            <span className="font-mono text-[14px] sm:text-[16px] font-bold text-[#e5e2e1] tracking-wider group-hover:text-[#00ff41] transition-colors truncate">
              ALI MIRZAEI
            </span>
          </a>

          {/* Desktop Navigation Items */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 font-mono text-[12px] font-semibold tracking-wider">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => cyberAudio.playHover()}
                  className={`py-1 border-b-2 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#00ff41] border-[#00ff41] drop-shadow-[0_0_6px_rgba(0,255,65,0.5)] font-bold'
                      : 'text-[#8e9c8b] border-transparent hover:text-[#e5e2e1] hover:border-[#00ff41]/40'
                  }`}
                >
                  <ScrambleSpan text={item.label} />
                </button>
              );
            })}
          </div>

          {/* Right Action Icons & Controls Toolbar */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Audio FX Toggle */}
            <button
              id="sound-toggle-btn"
              onClick={() => {
                onToggleSound();
                cyberAudio.playToggle(!soundEnabled);
              }}
              onMouseEnter={() => cyberAudio.playHover()}
              title={soundEnabled ? 'Audio FX: ON (Click to Mute)' : 'Audio FX: MUTED (Click to Enable)'}
              aria-label="Toggle Sound Effects"
              className={`h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center border transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-[#1c1b1b] border-[#00ff41]/40 text-[#00ff41] hover:border-[#00ff41] hover:bg-[#00ff41]/10'
                  : 'bg-[#131313] border-[#353534] text-[#666666] hover:text-[#b9ccb2] hover:border-[#555555]'
              }`}
            >
              {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>

            {/* Terminal CLI Trigger (Desktop & Tablet) */}
            <button
              id="terminal-cli-trigger-btn"
              onClick={() => {
                cyberAudio.playTerminalOpen();
                onOpenTerminal();
              }}
              onMouseEnter={() => cyberAudio.playHover()}
              className="hidden md:flex h-8 sm:h-9 items-center gap-1.5 font-mono text-[11px] font-medium text-[#00f3ff] hover:text-[#00ff41] bg-[#1c1b1b] border border-[#00f3ff]/40 hover:border-[#00ff41] px-3 transition-all cyber-button cursor-pointer"
              title="Launch Terminal CLI (~ / CMD+K)"
            >
              <Terminal size={13} className="text-[#00f3ff]" />
              <span>CLI</span>
            </button>

            {/* Get In Touch Primary CTA */}
            <button
              id="header-contact-btn"
              onClick={() => {
                cyberAudio.playClick();
                onOpenContact();
              }}
              className="hidden sm:flex h-8 sm:h-9 font-mono text-[11px] sm:text-[12px] font-bold text-[#000000] bg-[#00ff41] hover:bg-[#72ff70] border border-[#00ff41] px-3.5 sm:px-4 items-center gap-1.5 cyber-button cursor-pointer transition-colors shadow-[0_0_12px_rgba(0,255,65,0.25)]"
            >
              <Mail size={13} />
              <span>GET IN TOUCH</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => {
                cyberAudio.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden h-8 w-8 text-[#00ff41] hover:bg-[#353534]/50 border border-[#353534] active:bg-[#00ff41]/20 cursor-pointer flex items-center justify-center transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="fixed top-16 left-0 w-full bg-[#131313]/98 backdrop-blur-xl border-b border-[#00ff41]/40 z-40 p-5 flex flex-col gap-3 font-mono shadow-[0_15px_30px_rgba(0,0,0,0.8)] lg:hidden animate-in slide-in-from-top duration-200 max-h-[calc(100vh-4rem)] overflow-y-auto"
        >
          <div className="text-[11px] text-[#00f3ff] border-b border-[#353534] pb-2 flex items-center justify-between">
            <span>&gt; DIRECTORY_NAVIGATION</span>
            <span className="flex items-center gap-1 text-[#00ff41]">
              <Sparkles size={12} /> ONLINE
            </span>
          </div>

          <div className="flex flex-col gap-2 text-[14px]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-2.5 px-3 border-l-2 transition-colors cursor-pointer flex items-center justify-between min-h-[44px] ${
                  activeSection === item.id
                    ? 'border-[#00ff41] bg-[#00ff41]/10 text-[#00ff41] font-bold'
                    : 'border-transparent text-[#b9ccb2] hover:text-[#00ff41] hover:bg-[#201f1f]'
                }`}
              >
                <span>{item.label}</span>
                <span className="text-[10px] text-[#666666] font-mono">&gt;&gt;</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#353534] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-3 bg-[#00ff41] text-[#000000] font-mono text-[12px] font-bold flex items-center justify-center gap-2 cyber-button cursor-pointer min-h-[44px]"
            >
              <Mail size={15} />
              <span>GET IN TOUCH / SEND MESSAGE</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="w-full py-2.5 bg-[#1c1b1b] border border-[#00f3ff]/50 text-[#00f3ff] font-mono text-[12px] flex items-center justify-center gap-2 cyber-button cursor-pointer min-h-[44px]"
            >
              <Terminal size={14} />
              <span>LAUNCH TERMINAL CLI</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
