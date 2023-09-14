import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Sequencer from './Sequencer'
import * as Buttons from './PlaybackButtons'
import { ResetButton } from './ResetButton'
import TempoSlider from './TempoSlider'

function App() {
  const handleTempoChange = (newTempo: number) => {
    console.log(`New Tempo: ${newTempo} BPM`)
  }

  return (
    <ChakraProvider>
      <div className="app">
        <h1>Beat Those Blocks!</h1>
        <Buttons.PlayButton />
        <Buttons.PauseButton />
        <Buttons.StopButton />
        <Buttons.LoopButton />
        <Buttons.RecordButton />
        <Sequencer />
        <TempoSlider onChange={handleTempoChange} />
        <ResetButton />
      </div>
    </ChakraProvider>
  )
}

export default App
