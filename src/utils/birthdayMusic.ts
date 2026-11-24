/**
 * Gentle Web Audio API music-box synthesizer playing a soft romantic
 * "Happy Birthday" chime loop without relying on external audio files.
 */
class BirthdayMusicPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private noteIndex = 0;

  // Melody frequencies (Hz) & durations (ms) in a soft F-major music-box register
  private melody: Array<{ freq: number; dur: number }> = [
    { freq: 523.25, dur: 380 }, // C5
    { freq: 523.25, dur: 260 }, // C5
    { freq: 587.33, dur: 620 }, // D5
    { freq: 523.25, dur: 620 }, // C5
    { freq: 698.46, dur: 620 }, // F5
    { freq: 659.25, dur: 1050 }, // E5

    { freq: 523.25, dur: 380 }, // C5
    { freq: 523.25, dur: 260 }, // C5
    { freq: 587.33, dur: 620 }, // D5
    { freq: 523.25, dur: 620 }, // C5
    { freq: 783.99, dur: 620 }, // G5
    { freq: 698.46, dur: 1050 }, // F5

    { freq: 523.25, dur: 380 }, // C5
    { freq: 523.25, dur: 260 }, // C5
    { freq: 1046.5, dur: 620 }, // C6
    { freq: 880.0, dur: 620 }, // A5
    { freq: 698.46, dur: 620 }, // F5
    { freq: 659.25, dur: 620 }, // E5
    { freq: 587.33, dur: 980 }, // D5

    { freq: 932.33, dur: 380 }, // Bb5
    { freq: 932.33, dur: 260 }, // Bb5
    { freq: 880.0, dur: 620 }, // A5
    { freq: 698.46, dur: 620 }, // F5
    { freq: 783.99, dur: 620 }, // G5
    { freq: 698.46, dur: 1300 }, // F5
  ];

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return null;
    if (!this.ctx) {
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private playBellNote(freq: number, durationMs: number) {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const overtone = ctx.createOscillator();
    const gain = ctx.createGain();
    const overtoneGain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(freq * 2, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.055, now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationMs / 1000 + 0.35);

    overtoneGain.gain.setValueAtTime(0.0001, now);
    overtoneGain.gain.exponentialRampToValueAtTime(0.015, now + 0.02);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

    osc.connect(gain);
    overtone.connect(overtoneGain);
    gain.connect(ctx.destination);
    overtoneGain.connect(ctx.destination);

    osc.start(now);
    overtone.start(now);
    osc.stop(now + durationMs / 1000 + 0.4);
    overtone.stop(now + 0.3);
  }

  private scheduleNext = () => {
    if (!this.isPlaying) return;
    const note = this.melody[this.noteIndex % this.melody.length];
    this.playBellNote(note.freq, note.dur);
    this.noteIndex = (this.noteIndex + 1) % this.melody.length;

    const pause = this.noteIndex === 0 ? 1100 : 0;
    this.timerId = window.setTimeout(this.scheduleNext, note.dur + pause);
  };

  start(): boolean {
    if (this.isPlaying) return true;
    const ctx = this.ensureContext();
    if (!ctx) return false;
    this.isPlaying = true;
    this.scheduleNext();
    return true;
  }

  stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  getPlaying(): boolean {
    return this.isPlaying;
  }
}

export const birthdayMusic = new BirthdayMusicPlayer();
