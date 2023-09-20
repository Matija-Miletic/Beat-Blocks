import { useEffect, useState } from 'react'
import * as Tone from 'tone'

import Pixel from './Pixel'
import * as lib from '../../lib/lib.ts'
import { Box, IconButton } from '@chakra-ui/react'
import { AiFillPlayCircle, AiOutlineStop } from 'react-icons/ai'

let prevPixelId = ''

// Needs to sit outside of component so it doesn't reinitialize on every render
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

export default function BeatPixel() {
  const pixelCount = 64
  const pixelGrid = [...Array(pixelCount).keys()]
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined = ''

    if (isRunning) {
      interval = setInterval(() => {
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
    } else if (!isRunning && interval !== '') {
      clearInterval(interval)
    }
    console.log(`Interval: ${interval}`)
    return () => clearInterval(interval)
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
    const minFrequency = 20
    const maxFrequency = 150
    const randomFrequency =
      Math.random() * (maxFrequency - minFrequency) + minFrequency

    Tone.context.resume()

    synth.triggerAttackRelease(randomFrequency, '8n')
    Tone.context.dispose()
  }

  return (
    <>
      <Box>
        <h2 className="beat-pi-head">Beat Pixel</h2>
        <Box margin-bottom="5px">
          {isRunning ? (
            <IconButton
              size="lg"
              variant="outline"
              colorScheme="teal"
              aria-label="Play Video"
              fontSize="30px"
              margin-bottom="5px"
              icon={<AiOutlineStop />}
              onClick={() => setIsRunning(!isRunning)}
            />
          ) : (
            <IconButto
              size="lg"
              variant="outline"
              colorScheme="teal"
              aria-label="Stop Video"
              fontSize="30px"
              margin-bottom="5px"
              icon={<AiFillPlayCircle />}
              onClick={() => setIsRunning(!isRunning)}
            />
          )}
        </Box>
        <Box className="pixel-grid">
          {pixelGrid.map((pixel, index) => {
            return <Pixel key={index} id={pixel} />
          })}
        </Box>
      </Box>
    </>
  )
}
