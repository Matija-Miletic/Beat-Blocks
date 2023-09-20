import { Box, ChakraProvider, Flex } from '@chakra-ui/react'
import Sequencer from './Sequencer'
import Synth from './Synth'
import BeatPixel from './BeatPixel'
import { Fonts } from './Fonts'
import Header from './Header'

function App() {
  return (
    <ChakraProvider>
      <Box className="page">
        <Header />

        <Box className="thing-box">
          <Sequencer />
        </Box>

        {/* <Box className="thing-box"> */}
        <Flex>
          <Box className="inner-thing-box">
            <Synth />
          </Box>
          <Box className="inner-thing-box">
            <BeatPixel />
          </Box>
        </Flex>
        {/* </Box> */}
      </Box>
    </ChakraProvider>
  )
}

export default App
