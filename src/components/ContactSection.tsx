import React, { useState } from 'react';
import { Radio, Mail, Github, Linkedin, Send, Copy, Check, Terminal, Shield, ArrowUpRight, MessageSquare, Globe } from 'lucide-react';
import { ScrambleSpan } from './ScrambleSpan';
import { cyberAudio } from '../utils/audio';
import { BIO_DATA, CONTACT_CHANNELS } from '../data/portfolioData';

interface ContactSectionProps {
  onOpenTerminal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenTerminal }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showDirectForm, setShowDirectForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [transmitting, setTransmitting] = useState(false);
  const [transmitted, setTransmitted] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    cyberAudio.playCopy();
    navigator.clipboard.writeText(BIO_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    cyberAudio.playClick();
    setTransmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xaewgppg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setTransmitting(false);
        setTransmitted(true);
        cyberAudio.playSuccess();
      } else {
        setTransmitting(false);
        cyberAudio.playError();
        alert('Transmission error. Please email directly to alipmirzaei@gmail.com');
      }
    } catch (err) {
      setTransmitting(false);
      cyberAudio.playError();
      alert('Network error. Please email directly to alipmirzaei@gmail.com');
    }
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'WEBSITE':
        return <Globe size={16} className="text-[#00ff41]" />;
      case 'EMAIL':
        return <Mail size={16} className="text-[#00ff41]" />;
      case 'GITHUB':
        return <Github size={16} className="text-[#00ff41]" />;
      case 'LINKEDIN':
        return <Linkedin size={16} className="text-[#00ff41]" />;
      case 'TELEGRAM':
        return <Send size={16} className="text-[#00ff41]" />;
      default:
        return <Radio size={16} className="text-[#00ff41]" />;
    }
  };

  return (
    <section
      id="contact"
      className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-24 section-separator"
    >
      {/* Section Header */}
      <div className="font-mono text-[18px] sm:text-[20px] md:text-[24px] text-[#00ff41] mb-8 md:mb-12 flex items-center gap-3 md:gap-4 persistent-glitch">
        <Radio className="w-6 h-6 text-[#00ff41] animate-pulse" />
        <h2 className="font-bold tracking-tight">
          <ScrambleSpan text="GET IN TOUCH & COLLABORATION" />
        </h2>
      </div>

      {/* Main Container - Full Width & Spacious */}
      <div className="cyber-card p-5 sm:p-8 md:p-10 flex flex-col gap-6 md:gap-8 text-left w-full">
        <p className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-[#8e9c8b] leading-relaxed w-full">
          Open to research collaborations, academic inquiries, machine learning engineering, and autonomous AI system design. Initialize a connection sequence below or dispatch an encrypted direct transmission.
        </p>

        {/* Contact Links Grid - Full Width 4-Columns on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full font-mono text-[12px] md:text-[13px]">
          {CONTACT_CHANNELS.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => cyberAudio.playHover()}
              className="bg-[#0e0e0e] border border-[#353534] hover:border-[#00ff41] p-4 sm:p-5 flex flex-col justify-between transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#00f3ff] font-bold flex items-center gap-2">
                  {renderIcon(item.name)}
                  <span>{item.name}</span>
                </span>
                {item.isEmail ? (
                  <button
                    onClick={handleCopyEmail}
                    className="text-[11px] text-[#00ff41] hover:text-[#00f3ff] flex items-center gap-1 border border-[#00ff41]/40 px-2 py-0.5 cyber-button cursor-pointer"
                  >
                    {copiedEmail ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copiedEmail ? 'COPIED!' : 'COPY'}</span>
                  </button>
                ) : (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => cyberAudio.playClick()}
                    className="text-[11px] text-[#00ff41] hover:text-[#00f3ff] flex items-center gap-1 border border-[#00ff41]/40 px-2 py-0.5 cyber-button cursor-pointer"
                  >
                    <span>{item.actionLabel}</span>
                    <ArrowUpRight size={12} />
                  </a>
                )}
              </div>

              <div className="text-[#e5e2e1] group-hover:text-[#00ff41] transition-colors break-all text-[12px] sm:text-[13px]">
                {item.isEmail ? (
                  <a
                    href={`mailto:${item.value}`}
                    onClick={() => cyberAudio.playClick()}
                    className="hover:underline"
                  >
                    {item.value}
                  </a>
                ) : item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span>{item.value}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Direct Transmission Form Toggle */}
        <div className="pt-4 sm:pt-6 border-t border-[#353534] flex flex-col gap-4 w-full">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => {
                cyberAudio.playClick();
                setShowDirectForm(!showDirectForm);
              }}
              className="bg-[#1c1b1b] border border-[#00ff41] hover:bg-[#00ff41] hover:text-[#000000] text-[#00ff41] font-mono text-[12px] sm:text-[13px] font-bold px-5 py-3 flex items-center gap-2 cyber-button cursor-pointer transition-colors"
            >
              <MessageSquare size={15} />
              <span>
                {showDirectForm ? 'CLOSE FORM' : 'SEND A MESSAGE'}
              </span>
            </button>

            <button
              onClick={() => {
                cyberAudio.playClick();
                onOpenTerminal();
              }}
              className="text-[#8e9c8b] hover:text-[#00f3ff] font-mono text-[11px] sm:text-[12px] flex items-center gap-1.5 cursor-pointer py-1"
            >
              <Terminal size={14} className="text-[#00f3ff]" />
              <span>Or type "contact" in terminal</span>
            </button>
          </div>

          {/* Collapsible Transmission Terminal Form - Full Width */}
          {showDirectForm && (
            <div className="w-full bg-[#0e0e0e] border border-[#00ff41]/60 p-4 sm:p-6 md:p-8 mt-2 font-mono text-[12px] animate-in fade-in duration-200">
              <div className="text-[#00f3ff] pb-3 mb-5 border-b border-[#353534] flex items-center justify-between">
                <span className="flex items-center gap-2 font-bold text-[12px] sm:text-[13px]">
                  <Shield size={15} className="text-[#00ff41]" />
                  &gt; DIRECT INQUIRY &amp; COLLABORATION FORM
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#00ff41] font-mono">STATUS: READY</span>
              </div>

              {transmitted ? (
                <div className="bg-[#00ff41]/10 border border-[#00ff41] p-6 sm:p-8 text-center flex flex-col items-center gap-3">
                  <Check size={36} className="text-[#00ff41] animate-bounce" />
                  <div className="text-[#00ff41] text-[14px] sm:text-[15px] font-bold">
                    MESSAGE SENT SUCCESSFULLY
                  </div>
                  <p className="text-[#b9ccb2] text-[13px] font-sans max-w-lg">
                    Thank you for reaching out! Ali has received your message and will get back to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setTransmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="mt-3 text-[#00ff41] border border-[#00ff41] px-5 py-2 hover:bg-[#00ff41] hover:text-[#000000] cyber-button cursor-pointer"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="flex flex-col gap-4 sm:gap-5 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
                    <div>
                      <label className="text-[#b9ccb2] block mb-1.5 text-[11px] font-mono">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Alex Chen"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#131313] border border-[#353534] focus:border-[#00ff41] p-3 text-[#e5e2e1] outline-none text-[12px] sm:text-[13px]"
                      />
                    </div>

                    <div>
                      <label className="text-[#b9ccb2] block mb-1.5 text-[11px] font-mono">
                        YOUR EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@organization.edu"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#131313] border border-[#353534] focus:border-[#00ff41] p-3 text-[#e5e2e1] outline-none text-[12px] sm:text-[13px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[#b9ccb2] block mb-1.5 text-[11px] font-mono">
                      SUBJECT
                    </label>
                    <input
                      type="text"
                      placeholder="Research Collaboration / ML Inquiries"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#131313] border border-[#353534] focus:border-[#00ff41] p-3 text-[#e5e2e1] outline-none text-[12px] sm:text-[13px]"
                    />
                  </div>

                  <div>
                    <label className="text-[#b9ccb2] block mb-1.5 text-[11px] font-mono">
                      MESSAGE *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Describe your inquiry, research proposal, or collaboration..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#131313] border border-[#353534] focus:border-[#00ff41] p-3 text-[#e5e2e1] outline-none text-[12px] sm:text-[13px] resize-y font-sans leading-relaxed"
                    />
                  </div>

                  <div className="flex flex-wrap justify-end items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowDirectForm(false)}
                      className="text-[#666666] hover:text-[#e5e2e1] px-4 py-2 cursor-pointer font-mono text-[12px]"
                    >
                      CANCEL
                    </button>
                    <button
                      type="submit"
                      disabled={transmitting}
                      className="bg-[#00ff41] hover:bg-[#72ff70] text-[#000000] font-mono text-[12px] sm:text-[13px] font-bold px-7 py-3 flex items-center gap-2 cyber-button cursor-pointer disabled:opacity-50"
                    >
                      <Send size={15} className={transmitting ? 'animate-spin' : ''} />
                      <span>{transmitting ? 'SENDING MESSAGE...' : 'SEND MESSAGE'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
