import React, { useState } from 'react';
import { Settings2, CheckCircle2, ChevronRight, Terminal, BarChart2, ShieldCheck, Layers } from 'lucide-react';
import { ScrambleSpan } from './ScrambleSpan';
import { cyberAudio } from '../utils/audio';
import { TECH_STACK } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleRowClick = (id: string) => {
    cyberAudio.playSelect();
    setActiveCategory(activeCategory === id ? null : id);
  };

  return (
    <section
      id="skills"
      className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-24 section-separator"
    >
      {/* Section Header */}
      <div className="font-mono text-[18px] sm:text-[20px] md:text-[24px] text-[#00ff41] mb-8 md:mb-12 flex items-center gap-3 md:gap-4 persistent-glitch">
        <Settings2 className="w-6 h-6 text-[#00ff41]" />
        <h2 className="font-bold tracking-tight">
          <ScrambleSpan text="CORE SKILLS & TECHNICAL STACK" />
        </h2>
      </div>

      {/* Main Core Skills Cyber Card */}
      <div className="cyber-card p-4 sm:p-6 md:p-8 font-mono text-[12px] md:text-[14px]">
        <div className="flex flex-col gap-3">
          {TECH_STACK.map((skill) => {
            const isExpanded = activeCategory === skill.id;
            return (
              <div
                key={skill.id}
                id={`skill-row-${skill.id}`}
                onMouseEnter={() => cyberAudio.playHover()}
                className={`border border-[#353534] transition-all ${
                  isExpanded ? 'bg-[#1c1b1b] border-[#00ff41]/50 p-4' : 'bg-[#0e0e0e]/80 hover:border-[#00ff41]/40 hover:bg-[#151515] p-3 sm:p-4'
                }`}
              >
                <div
                  onClick={() => handleRowClick(skill.id)}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6 items-center cursor-pointer group"
                >
                  {/* Category Title Column (4 cols on desktop) */}
                  <div className="lg:col-span-4 flex items-center gap-2">
                    <ChevronRight
                      size={15}
                      className={`text-[#00ff41] transition-transform duration-200 shrink-0 ${
                        isExpanded ? 'rotate-90 text-[#00f3ff]' : 'group-hover:translate-x-1'
                      }`}
                    />
                    <span className="text-[#00f3ff] font-mono font-bold group-hover:text-[#00ff41] transition-colors text-[13px] md:text-[14px]">
                      <ScrambleSpan text={skill.title} />
                    </span>
                  </div>

                  {/* Skills / Tech List Column (7 cols on desktop) */}
                  <div className="lg:col-span-7 text-[#8e9c8b] group-hover:text-[#e5e2e1] transition-colors font-sans text-[13px] md:text-[14px] flex flex-wrap items-center gap-x-2 gap-y-1">
                    {skill.items.map((item, idx) => (
                      <span key={idx} className="inline-flex items-center">
                        <span className="text-[#c8d6c5]">{item}</span>
                        {idx < skill.items.length - 1 && (
                          <span className="text-[#555555] ml-2 select-none">•</span>
                        )}
                      </span>
                    ))}
                  </div>

                  {/* Action Trigger Column (1 col on desktop) */}
                  <div className="lg:col-span-1 flex items-center justify-end font-mono text-[11px] text-[#00ff41]/70 group-hover:text-[#00ff41]">
                    <span className="px-2.5 py-0.5 border border-[#353534] group-hover:border-[#00ff41]/50 bg-[#121212] transition-colors">
                      {isExpanded ? 'CLOSE' : 'DETAILS'}
                    </span>
                  </div>
                </div>

                {/* Expanded Skill Telemetry Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-[#353534]/80 animate-in fade-in duration-200">
                    <p className="text-[#b9ccb2] font-sans text-[13px] mb-4">
                      {skill.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {skill.skills.map((detail, idx) => (
                        <div
                          key={idx}
                          className="bg-[#0a0a0a] border border-[#353534] p-3 flex flex-col gap-2"
                        >
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-[#e5e2e1] font-mono">{detail.name}</span>
                            <span className="text-[#00f3ff] text-[10px] border border-[#00f3ff]/40 px-1.5 py-0.5 bg-[#121212]">
                              {detail.tag}
                            </span>
                          </div>
                          {/* Visual Benchmark Bar */}
                          <div className="w-full bg-[#1c1b1b] h-1.5 overflow-hidden">
                            <div
                              className="bg-[#00ff41] h-full transition-all duration-700"
                              style={{ width: `${detail.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Operational Status Footer Bar */}
        <div className="mt-6 md:mt-8 pt-4 border-t border-[#353534] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#00ff41] text-[11px] md:text-[13px]">
            <CheckCircle2 size={16} className="text-[#00ff41]" />
            <span className="font-bold tracking-wide">
              <ScrambleSpan text="STATUS: ACTIVE & VERIFIED" delay={400} />
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-[#666666]">
            <span className="flex items-center gap-1">
              <Layers size={13} className="text-[#00f3ff]" /> 4 SKILL CATEGORIES
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <ShieldCheck size={13} className="text-[#00ff41]" /> REPRODUCIBLE CODE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
