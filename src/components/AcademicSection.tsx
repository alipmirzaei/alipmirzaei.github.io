import React, { useState } from 'react';
import { GraduationCap, BookOpen, Award, CheckCircle2, ChevronDown, Sparkles, School, Calendar, MapPin } from 'lucide-react';
import { ScrambleSpan } from './ScrambleSpan';
import { cyberAudio } from '../utils/audio';
import { ACADEMIC_HISTORY } from '../data/portfolioData';

export const AcademicSection: React.FC = () => {
  return (
    <section
      id="academic"
      className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-24 section-separator"
    >
      {/* Section Header */}
      <div className="font-mono text-[18px] sm:text-[20px] md:text-[24px] text-[#00ff41] mb-8 md:mb-12 flex items-center gap-3 md:gap-4 persistent-glitch">
        <GraduationCap className="w-6 h-6 text-[#00ff41]" />
        <h2 className="font-bold tracking-tight">
          <ScrambleSpan text="ACADEMIC BACKGROUND & EDUCATION" />
        </h2>
      </div>

      {/* Degrees Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {ACADEMIC_HISTORY.map((item) => (
          <div
            key={item.shortCode}
            id={`academic-card-${item.shortCode}`}
            onMouseEnter={() => cyberAudio.playHover()}
            className="cyber-card p-6 md:p-8 border-l-4 border-l-[#00ff41] flex flex-col justify-between text-left"
          >
            <div>
              {/* Header Status & Code */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="font-mono text-[11px] text-[#00f3ff] bg-[#1c1b1b] border border-[#00f3ff]/30 px-2 py-0.5">
                  [{item.shortCode}]
                </span>
                <span className={`font-mono text-[11px] px-2.5 py-0.5 ${
                  item.status === 'ACTIVE_RESEARCH'
                    ? 'text-[#00ff41] bg-[#00ff41]/10 border border-[#00ff41]/40 animate-pulse'
                    : 'text-[#8e9c8b] bg-[#1c1b1b] border border-[#353534]'
                }`}>
                  [{item.status === 'ACTIVE_RESEARCH' ? 'IN PROGRESS' : 'COMPLETED'}]
                </span>
              </div>

              {/* Degree Title */}
              <h3 className="font-mono text-[18px] md:text-[20px] font-bold text-[#e5e2e1] mb-2 flex items-center gap-2">
                <BookOpen size={18} className="text-[#00ff41] shrink-0" />
                <ScrambleSpan text={item.degree} />
              </h3>

              {/* Institution & Period */}
              <div className="flex flex-wrap items-center gap-4 text-[#00f3ff] font-mono text-[13px] mb-4">
                <span className="flex items-center gap-1.5 text-[#00f3ff] font-bold">
                  <School size={15} />
                  <span>{item.institution}</span>
                </span>
                <span className="flex items-center gap-1 text-[#8e9c8b]">
                  <Calendar size={13} />
                  <span>{item.period}</span>
                </span>
              </div>

              {/* Description */}
              <p className="font-sans text-[14px] text-[#8e9c8b] leading-relaxed mb-6">
                {item.description}
              </p>
            </div>

            {/* Key Focus & Highlights */}
            <div className="pt-4 border-t border-[#353534]/70">
              <div className="text-[11px] font-mono text-[#00ff41] mb-2 flex items-center gap-1.5 font-bold">
                <Sparkles size={12} />
                <span>CORE_ACADEMIC_FOCUS:</span>
              </div>
              <ul className="space-y-1.5 text-[12px] font-sans text-[#b9ccb2]">
                {item.details.map((d, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#00ff41] font-mono select-none">›</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
