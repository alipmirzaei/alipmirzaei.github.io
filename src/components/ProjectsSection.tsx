import React, { useState } from 'react';
import {
  FlaskConical,
  Cpu,
  TrendingUp,
  Bot,
  ExternalLink,
  Github,
  Search,
  Sparkles,
  Activity,
  Compass,
  Layers,
} from 'lucide-react';
import { FeaturedRepo } from '../types';
import { ScrambleSpan } from './ScrambleSpan';
import { cyberAudio } from '../utils/audio';
import { FEATURED_REPOSITORIES, RESEARCH_INTERESTS } from '../data/portfolioData';

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const filters = ['ALL', 'Computer Vision', 'NLP & LLMs', 'Time-Series', 'AI Copilot', 'Game AI & Search'];

  const filteredRepos =
    activeFilter === 'ALL'
      ? FEATURED_REPOSITORIES
      : FEATURED_REPOSITORIES.filter((r) => r.focus.toLowerCase().includes(activeFilter.toLowerCase()) || r.focus === activeFilter);

  const renderIcon = (type: FeaturedRepo['iconType']) => {
    switch (type) {
      case 'vision':
        return <Cpu size={16} className="text-[#00ff41]" />;
      case 'nlp':
        return <Sparkles size={16} className="text-[#00f3ff]" />;
      case 'timeseries':
        return <Activity size={16} className="text-[#00ff41]" />;
      case 'weather':
        return <TrendingUp size={16} className="text-[#00f3ff]" />;
      case 'copilot':
        return <Bot size={16} className="text-[#00ff41]" />;
      case 'gameai':
        return <Compass size={16} className="text-[#00f3ff]" />;
    }
  };

  return (
    <section
      id="projects"
      className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-24 section-separator"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-12">
        <div className="font-mono text-[18px] sm:text-[20px] md:text-[24px] text-[#00ff41] flex items-center gap-3 md:gap-4 persistent-glitch">
          <FlaskConical className="w-6 h-6 text-[#00ff41]" />
          <h2 className="font-bold tracking-tight">
            <ScrambleSpan text="FEATURED RESEARCH & REPOSITORIES" />
          </h2>
        </div>

        <span className="font-mono text-[11px] text-[#00f3ff] bg-[#1c1b1b] border border-[#00f3ff]/30 px-3 py-1 w-fit">
          &gt; SYNCED_REPOS: 6_ACTIVE_SYSTEMS
        </span>
      </div>

      {/* Research Focus & Interests Summary Grid */}
      <div className="mb-12">
        <div className="text-[12px] font-mono text-[#8e9c8b] mb-4 flex items-center gap-2">
          <Layers size={14} className="text-[#00ff41]" />
          <span>&gt; FOCUS_&amp;_RESEARCH_INTERESTS:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {RESEARCH_INTERESTS.map((interest) => (
            <div
              key={interest.id}
              onMouseEnter={() => cyberAudio.playHover()}
              className="bg-[#0e0e0e] border border-[#353534] hover:border-[#00ff41] p-4 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex justify-between items-center mb-2 font-mono text-[11px]">
                  <span className="text-[#00f3ff] font-bold">[{interest.code}]</span>
                  <span className="text-[#666666] group-hover:text-[#00ff41] transition-colors">
                    RESEARCH
                  </span>
                </div>
                <h3 className="font-mono text-[14px] font-bold text-[#e5e2e1] group-hover:text-[#00ff41] transition-colors mb-2">
                  {interest.title}
                </h3>
                <p className="text-[12px] text-[#8e9c8b] font-sans leading-relaxed">
                  {interest.summary}
                </p>
              </div>

              <ul className="mt-3 pt-3 border-t border-[#353534]/50 space-y-1 text-[11px] font-sans text-[#b9ccb2]">
                {interest.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#00ff41] font-mono select-none">›</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Topic Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-[11px]">
        <span className="text-[#666666] mr-2 flex items-center gap-1">
          <Search size={12} /> FILTER_BY:
        </span>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => {
              cyberAudio.playSelect();
              setActiveFilter(f);
            }}
            onMouseEnter={() => cyberAudio.playHover()}
            className={`px-3 py-1.5 border transition-all cursor-pointer ${
              activeFilter === f
                ? 'bg-[#00ff41] text-[#000000] border-[#00ff41] font-bold shadow-[0_0_10px_rgba(0,255,65,0.3)]'
                : 'bg-[#1c1b1b] text-[#b9ccb2] border-[#353534] hover:border-[#00ff41] hover:text-[#00ff41]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Featured Repositories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRepos.map((repo) => (
          <div
            key={repo.id}
            id={`repo-card-${repo.name}`}
            onMouseEnter={() => cyberAudio.playHover()}
            className="cyber-card p-5 md:p-6 flex flex-col h-full group relative overflow-hidden text-left border border-[#353534] hover:border-[#00ff41] transition-all bg-[#0e0e0e]/90"
          >
            {/* Top Row: Repo ID & Clean Focus Badge */}
            <div className="flex items-center justify-between font-mono text-[11px] mb-3 pb-2 border-b border-[#353534]/50">
              <span className="text-[#666666] font-bold">ID: {repo.code}</span>
              <span className="bg-[#1c1b1b] px-2.5 py-0.5 text-[#00f3ff] border border-[#00f3ff]/30 text-[10px] font-mono tracking-wide">
                {repo.focus}
              </span>
            </div>

            {/* Repo Title Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="font-mono text-[15px] md:text-[17px] font-bold text-[#e5e2e1] group-hover:text-[#00ff41] transition-colors break-words flex-1 leading-snug">
                <ScrambleSpan text={repo.name} />
              </h3>
              <div className="p-1.5 bg-[#1c1b1b] border border-[#353534] group-hover:border-[#00ff41]/50 text-[#00ff41] shrink-0 transition-colors">
                <div className="w-5 h-5 flex items-center justify-center">
                  {renderIcon(repo.iconType)}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="font-sans text-[13px] md:text-[14px] text-[#8e9c8b] leading-relaxed mb-5 flex-grow">
              {repo.description}
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 mb-6 font-mono text-[11px]">
              {repo.stack.map((st, i) => (
                <span
                  key={i}
                  className="bg-[#131313] px-2 py-0.5 text-[#b9ccb2] border border-[#353534] group-hover:border-[#00ff41]/40 transition-colors"
                >
                  {st}
                </span>
              ))}
            </div>

            {/* Single Primary Action: Direct Link to GitHub Repo */}
            <div className="pt-4 border-t border-[#353534] mt-auto">
              <a
                href={repo.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => cyberAudio.playClick()}
                className="w-full bg-[#131313] hover:bg-[#00ff41] text-[#00ff41] hover:text-[#000000] border border-[#00ff41]/60 hover:border-[#00ff41] py-2.5 px-4 font-mono text-[12px] font-bold flex items-center justify-center gap-2 transition-all cursor-pointer cyber-button"
                title={`Open ${repo.name} on GitHub`}
              >
                <Github size={15} />
                <span>VIEW REPOSITORY</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
