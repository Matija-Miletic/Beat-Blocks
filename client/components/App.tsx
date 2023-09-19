import { ChakraProvider } from '@chakra-ui/react'
import Sequencer from './Sequencer'
import Synth from './Synth'
import { Fonts } from './Fonts'

function App() {
  return (
    <ChakraProvider>
      <div className="app">
        <div className="app-content">
          <h1>Beat Those Blocks!</h1>
          <div className="sequencer">
            <Sequencer />
          </div>
          <div className="oscillator-container">
            <Synth />
          </div>
        </div>
      </div>
      <div className="fonts-container">
        <h4>Fonts Showcase:</h4>
        <Fonts />
      </div>
    </ChakraProvider>
  )
}

export default App
