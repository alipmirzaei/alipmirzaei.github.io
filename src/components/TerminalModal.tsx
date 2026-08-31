import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon, Maximize2, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react';
import { cyberAudio } from '../utils/audio';
import { BIO_DATA, FEATURED_REPOSITORIES, RESEARCH_INTERESTS, ACADEMIC_HISTORY, TECH_STACK, CONTACT_CHANNELS } from '../data/portfolioData';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleSound: () => void;
}

interface CommandLog {
  id: string;
  type: 'in' | 'out' | 'err' | 'sys';
  text: string;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({
  isOpen,
  onClose,
  onToggleSound,
}) => {
  const [logs, setLogs] = useState<CommandLog[]>([
    { id: '1', type: 'sys', text: 'Ali Mirzaei — Interactive Terminal Interface' },
    { id: '2', type: 'sys', text: 'Type "help" to inspect repositories, research interests, academic history, or system controls.' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    const args = cmd.split(' ');
    const primary = args[0];

    const newLogs: CommandLog[] = [...logs, { id: String(Date.now()), type: 'in', text: `> ${rawCmd}` }];

    switch (primary) {
      case 'help':
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'out',
          text: `AVAILABLE ROUTINES & COMMANDS:
  help               - Display this instruction directory
  bio                - Display full researcher profile and biography
  interests          - List focus & research interest domains
  projects / repos   - List all featured GitHub repositories
  cat <repo_name>    - Inspect full architecture spec of a repository (e.g., "cat vit", "cat lora", "cat ecg", "cat weather", "cat libpilot", "cat mcts")
  skills / stack     - Display Machine Learning, PEFT, Time-Series & Algorithm stack
  academic / edu     - Display M.Sc. (SBU) & B.Sc. (FUM) details
  contact            - View email, website, LinkedIn, Telegram, and GitHub
  audio              - Toggle interactive audio sound effects
  ping               - Test compute cluster latency
  clear              - Wipe terminal screen buffer
  exit / quit        - Close terminal interface`,
        });
        break;

      case 'bio':
      case 'whoami':
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'out',
          text: `[ALI MIRZAEI - RESEARCH PROFILE]
Name:       Ali Mirzaei
Role:       AI & Data Science Researcher
Education:  M.Sc. in Data Mining @ Shahid Beheshti University (SBU)
            B.Sc. in Computer Science @ Ferdowsi University of Mashhad (FUM)
Email:      alipmirzaei@gmail.com
Summary:    Passionate about extracting strategic value from data and engineering autonomous machine learning systems.`,
        });
        break;

      case 'interests':
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'out',
          text: `[FOCUS & RESEARCH INTERESTS]
${RESEARCH_INTERESTS.map((int) => `• [${int.code}] ${int.title}\n  Summary: ${int.summary}`).join('\n\n')}`,
        });
        break;

      case 'projects':
      case 'repos':
      case 'ls':
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'out',
          text: `[FEATURED REPOSITORIES - 6 SYSTEMS ONLINE]
${FEATURED_REPOSITORIES.map((r) => `[${r.code}] ${r.name}\n  Focus: ${r.focus} | Stack: ${r.stack.join(', ')}\n  URL: ${r.repoUrl}`).join('\n\n')}`,
        });
        break;

      case 'cat':
        const target = args[1]?.toLowerCase() || '';
        const matched = FEATURED_REPOSITORIES.find(
          (r) =>
            r.name.toLowerCase().includes(target) ||
            r.code.toLowerCase() === target.toUpperCase() ||
            (target === 'vit' && r.name.includes('vit')) ||
            (target === 'lora' && r.name.includes('lora')) ||
            (target === 'ecg' && r.name.includes('ecg')) ||
            (target === 'weather' && r.name.includes('weather')) ||
            (target === 'libpilot' && r.name.toLowerCase() === 'libpilot') ||
            (target === 'mcts' && r.name.toLowerCase().includes('mcts'))
        );

        if (matched) {
          newLogs.push({
            id: String(Date.now() + 1),
            type: 'out',
            text: `[${matched.code}: ${matched.name}]
Focus:       ${matched.focus}
Description: ${matched.description}
Stack:       ${matched.stack.join(', ')}
URL:         ${matched.repoUrl}

Key Highlights:
${matched.keyHighlights.map((h) => ` - ${h}`).join('\n')}

Telemetry Status:
${matched.telemetryLogs.join('\n')}`,
          });
        } else if (target === 'bio' || target === 'about') {
          newLogs.push({
            id: String(Date.now() + 1),
            type: 'out',
            text: `[BIO SUMMARY]
${BIO_DATA.headline}
${BIO_DATA.subheadline}
${BIO_DATA.educationSummary}`,
          });
        } else {
          newLogs.push({
            id: String(Date.now() + 1),
            type: 'err',
            text: `cat: target "${target}" not found. Try:
  cat vit
  cat lora
  cat ecg
  cat weather
  cat libpilot
  cat mcts
  cat bio`,
          });
        }
        break;

      case 'skills':
      case 'stack':
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'out',
          text: `[CORE TECH STACK & COMPETENCIES]
${TECH_STACK.map((t) => `${t.title}:\n  ${t.items.join(' • ')}`).join('\n\n')}`,
        });
        break;

      case 'academic':
      case 'edu':
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'out',
          text: `[ACADEMIC FORMATION]
${ACADEMIC_HISTORY.map((a) => `• ${a.degree}\n  Institution: ${a.institution}\n  Period: ${a.period} [${a.status}]\n  Focus: ${a.description}`).join('\n\n')}`,
        });
        break;

      case 'contact':
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'out',
          text: `[CONTACT CHANNELS]
${CONTACT_CHANNELS.map((c) => `${c.name.padEnd(10)}: ${c.value} ${c.url ? `(${c.url})` : ''}`).join('\n')}`,
        });
        break;

      case 'audio':
        onToggleSound();
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'sys',
          text: 'Interactive audio sound effects state toggled.',
        });
        break;

      case 'ping':
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'out',
          text: '64 bytes from ml-cluster-sbu.local: icmp_seq=1 ttl=64 time=1.24 ms',
        });
        break;

      case 'clear':
        setLogs([]);
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      case '':
        break;

      default:
        cyberAudio.playError();
        newLogs.push({
          id: String(Date.now() + 1),
          type: 'err',
          text: `Command not recognized: '${rawCmd}'. Type 'help' for directory of valid routines.`,
        });
        break;
    }

    if (primary !== 'clear' && primary !== 'audio' && primary !== '') {
      if (primary === 'help' || primary === 'bio' || primary === 'whoami' || primary === 'projects' || primary === 'repos' || primary === 'cat' || primary === 'skills' || primary === 'stack' || primary === 'academic' || primary === 'edu' || primary === 'contact' || primary === 'interests' || primary === 'ping') {
        cyberAudio.playCommandExecute();
      }
    }

    setLogs(newLogs);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputVal.trim()) {
        setHistory((prev) => [...prev, inputVal]);
        setHistoryIdx(-1);
      }
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      cyberAudio.playClick();
      if (history.length > 0) {
        const nextIdx = historyIdx + 1 < history.length ? historyIdx + 1 : historyIdx;
        setHistoryIdx(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      cyberAudio.playClick();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx] || '');
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    } else if (e.key === 'Escape') {
      cyberAudio.playTerminalClose();
      onClose();
    } else if (e.key.length === 1) {
      cyberAudio.playKeypress();
    }
  };

  return (
    <div
      id="terminal-modal-overlay"
      className={`fixed inset-0 z-[100] flex transition-all duration-300 ${
        isMaximized
          ? 'items-center justify-center p-3 sm:p-6 bg-[#000000]/80 backdrop-blur-md'
          : 'items-end justify-end p-3 sm:p-5 md:p-6 bg-[#000000]/50 backdrop-blur-[2px]'
      }`}
      onClick={onClose}
    >
      <div
        id="terminal-modal-window"
        onClick={(e) => e.stopPropagation()}
        className={`bg-[#0e0e0e] border-2 border-[#00f3ff] shadow-[0_0_35px_rgba(0,243,255,0.3)] flex flex-col transition-all duration-300 ${
          isMaximized
            ? 'w-full h-full'
            : 'w-full sm:w-[560px] md:w-[640px] lg:w-[680px] h-[480px] md:h-[520px] max-h-[85vh] rounded-none'
        }`}
      >
        {/* Terminal Window Header Bar */}
        <div className="bg-[#1c1b1b] border-b border-[#353534] px-4 py-2.5 flex items-center justify-between font-mono text-[12px] select-none">
          <div className="flex items-center gap-2 text-[#00f3ff] font-bold">
            <TerminalIcon size={15} className="text-[#00f3ff]" />
            <span>Ali Mirzaei | Interactive Terminal</span>
          </div>

          <div className="flex items-center gap-3 text-[#b9ccb2]">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="hover:text-[#00ff41] p-1 cursor-pointer"
              title={isMaximized ? 'Restore' : 'Maximize'}
            >
              {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
            <button
              onClick={() => {
                cyberAudio.playTerminalClose();
                onClose();
              }}
              className="hover:text-[#ff3e3e] p-1 cursor-pointer"
              title="Close (ESC)"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Terminal Output Log Area */}
        <div
          className="flex-1 p-4 overflow-y-auto font-mono text-[12px] md:text-[13px] leading-relaxed flex flex-col gap-2 select-text"
          onClick={() => inputRef.current?.focus()}
        >
          {logs.map((log) => (
            <div
              key={log.id}
              className={`whitespace-pre-wrap ${
                log.type === 'in'
                  ? 'text-[#00f3ff] font-bold'
                  : log.type === 'err'
                  ? 'text-[#ff3e3e]'
                  : log.type === 'sys'
                  ? 'text-[#00ff41] font-semibold'
                  : 'text-[#e5e2e1]'
              }`}
            >
              {log.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Command Input Prompt */}
        <div className="bg-[#131313] border-t border-[#353534] px-4 py-2.5 flex items-center gap-2 font-mono text-[13px]">
          <span className="text-[#00ff41] font-bold select-none">&gt;_</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'repos', 'cat lora', 'bio'..."
            className="flex-1 bg-transparent text-[#00ff41] outline-none font-mono text-[13px] placeholder:text-[#666666]"
            autoFocus
          />
          <button
            onClick={() => {
              cyberAudio.playKeypress();
              handleCommand(inputVal);
              setInputVal('');
            }}
            className="text-[#666666] hover:text-[#00ff41] p-1 cursor-pointer"
          >
            <CornerDownLeft size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
