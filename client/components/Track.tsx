import Cell from './Cell'

interface Props {
  trackNumber: number
  steps: number
}

export default function Track({ trackNumber, steps }: Props) {
  const cells = [...Array(steps).keys()]

  return (
    <div id={`track-${trackNumber}`} className="track">
      <button style={{ minWidth: '60px', textAlign: 'left' }}>
        {
          ['Progress', '808', 'Clap', 'Tap', 'Hihat', 'Snare', 'Kick'][
            trackNumber
          ]
        }
      </button>
      {cells.map((cell) => {
        return <Cell key={cell} trackNumber={trackNumber} cellNumber={cell} />
      })}
    </div>
  )
}
