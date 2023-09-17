import Cell from './Cell'
import Cell2 from './Cell2'

interface Props {
  trackNumber: number
  steps: number
}

export default function Track({ trackNumber, steps }: Props) {
  const cells = [...Array(steps).keys()]

  return (
    <div id={`track-${trackNumber}`} className="track">
      <button style={{ minWidth: '60px', textAlign: 'left' }}>
        {['Clap', 'Hihat', 'Snare', 'Kick', 'Shout'][trackNumber]}
      </button>
      {cells.map((cell) => {
        return <Cell key={cell} trackNumber={trackNumber} cellNumber={cell} />
      })}
    </div>
  )
}
