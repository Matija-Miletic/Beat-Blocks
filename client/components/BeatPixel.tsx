import * as Tone from 'tone'
import Pixel from './Pixel'
import { useState } from 'react'

export default function BeatPixel() {
  const pixelCount = 64
  const pixelGrid = [...Array(pixelCount).keys()]
  const [isRunning, setIsRunning] = useState(false)

  function handleClick() {
    setIsRunning((prevValue) => !prevValue)
  }

  return (
    <>
      <h2>Beat Pixel</h2>
      <button onClick={handleClick}>{isRunning ? 'STOP' : 'RUN'}</button>
      <div className="pixel-grid">
        {pixelGrid.map((pixel, index) => {
          return <Pixel key={index} id={pixel} />
        })}
      </div>
    </>
  )
}
