import React from 'react';
import { ChevronUp, Github, Linkedin, Send, Mail, Globe, Terminal, Shield } from 'lucide-react';
import { ScrambleSpan } from './ScrambleSpan';
import { cyberAudio } from '../utils/audio';
import { BIO_DATA } from '../data/portfolioData';

interface FooterProps {
  onOpenTerminal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal }) => {
  const scrollToTop = () => {
    cyberAudio.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-[#353534] bg-[#0e0e0e] text-[#666666] font-mono text-[11px] md:text-[12px] py-8">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Simple & Professional Copyright notice */}
        <div className="text-[#8e9c8b] flex items-center gap-2">
          <span>&copy; {new Date().getFullYear()} Ali Mirzaei</span>
          <span className="text-[#666666]">|</span>
          <span className="text-[#b9ccb2]">AI &amp; Data Science Researcher</span>
        </div>

        {/* Social Links (without Website) */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[#b9ccb2]">
          <a
            href={BIO_DATA.emailUrl}
            onClick={() => cyberAudio.playClick()}
            onMouseEnter={() => cyberAudio.playHover()}
            className="hover:text-[#00ff41] transition-colors flex items-center gap-1.5"
            title="Send Email"
          >
            <Mail size={13} />
            <ScrambleSpan text="EMAIL" />
          </a>

          <a
            href={BIO_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => cyberAudio.playClick()}
            onMouseEnter={() => cyberAudio.playHover()}
            className="hover:text-[#00ff41] transition-colors flex items-center gap-1.5"
          >
            <Github size={13} />
            <ScrambleSpan text="GITHUB" />
          </a>

          <a
            href={BIO_DATA.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => cyberAudio.playClick()}
            onMouseEnter={() => cyberAudio.playHover()}
            className="hover:text-[#00ff41] transition-colors flex items-center gap-1.5"
          >
            <Linkedin size={13} />
            <ScrambleSpan text="LINKEDIN" />
          </a>

          <a
            href={BIO_DATA.telegram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => cyberAudio.playClick()}
            onMouseEnter={() => cyberAudio.playHover()}
            className="hover:text-[#00ff41] transition-colors flex items-center gap-1.5"
          >
            <Send size={13} />
            <ScrambleSpan text="TELEGRAM" />
          </a>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              cyberAudio.playTerminalOpen();
              onOpenTerminal();
            }}
            onMouseEnter={() => cyberAudio.playHover()}
            className="text-[#00f3ff] hover:text-[#00ff41] flex items-center gap-1 border border-[#00f3ff]/30 px-2 py-1 cyber-button cursor-pointer"
          >
            <Terminal size={12} />
            <span>CLI</span>
          </button>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => cyberAudio.playHover()}
            className="text-[#00ff41] hover:text-[#e5e2e1] border border-[#00ff41]/40 px-2.5 py-1 flex items-center gap-1 cyber-button cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>TOP</span>
            <ChevronUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};
