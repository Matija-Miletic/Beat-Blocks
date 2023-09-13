// import { useHooks } from '../hooks/useHooks.ts'
import { ChakraProvider } from '@chakra-ui/react'
import {
  PlayButton,
  PauseButton,
  StopButton,
  LoopButton,
  RecordButton,
} from './Buttons/BasicButtons.tsx'
import TempoSlider from './TempoSlider.tsx'
import InstrumentSelector from './BeatBoxes.tsx'

function App() {
  const handleTempoChange = (newTempo) => {
    console.log(`New Tempo: ${newTempo} BPM`)
  }

  return (
    <>
      <ChakraProvider>
        <div className="app">
          <h1>Beat Those Blocks!</h1>
          <PlayButton />
          <PauseButton />
          <StopButton />
          <LoopButton />
          <RecordButton />
        </div>
        <div>
          <TempoSlider onChange={handleTempoChange} />
        </div>
        <div>
          <InstrumentSelector />
        </div>
      </ChakraProvider>
    </>
  )
}

export default App
