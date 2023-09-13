// import { useHooks } from '../hooks/useHooks.ts'
import { ChakraProvider } from '@chakra-ui/react'
import {
  PlayButton,
  PauseButton,
  StopButton,
  LoopButton,
  RecordButton,
} from './Buttons/BasicButtons' // Make sure the import paths are correct
import TempoSlider from './TempoSlider'
import InstrumentSelector from './InstrumentSelector'

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
        <div className="App">
          <header className="App-header">
            <h1>Instrument Selector</h1>
          </header>
          <main>
            <InstrumentSelector />
          </main>
        </div>
      </ChakraProvider>
    </>
  )
}

export default App
