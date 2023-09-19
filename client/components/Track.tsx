
import Cell2 from './Cell2'
import Cell from './Cell'


interface TrackProps {
  trackNumber: number;
  steps: number;
  reset: boolean;  // Add handleReset prop
}

export default function Track({ trackNumber, steps, reset }: TrackProps) {
  const cells = [...Array(steps).keys()];

  return (
<div id={`track-${trackNumber}`} className="track">
      <button style={{ minWidth: '60px', textAlign: 'left' }}>
        {['', '808', 'Clap', 'Tap', 'Hihat', 'Snare', 'Kick'][trackNumber]}
      </button>
      {cells.map((cell) => {

        if (trackNumber === 0) {
          return (
            <Cell2 key={cell} trackNumber={trackNumber} cellNumber={cell} />
          )
        } else {
          return <Cell key={cell} trackNumber={trackNumber} cellNumber={cell} reset={reset} // Pass the handleReset function to Cell />
        }

      })}
    </div>
  );
}
