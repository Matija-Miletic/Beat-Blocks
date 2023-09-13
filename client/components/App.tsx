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

function App() {
  const { data } = useFruits()

  return (
    <>
      <ChakraProvider>
        <div className="app">
          <h1>Fullstack Boilerplate - with Fruits!</h1>
          <ul>{data && data.map((fruit) => <li key={fruit}>{fruit}</li>)}</ul>
        </div>
      </ChakraProvider>
    </>
  )
}

export default App
