/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Box,
  Center,
  Heading,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react'
import { useState, useEffect, useRef } from 'react'
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

    // @ts-ignore: 7053
    const newSynth = Tone[selectedSynth]
      ? // @ts-ignore: 7053
        new Tone[selectedSynth]().connect(distortion)
      : new Tone.Synth().connect(distortion)

    setSynth(newSynth)
  }

  useEffect(() => {
    createAndSetSynth()
  }, [selectedSynth])

  const startSynth = (initialMouseY: number) => {
    setIsPlaying(true)

    if (boxRef.current) {
      const box = (boxRef.current as HTMLElement)?.getBoundingClientRect()
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
      }, 1)
    }
  }

  const playSynthNote = (
    // THis function selects the note to play based on the relative y postion of the mouse
    synth: Tone.Synth<Tone.SynthOptions>,
    mouseY: number,
    boxHeight: number,
  ) => {
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

    // Trigger attack causes the sound to play
    synth.triggerAttack(initialNote)
  }

  useEffect(() => {
    const handleMouseMove = (e: { clientY: number }) => {
      if (boxRef.current) {
        const box = (boxRef.current as HTMLElement)?.getBoundingClientRect()
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

  const handleDistortionChange = (newDist: number) => {
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
    <Box>
      <h2>Interactive Synth</h2>
      <Center>
        <Box display="Flex" textAlign="center">
          {/* Dropdown menu to select the synth type */}
          <Box>
            <label
              id="select-synth"
              htmlFor="synthSelect"
              style={{ color: 'black' }}
            >
              <Text
                className="stupid-text"
                fontSize="md"
                margin="0"
                padding="0"
              >
                Select Synth Type:
              </Text>
            </label>
          </Box>
          <Box>
            <Select
              className="stupid-text"
              size="lg"
              id="synthSelect"
              value={selectedSynth}
              onChange={(e) => setSelectedSynth(e.target.value)}
            >
              <option value="Synth" style={{ color: 'black' }}>
                Synth
              </option>
              <option value="AMSynth" style={{ color: 'black' }}>
                AMSynth
              </option>
              <option value="DuoSynth" style={{ color: 'black' }}>
                DuoSynth
              </option>
              <option value="FMSynth" style={{ color: 'black' }}>
                FMSynth
              </option>
              <option value="MembraneSynth" style={{ color: 'black' }}>
                MembraneSynth
              </option>
              <option value="PluckSynth" style={{ color: 'black' }}>
                PluckSynth
              </option>
            </Select>
          </Box>
        </Box>
      </Center>
      <Center>
        <Box>
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
                <h3>Press and move mouse to Play</h3>
              </Center>
            </Box>
            <Box className="brick b-1x12 b-orange"></Box>
          </Box>
          <Box className="board">
            <Box className="brick b-7x1 b-orange"></Box>
            <Box className="brick b-7x1 b-orange"></Box>
          </Box>

          <h3>Distortion:</h3>
          <Slider
            aria-label="slider-ex-4"
            defaultValue={dist}
            min={0}
            max={10}
            step={0.1} // Adjust the step as needed
            onChange={handleDistortionChange}
            margin-bottom="15px"
          >
            <SliderTrack bg="red.100">
              <SliderFilledTrack bg="tomato" />
            </SliderTrack>
            <SliderThumb>
              <Box className="brick 1x1" />
            </SliderThumb>
          </Slider>
        </Box>
      </Center>
    </Box>
  )
}

export default SynthComponent
{
  /* <SliderTrack bg="red.100">
          <Box position="relative" right={10} />

          <SliderFilledTrack bg="tomato" />
        </SliderTrack>
        <SliderThumb>
          <Box className="brick 1x1" />
        </SliderThumb> */
}
