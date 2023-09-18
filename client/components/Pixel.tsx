import { useState, useEffect, MouseEventHandler } from 'react'
import * as Tone from 'tone'

import * as lib from '../../lib/lib.ts'

// interface PixelProps {
//   id: number
// }

export default function Pixel(props: { id: number }) {
  const MIN = 2000
  const MAX = 10000
  const PIXEL_SIZE = 40

  const [isSelected, setIsSelected] = useState(false)

  const [color, setColor] = useState(lib.getRandomColor())

  // useEffect(() => {
  //   setInterval(
  //     () => {
  //       setColor(lib.getRandomColor())
  //     },
  //     lib.getRandomNumber(MIN, MAX),
  //   )
  // }, [])

  function onMouseEnter() {
    setColor(lib.getRandomColor())
    Tone.context.resume()
    const synth = new Tone.Synth({
      oscillator: {
        type: 'fatcustom',
        partials: [0.2, 1, 0, 0.5, 0.1],
        spread: 40,
        count: 3,
      },
      envelope: {
        attack: 0.001,
        decay: 1.6,
        sustain: 0,
        release: 1.6,
      },
    }).toDestination()
    const randomFrequency = Math.random() * (500 - 20) + 20

    synth.triggerAttackRelease(randomFrequency, '8n')
  }

  return (
    <div
      className="pixel"
      id={`pixel-${props.id}`}
      onMouseEnter={onMouseEnter}
      style={{
        height: PIXEL_SIZE,
        width: PIXEL_SIZE,
        backgroundColor: color,
      }}
    ></div>
  )
}
