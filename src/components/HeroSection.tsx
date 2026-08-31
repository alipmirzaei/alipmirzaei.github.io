import React, { useState, useEffect } from 'react';
import { Dna, Code2, Terminal, GraduationCap } from 'lucide-react';
import { ScrambleSpan } from './ScrambleSpan';
import { cyberAudio } from '../utils/audio';
import { BIO_DATA } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenTerminal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenTerminal }) => {
  const fullTitle = 'AI & DATA SCIENCE RESEARCHER';
  const [typedTitle, setTypedTitle] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullTitle.length) {
        setTypedTitle(fullTitle.slice(0, index + 1));
        index++;
      } else {
        setTypingComplete(true);
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  const handleResearchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    cyberAudio.playClick();
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGithubClick = () => {
    cyberAudio.playClick();
  };

  return (
    <section
      id="home"
      className="relative max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 min-h-[600px] md:min-h-[720px] flex flex-col justify-center items-start pt-24 pb-16 overflow-hidden"
    >
      {/* Background Cyber Ambient Mesh & Hologram Glow */}
      <div className="absolute top-1/4 right-5 md:right-20 w-72 md:w-96 h-72 md:h-96 bg-[#00ff41]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-60 h-60 bg-[#00f3ff]/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl">
        {/* Hero Main Title */}
        <h1
          id="hero-main-title"
          className="font-mono text-[28px] sm:text-[36px] md:text-[48px] lg:text-[54px] font-bold text-[#00ff41] mb-5 leading-tight tracking-tight break-words"
        >
          <span className="text-[#00ff41] select-none mr-2">&gt;</span>
          <span className="text-[#ebffe2] hover:text-[#00ff41] transition-colors">
            {typedTitle}
          </span>
          <span className="typewriter-cursor" />
        </h1>

        {/* Hero Subtitle / Bio */}
        <div className="space-y-3 mb-8 md:mb-10 max-w-3xl">
          <p
            id="hero-subtitle"
            className="text-[16px] sm:text-[17px] md:text-[19px] text-[#e5e2e1] leading-relaxed font-sans font-medium"
          >
            {BIO_DATA.subheadline}
          </p>
          <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#8e9c8b] leading-relaxed font-sans">
            Graduate student in <span className="text-[#00ff41] font-semibold">Data Mining</span> at{' '}
            <span className="text-[#00f3ff] font-semibold">Shahid Beheshti University (SBU)</span>, with a B.Sc. in{' '}
            <span className="text-[#e5e2e1] font-semibold">Computer Science</span> from{' '}
            <span className="text-[#e5e2e1] font-semibold">Ferdowsi University of Mashhad (FUM)</span>.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto">
          {/* Primary View Research Button */}
          <a
            id="hero-btn-view-research"
            href="#projects"
            onClick={handleResearchClick}
            onMouseEnter={() => cyberAudio.playHover()}
            className="bg-[#00ff41] hover:bg-[#72ff70] text-[#000000] font-mono text-[12px] md:text-[13px] font-bold px-6 md:px-8 py-3.5 md:py-4 cyber-button transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,255,65,0.3)]"
          >
            <Dna size={18} className="text-[#000000]" />
            <span>EXPLORE RESEARCH</span>
          </a>

          {/* Secondary Github Button */}
          <a
            id="hero-btn-github-profile"
            href={BIO_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleGithubClick}
            onMouseEnter={() => cyberAudio.playHover()}
            className="border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-[#000000] font-mono text-[12px] md:text-[13px] font-bold px-6 md:px-8 py-3.5 md:py-4 cyber-button transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Code2 size={18} />
            <span>VIEW GITHUB</span>
          </a>

          {/* Terminal Console Fast Launcher */}
          <button
            id="hero-btn-terminal"
            onClick={() => {
              cyberAudio.playTerminalOpen();
              onOpenTerminal();
            }}
            onMouseEnter={() => cyberAudio.playHover()}
            className="border border-[#353534] text-[#8e9c8b] hover:border-[#00f3ff] hover:text-[#00f3ff] bg-[#1c1b1b]/80 font-mono text-[12px] md:text-[13px] font-bold px-5 py-3.5 md:py-4 cyber-button transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            title="Launch Interactive Terminal"
          >
            <Terminal size={16} className="text-[#00f3ff]" />
            <span>OPEN TERMINAL</span>
          </button>
        </div>
      </div>
    </section>
  );
};
