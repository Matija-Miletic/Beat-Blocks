import { ChakraProvider } from '@chakra-ui/react'

import Sequencer from './Sequencer'
import Synth from './Synth'

function App() {
  return (
    <ChakraProvider>
      <div className="app">
        <div className="app-content">
          <h1>Beat Those Blocks!</h1>
          <div className="sequencer">
            <Sequencer tempoProp={100} />
          </div>
          <div className="oscillator-container">
            <Synth />
          </div>
        </div>
      </div>
    </ChakraProvider>
  )
}

export default App
