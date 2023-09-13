import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';

function SynthControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [synth, setSynth] = useState<Tone.Synth | null>(null);
  const [loop, setLoop] = useState<Tone.Loop | null>(null);

  useEffect(() => {
    const newSynth = new Tone.Synth().toDestination();
    setSynth(newSynth);

    const newLoop = new Tone.Loop((time) => {
      newSynth.triggerAttackRelease("C4", "8n", time);
    }, "4n").start(0);

    setLoop(newLoop);

    return () => {
      newSynth.dispose();
      newLoop.dispose();
    };
  }, []);

  const handlePlay = () => {
    if (!isPlaying) {
      Tone.start();
      Tone.Transport.start();
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (isPlaying) {
      Tone.Transport.stop();
      setIsPlaying(false);
    }
  };

  const toggleLoop = () => {
    if (loop) {
      loop.mute = !isLooping;
      setIsLooping(!isLooping);
    }
  };

  return (
    <div>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={toggleLoop}>{isLooping ? 'Disable Loop' : 'Enable Loop'}</button>
    </div>
  );
}

export default SynthControl;
