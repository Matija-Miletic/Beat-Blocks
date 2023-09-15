import {
  Box,
  Center,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react'
import { useState, useEffect, useRef, SetStateAction } from 'react'
import * as Tone from 'tone'

const SynthComponent = () => {
  const [dist, setDist] = useState(0)

  const [distortion, setDistortion] = useState(
    new Tone.Distortion(dist).toDestination(),
  )

  const [synth, setSynth] = useState(new Tone.Synth().connect(distortion))
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedSynth, setSelectedSynth] = useState('Synth')
  const boxRef = useRef(null)
  const isInsideBox = useRef(false)
  let stopSynthTimeout: string | number | NodeJS.Timeout | undefined

  const createAndSetSynth = () => {
    if (synth) {
      synth.dispose()
    }

    // const newSynth: SetStateAction<Tone.Synth<Tone.SynthOptions>>

    const newSynth = Tone[selectedSynth]
      ? new Tone[selectedSynth]().connect(distortion)
      : new Tone.Synth().connect(distortion)

    setSynth(newSynth)
  }

  useEffect(() => {
    createAndSetSynth()
  }, [selectedSynth])

  const startSynth = (initialMouseY: number) => {
    setIsPlaying(true)

    if (boxRef.current) {
      const box = boxRef.current.getBoundingClientRect()
      const mouseY = initialMouseY - box.top
      const boxHeight = box.height

      playSynthNote(synth, mouseY, boxHeight)
    }
  }

  const stopSynth = () => {
    if (synth) {
      if (stopSynthTimeout) {
        clearTimeout(stopSynthTimeout)
      }

      stopSynthTimeout = setTimeout(() => {
        synth.triggerRelease()
        setIsPlaying(false)
        isInsideBox.current = false
      }, 10)
    }
  }

  const playSynthNote = (
    synth: Tone.Synth<Tone.SynthOptions>,
    mouseY: number,
    boxHeight: number,
  ) => {
    // const minNote = 'C1'
    // const maxNote = 'C8'
    const noteRange = [
      'C',
      'D',
      'E',
      'F',
      'G',
      'A',
      'B',
      'Db',
      'Eb',
      'Gb',
      'Ab',
    ]
    const noteIndex = Math.floor((mouseY / boxHeight) * noteRange.length)
    const selectedNote = noteRange[noteIndex]
    const selectedOctave = Math.floor(3 + (mouseY / boxHeight) * 3)
    const initialNote = selectedNote + selectedOctave

    synth.triggerAttack(initialNote)
  }

  useEffect(() => {
    const handleMouseMove = (e: { clientY: number }) => {
      if (boxRef.current) {
        const box = boxRef.current.getBoundingClientRect()
        const mouseY = e.clientY - box.top
        const boxHeight = box.height

        if (mouseY >= 0 && mouseY <= boxHeight) {
          isInsideBox.current = true

          if (!isPlaying) {
            startSynth(e.clientY)
          } else {
            playSynthNote(synth, mouseY, boxHeight)
          }
        } else if (isInsideBox.current && isPlaying) {
          stopSynth()
        }
      }
    }

    if (isPlaying) {
      window.addEventListener('mousemove', handleMouseMove)
    } else {
      window.removeEventListener('mousemove', handleMouseMove)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [synth, isPlaying])

  const handleDistortionChange = (newDist) => {
    setDist(newDist)

    // Dispose the current distortion effect
    distortion.dispose()

    // Create a new distortion effect with the updated dist value
    const newDistortion = new Tone.Distortion(newDist).toDestination()

    // Reconnect the new distortion effect to the synth
    synth.disconnect()
    synth.connect(newDistortion)

    setDistortion(newDistortion)
  }

  return (
    <div>
      <h1>Interactive Synth</h1>

      <div>
        <label htmlFor="synthSelect">Select Synth Type: </label>
        <select
          id="synthSelect"
          value={selectedSynth}
          onChange={(e) => setSelectedSynth(e.target.value)}
        >
          <option value="Synth">Synth</option>
          <option value="AMSynth">AMSynth</option>
          <option value="DuoSynth">DuoSynth</option>
          <option value="FMSynth">FMSynth</option>
          <option value="MembraneSynth">MembraneSynth</option>
          <option value="PluckSynth">PluckSynth</option>
        </select>
      </div>
      <Box className="board">
        <Box className="brick b-7x1 b-orange"></Box>
        <Box className="brick b-7x1 b-orange"></Box>
      </Box>
      <Box className="board">
        {/* Your 12x12 box code goes here */}
        <Box className="brick b-1x12 b-orange"></Box>
        <Box
          ref={boxRef}
          className="brick b-12x12 b-blue"
          onMouseDown={(e) => startSynth(e.clientY)}
          onMouseUp={stopSynth}
          onMouseLeave={stopSynth}
        >
          <Center>
            <Heading size="sm" color="black">
              Press and move mouse to Play
            </Heading>
          </Center>
        </Box>
        <Box className="brick b-1x12 b-orange"></Box>
      </Box>
      <Box className="board">
        <Box className="brick b-7x1 b-orange"></Box>
        <Box className="brick b-7x1 b-orange"></Box>
      </Box>

      <Heading as="h3">Distortion:</Heading>
      <Slider
        aria-label="slider-ex-4"
        defaultValue={dist}
        min={0}
        max={10}
        step={0.1} // Adjust the step as needed
        onChange={handleDistortionChange}
      >
        <SliderTrack bg="red.100">
          <SliderFilledTrack bg="tomato" />
        </SliderTrack>
        <SliderThumb boxSize={6}>
          <Box color="tomato" />
        </SliderThumb>
      </Slider>
    </div>
  )
}

export default SynthComponent
