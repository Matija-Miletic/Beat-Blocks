import { Component } from 'react'
import { useFruits } from '../hooks/useFruits.ts'
import {
  Box,
  ChakraProvider,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react'
import {
  PlayButton,
  PauseButton,
  StopButton,
  LoopButton,
  RecordButton,
} from './Buttons/BasicButtons.tsx'

function App() {
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
      </ChakraProvider>
    </>
  )
}

export default App
