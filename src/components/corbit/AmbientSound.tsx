import { useEffect, useRef, useState } from "react";

export function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [level, setLevel] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
    if (!isPlaying) {
      setLevel(0);
      return;
    }

    const interval = setInterval(() => {
      if (isPlayingRef.current) {
        // Subtle VU meter oscillation
        setLevel(Math.floor(45 + Math.random() * 40));
      }
    }, 120);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const toggleAudio = () => {
    if (isPlaying) {
      if (audioCtxRef.current && gainNodeRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 0.2);
        setTimeout(() => {
          if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
            audioCtxRef.current.suspend();
          }
        }, 300);
      }
      setIsPlaying(false);
    } else {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioCtxRef.current) {
          const ctx = new AudioContextClass();
          audioCtxRef.current = ctx;

          // Generate gentle analog vinyl tape hiss & low warm drone
          const bufferSize = ctx.sampleRate * 2;
          const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          let lastOut = 0.0;

          // Pink/brown noise algorithm for warm, non-harsh analog ambiance
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            const currentVal = (lastOut + 0.02 * white) / 1.02;
            lastOut = currentVal;
            output[i] = currentVal * 3.5;
          }

          const whiteNoise = ctx.createBufferSource();
          whiteNoise.buffer = noiseBuffer;
          whiteNoise.loop = true;

          // Lowpass filter at 420Hz for deep warm room tone
          const filter = ctx.createBiquadFilter();
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(420, ctx.currentTime);

          // Subtle sub-harmonic oscillator
          const subOsc = ctx.createOscillator();
          subOsc.type = "sine";
          subOsc.frequency.setValueAtTime(55, ctx.currentTime); // 55Hz warm hum

          const subGain = ctx.createGain();
          subGain.gain.setValueAtTime(0.04, ctx.currentTime);

          const mainGain = ctx.createGain();
          mainGain.gain.setValueAtTime(0.05, ctx.currentTime);
          gainNodeRef.current = mainGain;

          whiteNoise.connect(filter);
          filter.connect(mainGain);
          subOsc.connect(subGain);
          subGain.connect(mainGain);
          mainGain.connect(ctx.destination);

          whiteNoise.start();
          subOsc.start();
        } else {
          audioCtxRef.current.resume();
          if (gainNodeRef.current) {
            gainNodeRef.current.gain.setTargetAtTime(0.05, audioCtxRef.current.currentTime, 0.2);
          }
        }
        setIsPlaying(true);
      } catch {
        // Web Audio autoplay interaction required - user must enable manually
      }
    }
  };

  return (
    <div className="ambient-controller" title="Toggle Analog Studio Ambiance">
      <button
        type="button"
        className={`ambient-btn${isPlaying ? " active" : ""}`}
        onClick={toggleAudio}
        aria-label={isPlaying ? "Mute Studio Ambiance" : "Play Studio Ambiance"}
      >
        <span className="ambient-led" />
        <span className="ambient-label">{isPlaying ? "TAPE ON" : "TAPE"}</span>
        <div className="ambient-vu">
          <div className="vu-bar" style={{ height: isPlaying ? `${level}%` : "15%" }} />
          <div
            className="vu-bar"
            style={{ height: isPlaying ? `${Math.max(10, level - 15)}%` : "15%" }}
          />
        </div>
      </button>
    </div>
  );
}
