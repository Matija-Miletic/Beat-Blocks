import { ChakraProvider } from '@chakra-ui/react'
import Sequencer from './Sequencer'
import * as Buttons from './PlaybackButtons'
import { ResetButton } from './ResetButton'
import TempoSlider from './TempoSlider'
import Oscillator from './Freeform'

function App() {
  const handleTempoChange = (newTempo: number) => {
    console.log(`New Tempo: ${newTempo} BPM`)
  }

  return (
    <ChakraProvider>
      <div className="app">
        <h1>Beat Those Blocks!</h1>
        <div className="button-container">
          <Buttons.PlayButton />
          <Buttons.PauseButton />
          <Buttons.StopButton />
          <Buttons.LoopButton />
          <Buttons.RecordButton />
        </div>
        <Sequencer />
        <div className="slider-container">
          <TempoSlider onChange={handleTempoChange} />
        </div>
        <ResetButton />
        <Oscillator />
      </div>
    </ChakraProvider>
  )
}

export default App
