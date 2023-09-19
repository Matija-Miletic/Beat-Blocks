import { useEffect, useState } from 'react'
import * as Tone from 'tone'

import Pixel from './Pixel'
import * as lib from '../../lib/lib.ts'

let prevPixelId = ''

export default function BeatPixel() {
  const pixelCount = 64
  const pixelGrid = [...Array(pixelCount).keys()]
  const [isRunning, setIsRunning] = useState(false)

  // TODO: Select a random pixel and highlight that pixel then play a sound
  // TODO: Check all valid orthogonal pixels then move to a random one
  // - Get all valid orthogonal pixels
  // - Select a random one
  // - Move to that pixel

  // TODO: When a pixel is entered into, change to a random color then play a sound
  // - Generate randomn color
  // - Change pixel color
  // - Generate random sound
  // - Play sound

  useEffect(() => {
    setInterval(() => {
      removePreviousPixelHighlight()
      hightlightRandomPixel()
    }, 1000)
  })

  function removePreviousPixelHighlight() {
    // console.log(`Prev Pixel ID: ${prevPixelId}`)
    const prevPixel = document.getElementById(prevPixelId)
    if (prevPixel) {
      prevPixel.style.borderStyle = 'none'
    }
  }

  function hightlightRandomPixel() {
    const randomPixel = Math.floor(Math.random() * pixelCount)
    const pixelId = `pixel-${randomPixel}`
    // console.log(`Prev Pixel ID: ${prevPixelId}`)
    // console.log(`Current Pixel ID: ${pixelId}`)
    prevPixelId = pixelId
    const pixel = document.getElementById(pixelId)
    if (pixel) {
      pixel.style.border = '2px solid black'
    }
  }

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
