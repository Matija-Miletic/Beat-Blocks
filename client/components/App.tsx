import { Box, ChakraProvider } from '@chakra-ui/react'
import Sequencer from './Sequencer'
import Synth from './Synth'
import BeatPixel from './BeatPixel'
import { Fonts } from './Fonts'
import Header from './Header'

function App() {
  return (
    <ChakraProvider>
      <div className="green-brick">
        <div className="app-content">
          <Header />
          <div className="sequencer">
            <Sequencer />
          </div>

          <Box
            w="100%"
            className="synth-and-pixel"
            display="flex"
            justifyContent="space-around"
          >
            <Box className="oscillator-container" margin-right="200px">
              <Synth />
            </Box>
            <Box className="beat-pixel">
              <BeatPixel />
            </Box>
          </Box>
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
