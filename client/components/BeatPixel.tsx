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
    if (isRunning) {
      setInterval(() => {
        // Remove previous pixel highlight
        removePreviousPixelHighlight()

        // Get random pixel ID and set it to prevPixelId
        const randomPixelId = getRandomPixelId()
        prevPixelId = randomPixelId

        // Get random color
        const randomColor = lib.getRandomColor()

        // Highlight new pixel
        hightlightRandomPixel(randomPixelId)
        // Change color of new pixel
        const pixel = document.getElementById(randomPixelId)
        if (pixel) {
          pixel.style.backgroundColor = randomColor
        }
        // Play sound
        playSound()
      }, 200)
    } else {
      setIsRunning(false)
    }
  }, [isRunning])

  function removePreviousPixelHighlight() {
    const prevPixel = document.getElementById(prevPixelId)
    if (prevPixel) {
      prevPixel.style.borderStyle = 'none'
    }
  }

  function getRandomPixelId() {
    return `pixel-${Math.floor(Math.random() * pixelCount).toString()}`
  }

  function hightlightRandomPixel(id: string) {
    const pixelId = id
    const pixel = document.getElementById(pixelId)
    if (pixel) {
      pixel.style.border = '2px solid black'
    }
  }

  function playSound() {
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

    const randomFrequency = Math.random() * (150 - 20) + 20

    synth.triggerAttackRelease(randomFrequency, '8n')
  }

  function handleClick() {
    setIsRunning((prevValue) => !prevValue)
  }

  return (
    <>
      <h2>Beat Pixel</h2>
      <button onClick={handleClick}>{isRunning ? 'STOP' : 'START'}</button>
      <div className="pixel-grid">
        {pixelGrid.map((pixel, index) => {
          return <Pixel key={index} id={pixel} />
        })}
      </div>
    </>
  )
}
