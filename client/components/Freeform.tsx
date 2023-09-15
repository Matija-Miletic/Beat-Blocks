import {
  Box,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
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
  let stopSynthTimeout

  const createAndSetSynth = () => {
    if (synth) {
      synth.dispose()
    }

    let newSynth

    newSynth = Tone[selectedSynth]
      ? new Tone[selectedSynth]().connect(distortion)
      : new Tone.Synth().connect(distortion)

    setSynth(newSynth)
  }

  useEffect(() => {
    createAndSetSynth()
  }, [selectedSynth])

  const startSynth = (initialMouseY) => {
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
      }, 1)
    }
  }

  const playSynthNote = (synth, mouseY, boxHeight) => {
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
    const handleMouseMove = (e) => {
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
      <h2>~~~ Interactive Synth ~~~</h2>
      <div>
        {/* Dropdown menu to select the synth type */}
        <label id="select-synth" htmlFor="synthSelect">
          Select Synth Type:{' '}
        </label>
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
      <div
        ref={boxRef}
        className="synth-box"
        onMouseDown={(e) => startSynth(e.clientY)}
        onMouseUp={stopSynth}
        onMouseLeave={stopSynth}
      >
        <p>Hold Mouse Button to Play Notes (X Dimension Has No Effect)</p>
      </div>
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
