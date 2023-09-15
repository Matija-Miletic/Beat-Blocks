import { useState } from 'react'
import Cell from './Cell'

interface Props {
  trackNumber: number
  steps: number
}

// TODO: pass in available sounds as props for sound selection
// TODO: populate sound selection with available sounds

export default function Track({ trackNumber, steps }: Props) {
  const [sound, setSound] = useState(1)
  const cells = [...Array(steps).keys()]

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSound(Number(e.target.value))
  }

  return (
    <div id={`track-${trackNumber}`} className="track">
      <select
        name="soundselection"
        id={`soundselection-${trackNumber}`}
        onChange={onChange}
        value={sound}
      >
        <option value="1">Clap</option>
        <option value="2">Hihat</option>
        <option value="3">Snare</option>
        <option value="4">Kick</option>
      </select>
      {cells.map((cell) => {
        return <Cell key={cell} trackNumber={trackNumber} cellNumber={cell} />
      })}
    </div>
  )
}
