// App.tsx
import React, { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Sequencer from './Sequencer'
import * as Buttons from './PlaybackButtons'
import { ResetButton } from './ResetButton'
import TempoSlider from './TempoSlider'
import Oscillator from './Freeform'
import { Lasers } from './Lasers'
import { LaserButton } from './LaserButton'

function App() {
  const [isLaserActive, setIsLaserActive] = useState(false) // New state variable
  const handleTempoChange = (newTempo: number) => {
    console.log(`New Tempo: ${newTempo} BPM`)
  }

  // Function to toggle laser state
  const toggleLaser = () => {
    setIsLaserActive((prevState) => !prevState)
  }

  return (
    <ChakraProvider>
      <div className="app">
        <div className="app-content">
          <h1>Beat Those Blocks!</h1>
          <div className="button-container">
            <Buttons.PlayButton />
            <Buttons.PauseButton />
            <Buttons.StopButton />
            <Buttons.LoopButton />
            <Buttons.RecordButton />
            <ResetButton />
            <LaserButton toggleLaser={toggleLaser} />{' '}
            {/* Passing the toggle function */}
          </div>
          <Sequencer />
          <div className="slider-container">
            <TempoSlider onChange={handleTempoChange} />
          </div>
          <Oscillator />
        </div>
        {isLaserActive && <Lasers />}{' '}
        {/* Conditionally render based on state */}
      </div>
    </ChakraProvider>
  )
}

export default App
