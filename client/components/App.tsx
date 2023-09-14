import { ChakraProvider } from '@chakra-ui/react'
import Sequencer from './Sequencer'

function App() {
  return (
    <>
      <ChakraProvider>
        <div className="app">
          <h1>Beat Blocks</h1>
          <Sequencer />
        </div>
      </ChakraProvider>
    </>
  )
}

export default App
