// Web Audio API synthesizer for zero-dependency, ultra-fast audio feedback

class SoundEffects {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private droneOsc: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;

  constructor() {
    // Check saved preference
    const saved = localStorage.getItem('sound_enabled');
    if (saved !== null) {
      this.enabled = saved === 'true';
    }
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    localStorage.setItem('sound_enabled', String(this.enabled));
    if (this.enabled) {
      this.playDing();
    } else {
      this.stopDroneSound();
    }
    return this.enabled;
  }

  // Sweet bubble pop for toddlers & UI
  public playBubblePop() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';

      const baseFreq = 400 + Math.random() * 350;
      osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 2.2, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  // Pentatonic xylophone chime for Nico (3) & Noel (1-2)
  public playXylophone(noteIndex: number = 0) {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const scale = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51];
    const freq = scale[noteIndex % scale.length];

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  // Camera shutter click for Miguel's photography
  public playCameraShutter() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      // Noise burst for mechanical click
      const bufferSize = this.ctx.sampleRate * 0.05;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.6, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.06);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
      
      // Secondary snap click after 70ms
      setTimeout(() => {
        if (!this.ctx || !this.enabled) return;
        const snapOsc = this.ctx.createOscillator();
        const snapGain = this.ctx.createGain();
        snapOsc.type = 'triangle';
        snapOsc.frequency.setValueAtTime(800, this.ctx.currentTime);
        snapOsc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.05);

        snapGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
        snapGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

        snapOsc.connect(snapGain);
        snapGain.connect(this.ctx.destination);
        snapOsc.start();
        snapOsc.stop(this.ctx.currentTime + 0.05);
      }, 70);
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  // Sparkle twinkle for Leti's fashion and interior design
  public playSparkle() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const notes = [1046.5, 1318.5, 1567.98, 2093.0];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx || !this.enabled) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.2);
      }, idx * 60);
    });
  }

  // Drone motor sound in minigame
  public startDroneSound(speedMultiplier: number = 1) {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    if (!this.droneOsc) {
      this.droneOsc = this.ctx.createOscillator();
      this.droneGain = this.ctx.createGain();

      this.droneOsc.type = 'sawtooth';
      this.droneOsc.frequency.setValueAtTime(120 * speedMultiplier, this.ctx.currentTime);

      this.droneGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

      // Lowpass filter to muffle the harsh sawtooth into a drone motor hum
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);

      this.droneOsc.connect(filter);
      filter.connect(this.droneGain);
      this.droneGain.connect(this.ctx.destination);

      this.droneOsc.start();
    } else if (this.droneOsc && this.droneGain) {
      this.droneOsc.frequency.setTargetAtTime(120 + speedMultiplier * 80, this.ctx.currentTime, 0.05);
    }
  }

  public stopDroneSound() {
    if (this.droneOsc) {
      try {
        this.droneOsc.stop();
        this.droneOsc.disconnect();
      } catch (e) {
        // ignore
      }
      this.droneOsc = null;
      this.droneGain = null;
    }
  }

  // Victory fanfare
  public playVictory() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const notes = [
      { f: 523.25, d: 0.12 },
      { f: 659.25, d: 0.12 },
      { f: 783.99, d: 0.12 },
      { f: 1046.50, d: 0.35 }
    ];

    let t = this.ctx.currentTime;
    notes.forEach((n) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, t);
      gain.gain.setValueAtTime(0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + n.d);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(t);
      osc.stop(t + n.d);
      t += n.d * 0.9;
    });
  }

  // Mystery chime for Leti's True Crime investigations
  public playMysteryChime() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      // Minor second / tritone eerie chord
      osc1.frequency.setValueAtTime(311.13, this.ctx.currentTime); // Eb4
      osc2.frequency.setValueAtTime(440.00, this.ctx.currentTime); // A4 (tritone / diabolus in musica)

      gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(this.ctx.currentTime + 1.2);
      osc2.stop(this.ctx.currentTime + 1.2);
    } catch (e) {
      // ignore
    }
  }

  // Subtle tap feedback
  public playDing() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {
      // ignore
    }
  }
}

export const sounds = new SoundEffects();

