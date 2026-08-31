/**
 * Professional Minimalist Web Audio Synthesis Engine
 * 
 * Designed for high-end developer interfaces (Linear / Vercel style).
 * Features ultra-subtle, tactile acoustic haptics, low-latency execution,
 * dynamic limiting, and automatic activation on initial page interaction.
 */

class CyberAudioEngine {
  private ctx: AudioContext | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private masterGain: GainNode | null = null;
  public enabled: boolean = true;
  private lastHoverTime: number = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('alipmirzaei_audio_enabled');
        if (saved !== null) {
          this.enabled = saved === 'true';
        }
      } catch {
        // LocalStorage fallback
      }

      // Eagerly unlock AudioContext on ANY early interaction (mouse movement, scroll, touch, focus, click)
      const unlock = () => {
        this.initContext();
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume().catch(() => {});
        }
      };

      const earlyEvents = ['mousemove', 'pointermove', 'scroll', 'focus', 'click', 'pointerdown', 'keydown', 'touchstart'];
      earlyEvents.forEach((evt) => {
        window.addEventListener(evt, unlock, { capture: true, passive: true });
      });

      // Try initial resume immediately on DOM ready
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        unlock();
      } else {
        window.addEventListener('DOMContentLoaded', unlock, { once: true });
      }
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();

        // Dynamics Compressor to guarantee zero digital distortion or harshness
        this.compressor = this.ctx.createDynamicsCompressor();
        this.compressor.threshold.setValueAtTime(-20, this.ctx.currentTime);
        this.compressor.knee.setValueAtTime(8, this.ctx.currentTime);
        this.compressor.ratio.setValueAtTime(6, this.ctx.currentTime);
        this.compressor.attack.setValueAtTime(0.002, this.ctx.currentTime);
        this.compressor.release.setValueAtTime(0.1, this.ctx.currentTime);

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);

        this.compressor.connect(this.masterGain);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
    try {
      localStorage.setItem('alipmirzaei_audio_enabled', String(val));
    } catch {
      // Ignored
    }
    if (val) {
      this.playToggle(true);
    }
  }

  /**
   * Whisper-quiet micro-haptic hover feedback (subtle, non-distracting)
   */
  public playHover() {
    if (!this.enabled) return;
    const nowMs = performance.now();
    if (nowMs - this.lastHoverTime < 50) return;
    this.lastHoverTime = nowMs;

    try {
      this.initContext();
      if (!this.ctx || !this.compressor || this.ctx.state === 'suspended') return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(820, now);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.014);

      gain.gain.setValueAtTime(0.008, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.014);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.compressor);

      osc.start(now);
      osc.stop(now + 0.014);
    } catch {
      // Ignore
    }
  }

  /**
   * Crisp, tactile UI button click
   */
  public playClick() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx || !this.compressor) return;

      const now = this.ctx.currentTime;

      // Layer 1: Subdued transient snap
      const oscAttack = this.ctx.createOscillator();
      const gainAttack = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.setValueAtTime(2.0, now);

      oscAttack.type = 'triangle';
      oscAttack.frequency.setValueAtTime(1100, now);
      oscAttack.frequency.exponentialRampToValueAtTime(380, now + 0.02);

      gainAttack.gain.setValueAtTime(0.025, now);
      gainAttack.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

      oscAttack.connect(filter);
      filter.connect(gainAttack);
      gainAttack.connect(this.compressor);

      oscAttack.start(now);
      oscAttack.stop(now + 0.02);

      // Layer 2: Warm tactile bottom end
      const oscBody = this.ctx.createOscillator();
      const gainBody = this.ctx.createGain();

      oscBody.type = 'sine';
      oscBody.frequency.setValueAtTime(260, now);
      oscBody.frequency.exponentialRampToValueAtTime(120, now + 0.025);

      gainBody.gain.setValueAtTime(0.018, now);
      gainBody.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      oscBody.connect(gainBody);
      gainBody.connect(this.compressor);

      oscBody.start(now);
      oscBody.stop(now + 0.025);
    } catch {
      // Ignore
    }
  }

  /**
   * Terminal Command Execution Shutter (clean, snappy, professional prompt return)
   */
  public playCommandExecute() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx || !this.compressor) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2200, now);

      // Subtle mechanical shell shutter click
      osc.type = 'sine';
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.024);

      gain.gain.setValueAtTime(0.028, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.024);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.compressor);

      osc.start(now);
      osc.stop(now + 0.024);
    } catch {
      // Ignore
    }
  }

  /**
   * Refined harmonic selection tap for topic filters & skill rows
   */
  public playSelect() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx || !this.compressor) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.035);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(gain);
      gain.connect(this.compressor);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch {
      // Ignore
    }
  }

  /**
   * Subdued futuristic HUD power-up whisper when terminal opens
   */
  public playTerminalOpen() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx || !this.compressor) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(2400, now + 0.08);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(580, now + 0.08);

      gain.gain.setValueAtTime(0.022, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.compressor);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Ignore
    }
  }

  /**
   * Subdued downward power-down whisper when terminal closes
   */
  public playTerminalClose() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx || !this.compressor) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.07);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.compressor);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      // Ignore
    }
  }

  /**
   * Subtle tactile keystroke tap for typing
   */
  public playKeypress() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx || !this.compressor) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520 + (Math.random() * 60 - 30), now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.012);

      gain.gain.setValueAtTime(0.012, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

      osc.connect(gain);
      gain.connect(this.compressor);

      osc.start(now);
      osc.stop(now + 0.012);
    } catch {
      // Ignore
    }
  }

  /**
   * Elegant dual-harmonic confirmation chime for real form transmissions
   */
  public playSuccess() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx || !this.compressor) return;

      const now = this.ctx.currentTime;
      [659.25, 987.77].forEach((freq, idx) => { // E5 -> B5 soft major 5th
        if (!this.ctx || !this.compressor) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.05;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.024, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.18);

        osc.connect(gain);
        gain.connect(this.compressor);

        osc.start(startTime);
        osc.stop(startTime + 0.18);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Crisp confirmation pip on clipboard copy
   */
  public playCopy() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx || !this.compressor) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(920, now);
      osc.frequency.exponentialRampToValueAtTime(1280, now + 0.035);

      gain.gain.setValueAtTime(0.024, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(gain);
      gain.connect(this.compressor);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch {
      // Ignore
    }
  }

  /**
   * Clean subtle bi-tonal switch for feature toggles
   */
  public playToggle(isOn: boolean = true) {
    if (!this.enabled && !isOn) return;
    try {
      this.initContext();
      if (!this.ctx || !this.compressor) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      if (isOn) {
        osc.frequency.setValueAtTime(480, now);
        osc.frequency.setValueAtTime(640, now + 0.02);
      } else {
        osc.frequency.setValueAtTime(640, now);
        osc.frequency.setValueAtTime(480, now + 0.02);
      }

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.compressor);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Ignore
    }
  }

  /**
   * Subdued, soft low-frequency double thud for errors
   */
  public playError() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx || !this.compressor) return;

      const now = this.ctx.currentTime;
      [0, 0.045].forEach((delay) => {
        if (!this.ctx || !this.compressor) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + delay;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, startTime);
        osc.frequency.exponentialRampToValueAtTime(75, startTime + 0.03);

        gain.gain.setValueAtTime(0.022, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.03);

        osc.connect(gain);
        gain.connect(this.compressor);

        osc.start(startTime);
        osc.stop(startTime + 0.03);
      });
    } catch {
      // Ignore
    }
  }
}

export const cyberAudio = new CyberAudioEngine();
